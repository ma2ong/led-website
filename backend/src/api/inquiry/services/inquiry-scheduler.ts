/**
 * inquiry scheduler service
 */

import { factories } from '@strapi/strapi';
import cron from 'node-cron';

export default factories.createCoreService('api::inquiry.inquiry', ({ strapi }) => ({
  // 初始化调度任务
  initializeScheduler() {
    console.log('Initializing inquiry scheduler...');

    // 每小时检查需要跟进的询盘
    cron.schedule('0 * * * *', async () => {
      await this.checkFollowUpReminders();
    });

    // 每天上午9点发送询盘统计报告
    cron.schedule('0 9 * * *', async () => {
      await this.sendDailyReport();
    });

    // 每周一上午9点发送周报
    cron.schedule('0 9 * * 1', async () => {
      await this.sendWeeklyReport();
    });

    // 每月1号上午9点发送月报
    cron.schedule('0 9 1 * *', async () => {
      await this.sendMonthlyReport();
    });

    // 每天凌晨2点清理过期的垃圾询盘
    cron.schedule('0 2 * * *', async () => {
      await this.cleanupSpamInquiries();
    });

    // 每天凌晨3点备份询盘数据
    cron.schedule('0 3 * * *', async () => {
      await this.backupInquiryData();
    });

    console.log('Inquiry scheduler initialized successfully');
  },

  // 检查需要跟进的询盘
  async checkFollowUpReminders() {
    try {
      console.log('Checking follow-up reminders...');

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 查找今天需要跟进的询盘
      const inquiriesNeedingFollowUp = await strapi.entityService.findMany('api::inquiry.inquiry', {
        filters: {
          followUpDate: {
            $lte: today.toISOString()
          },
          status: {
            $in: ['new', 'processing', 'replied']
          }
        },
        populate: {
          assignedTo: true
        }
      });

      console.log(`Found ${inquiriesNeedingFollowUp.length} inquiries needing follow-up`);

      // 发送跟进提醒
      for (const inquiry of inquiriesNeedingFollowUp) {
        await strapi.service('api::inquiry.inquiry-notification').sendFollowUpReminder(inquiry);
        
        // 更新跟进日期为明天（避免重复提醒）
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        await strapi.entityService.update('api::inquiry.inquiry', inquiry.id, {
          data: {
            followUpDate: tomorrow.toISOString().split('T')[0]
          }
        });
      }

    } catch (error) {
      console.error('Error checking follow-up reminders:', error);
    }
  },

  // 发送每日报告
  async sendDailyReport() {
    try {
      console.log('Generating daily inquiry report...');

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // 获取昨天的询盘统计
      const report = await strapi.service('api::inquiry.inquiry-export').generateReport({
        start: yesterday.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      });

      // 生成报告内容
      const reportContent = this.generateDailyReportContent(report);

      // 获取通知设置
      const notificationSettings = await strapi.service('api::inquiry.inquiry-notification').getNotificationSettings();

      // 发送报告邮件
      if (notificationSettings.email.enabled) {
        for (const recipient of notificationSettings.email.recipients) {
          await strapi.plugins['email'].services.email.send({
            to: recipient,
            from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
            subject: `询盘日报 - ${yesterday.toLocaleDateString('zh-CN')}`,
            html: reportContent
          });
        }
      }

      console.log('Daily report sent successfully');

    } catch (error) {
      console.error('Error sending daily report:', error);
    }
  },

  // 发送周报
  async sendWeeklyReport() {
    try {
      console.log('Generating weekly inquiry report...');

      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const report = await strapi.service('api::inquiry.inquiry-export').generateReport({
        start: lastWeek.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      });

      const reportContent = this.generateWeeklyReportContent(report);

      const notificationSettings = await strapi.service('api::inquiry.inquiry-notification').getNotificationSettings();

      if (notificationSettings.email.enabled) {
        for (const recipient of notificationSettings.email.recipients) {
          await strapi.plugins['email'].services.email.send({
            to: recipient,
            from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
            subject: `询盘周报 - ${lastWeek.toLocaleDateString('zh-CN')} 至 ${today.toLocaleDateString('zh-CN')}`,
            html: reportContent
          });
        }
      }

      console.log('Weekly report sent successfully');

    } catch (error) {
      console.error('Error sending weekly report:', error);
    }
  },

  // 发送月报
  async sendMonthlyReport() {
    try {
      console.log('Generating monthly inquiry report...');

      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      const report = await strapi.service('api::inquiry.inquiry-export').generateReport({
        start: lastMonth.toISOString().split('T')[0],
        end: thisMonth.toISOString().split('T')[0]
      });

      const reportContent = this.generateMonthlyReportContent(report);

      const notificationSettings = await strapi.service('api::inquiry.inquiry-notification').getNotificationSettings();

      if (notificationSettings.email.enabled) {
        for (const recipient of notificationSettings.email.recipients) {
          await strapi.plugins['email'].services.email.send({
            to: recipient,
            from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
            subject: `询盘月报 - ${lastMonth.getFullYear()}年${lastMonth.getMonth() + 1}月`,
            html: reportContent
          });
        }
      }

      console.log('Monthly report sent successfully');

    } catch (error) {
      console.error('Error sending monthly report:', error);
    }
  },

  // 清理垃圾询盘
  async cleanupSpamInquiries() {
    try {
      console.log('Cleaning up spam inquiries...');

      // 删除30天前的垃圾询盘
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const spamInquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {
        filters: {
          isSpam: true,
          createdAt: {
            $lt: thirtyDaysAgo.toISOString()
          }
        }
      });

      console.log(`Found ${spamInquiries.length} spam inquiries to delete`);

      for (const inquiry of spamInquiries) {
        await strapi.entityService.delete('api::inquiry.inquiry', inquiry.id);
      }

      console.log('Spam cleanup completed');

    } catch (error) {
      console.error('Error cleaning up spam inquiries:', error);
    }
  },

  // 备份询盘数据
  async backupInquiryData() {
    try {
      console.log('Starting inquiry data backup...');

      // 导出所有询盘数据
      const backupData = await strapi.service('api::inquiry.inquiry-export').exportToExcel();

      // 这里可以将备份数据上传到云存储或保存到指定目录
      // 示例：保存到本地备份目录
      const fs = require('fs');
      const path = require('path');
      
      const backupDir = path.join(process.cwd(), 'backups', 'inquiries');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      const backupFileName = `inquiry_backup_${new Date().toISOString().split('T')[0]}.xlsx`;
      const backupPath = path.join(backupDir, backupFileName);

      fs.writeFileSync(backupPath, backupData.buffer);

      console.log(`Inquiry data backed up to: ${backupPath}`);

      // 清理7天前的备份文件
      const files = fs.readdirSync(backupDir);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      for (const file of files) {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtime < sevenDaysAgo) {
          fs.unlinkSync(filePath);
          console.log(`Deleted old backup file: ${file}`);
        }
      }

    } catch (error) {
      console.error('Error backing up inquiry data:', error);
    }
  },

  // 生成日报内容
  generateDailyReportContent(report: any): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">联锦光电</h1>
          <p style="color: white; margin: 10px 0 0 0;">询盘日报 - ${new Date(report.dateRange.start).toLocaleDateString('zh-CN')}</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">今日询盘概况</h2>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #007bff; margin: 0; font-size: 2em;">${report.stats.total}</h3>
              <p style="margin: 5px 0 0 0; color: #666;">新增询盘</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #28a745; margin: 0; font-size: 2em;">${report.stats.byStatus['replied'] || 0}</h3>
              <p style="margin: 5px 0 0 0; color: #666;">已回复</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #ffc107; margin: 0; font-size: 2em;">${report.stats.byStatus['processing'] || 0}</h3>
              <p style="margin: 5px 0 0 0; color: #666;">处理中</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #dc3545; margin: 0; font-size: 2em;">${report.stats.byStatus['new'] || 0}</h3>
              <p style="margin: 5px 0 0 0; color: #666;">待处理</p>
            </div>
          </div>
          
          ${this.generateStatusBreakdown(report.stats.byStatus)}
          ${this.generatePriorityBreakdown(report.stats.byPriority)}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.ADMIN_URL}/admin/content-manager/collectionType/api::inquiry.inquiry" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              查看所有询盘
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // 生成周报内容
  generateWeeklyReportContent(report: any): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">联锦光电</h1>
          <p style="color: white; margin: 10px 0 0 0;">询盘周报</p>
          <p style="color: white; margin: 5px 0 0 0; font-size: 14px;">
            ${new Date(report.dateRange.start).toLocaleDateString('zh-CN')} - ${new Date(report.dateRange.end).toLocaleDateString('zh-CN')}
          </p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">本周询盘总结</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>关键指标</h3>
            <ul>
              <li>总询盘数: <strong>${report.stats.total}</strong></li>
              <li>平均响应时间: <strong>${report.stats.responseTime.average}小时</strong></li>
              <li>转化率: <strong>${report.stats.conversionRate}%</strong></li>
            </ul>
          </div>
          
          ${this.generateStatusBreakdown(report.stats.byStatus)}
          ${this.generateSourceBreakdown(report.stats.bySource)}
          ${this.generateAssigneeBreakdown(report.stats.byAssignee)}
        </div>
      </div>
    `;
  },

  // 生成月报内容
  generateMonthlyReportContent(report: any): string {
    const month = new Date(report.dateRange.start).getMonth() + 1;
    const year = new Date(report.dateRange.start).getFullYear();
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">联锦光电</h1>
          <p style="color: white; margin: 10px 0 0 0;">询盘月报 - ${year}年${month}月</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">月度询盘分析</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>月度概览</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
              <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 5px;">
                <div style="font-size: 24px; font-weight: bold; color: #007bff;">${report.stats.total}</div>
                <div style="color: #666;">总询盘</div>
              </div>
              <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 5px;">
                <div style="font-size: 24px; font-weight: bold; color: #28a745;">${report.stats.conversionRate}%</div>
                <div style="color: #666;">转化率</div>
              </div>
              <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 5px;">
                <div style="font-size: 24px; font-weight: bold; color: #ffc107;">${report.stats.responseTime.average}h</div>
                <div style="color: #666;">平均响应</div>
              </div>
            </div>
          </div>
          
          ${this.generateStatusBreakdown(report.stats.byStatus)}
          ${this.generateProductInterestBreakdown(report.stats.byProductInterest)}
          ${this.generateSourceBreakdown(report.stats.bySource)}
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3>改进建议</h3>
            <ul>
              <li>继续保持快速响应，目标响应时间控制在2小时内</li>
              <li>加强对高优先级询盘的跟进</li>
              <li>优化询盘转化流程，提高成交率</li>
              <li>分析热门产品询盘，调整营销策略</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  // 生成状态分布图表
  generateStatusBreakdown(statusStats: any): string {
    const total = Object.values(statusStats).reduce((sum: number, count: number) => sum + count, 0);
    if (total === 0) return '';

    return `
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>状态分布</h3>
        <div style="margin-top: 15px;">
          ${Object.entries(statusStats).map(([status, count]) => {
            const percentage = Math.round((count as number / total) * 100);
            const statusLabel = this.getStatusLabel(status);
            return `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>${statusLabel}</span>
                  <span>${count} (${percentage}%)</span>
                </div>
                <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                  <div style="background: ${this.getStatusColor(status)}; height: 100%; width: ${percentage}%; border-radius: 4px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // 生成优先级分布
  generatePriorityBreakdown(priorityStats: any): string {
    const total = Object.values(priorityStats).reduce((sum: number, count: number) => sum + count, 0);
    if (total === 0) return '';

    return `
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>优先级分布</h3>
        <div style="margin-top: 15px;">
          ${Object.entries(priorityStats).map(([priority, count]) => {
            const percentage = Math.round((count as number / total) * 100);
            const priorityLabel = this.getPriorityLabel(priority);
            return `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>${priorityLabel}</span>
                  <span>${count} (${percentage}%)</span>
                </div>
                <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                  <div style="background: ${this.getPriorityColor(priority)}; height: 100%; width: ${percentage}%; border-radius: 4px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // 生成来源分布
  generateSourceBreakdown(sourceStats: any): string {
    const total = Object.values(sourceStats).reduce((sum: number, count: number) => sum + count, 0);
    if (total === 0) return '';

    return `
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>来源分布</h3>
        <div style="margin-top: 15px;">
          ${Object.entries(sourceStats).map(([source, count]) => {
            const percentage = Math.round((count as number / total) * 100);
            const sourceLabel = this.getSourceLabel(source);
            return `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>${sourceLabel}</span>
                  <span>${count} (${percentage}%)</span>
                </div>
                <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                  <div style="background: #17a2b8; height: 100%; width: ${percentage}%; border-radius: 4px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // 生成负责人分布
  generateAssigneeBreakdown(assigneeStats: any): string {
    const total = Object.values(assigneeStats).reduce((sum: number, count: number) => sum + count, 0);
    if (total === 0) return '';

    return `
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>负责人分布</h3>
        <div style="margin-top: 15px;">
          ${Object.entries(assigneeStats).map(([assignee, count]) => {
            const percentage = Math.round((count as number / total) * 100);
            return `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>${assignee}</span>
                  <span>${count} (${percentage}%)</span>
                </div>
                <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                  <div style="background: #6f42c1; height: 100%; width: ${percentage}%; border-radius: 4px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // 生成产品兴趣分布
  generateProductInterestBreakdown(productStats: any): string {
    const total = Object.values(productStats).reduce((sum: number, count: number) => sum + count, 0);
    if (total === 0) return '';

    return `
      <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>产品兴趣分布</h3>
        <div style="margin-top: 15px;">
          ${Object.entries(productStats).map(([product, count]) => {
            const percentage = Math.round((count as number / total) * 100);
            return `
              <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <span>${product}</span>
                  <span>${count} (${percentage}%)</span>
                </div>
                <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                  <div style="background: #fd7e14; height: 100%; width: ${percentage}%; border-radius: 4px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // 辅助方法
  getStatusLabel(status: string): string {
    const statusLabels = {
      'new': '新询盘',
      'processing': '处理中',
      'replied': '已回复',
      'closed': '已关闭',
      'closed-won': '成交',
      'closed-lost': '流失'
    };
    return statusLabels[status] || status;
  },

  getPriorityLabel(priority: string): string {
    const priorityLabels = {
      'low': '低',
      'medium': '中',
      'high': '高',
      'urgent': '紧急'
    };
    return priorityLabels[priority] || priority;
  },

  getSourceLabel(source: string): string {
    const sourceLabels = {
      'website': '官网',
      'email': '邮件',
      'phone': '电话',
      'exhibition': '展会',
      'referral': '推荐',
      'other': '其他'
    };
    return sourceLabels[source] || source;
  },

  getStatusColor(status: string): string {
    const colors = {
      'new': '#dc3545',
      'processing': '#ffc107',
      'replied': '#28a745',
      'closed': '#6c757d',
      'closed-won': '#28a745',
      'closed-lost': '#dc3545'
    };
    return colors[status] || '#007bff';
  },

  getPriorityColor(priority: string): string {
    const colors = {
      'low': '#28a745',
      'medium': '#ffc107',
      'high': '#fd7e14',
      'urgent': '#dc3545'
    };
    return colors[priority] || '#007bff';
  }
}));