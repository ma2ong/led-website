/**
 * inquiry notification service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::inquiry.inquiry', ({ strapi }) => ({
  // 发送新询盘通知
  async sendNewInquiryNotification(inquiry: any) {
    try {
      // 获取通知设置
      const notificationSettings = await this.getNotificationSettings();
      
      if (!notificationSettings.enabled) {
        return;
      }

      // 发送邮件通知
      if (notificationSettings.email.enabled) {
        await this.sendEmailNotification(inquiry, notificationSettings.email);
      }

      // 发送微信通知（如果配置了）
      if (notificationSettings.wechat?.enabled) {
        await this.sendWechatNotification(inquiry, notificationSettings.wechat);
      }

      // 发送钉钉通知（如果配置了）
      if (notificationSettings.dingtalk?.enabled) {
        await this.sendDingtalkNotification(inquiry, notificationSettings.dingtalk);
      }

      // 记录通知日志
      await this.logNotification(inquiry.id, 'new_inquiry', 'success');

    } catch (error) {
      console.error('Failed to send inquiry notification:', error);
      await this.logNotification(inquiry.id, 'new_inquiry', 'failed', error.message);
    }
  },

  // 发送询盘状态更新通知
  async sendStatusUpdateNotification(inquiry: any, oldStatus: string, newStatus: string) {
    try {
      const notificationSettings = await this.getNotificationSettings();
      
      if (!notificationSettings.statusUpdates?.enabled) {
        return;
      }

      // 只对重要状态变更发送通知
      const importantStatusChanges = [
        'new->processing',
        'processing->replied',
        'replied->closed',
        'new->closed'
      ];

      const statusChange = `${oldStatus}->${newStatus}`;
      if (!importantStatusChanges.includes(statusChange)) {
        return;
      }

      // 发送邮件通知给客户
      if (notificationSettings.customerNotifications?.enabled) {
        await this.sendCustomerStatusNotification(inquiry, newStatus);
      }

      // 发送内部通知
      if (notificationSettings.email.enabled) {
        await this.sendInternalStatusNotification(inquiry, oldStatus, newStatus);
      }

      await this.logNotification(inquiry.id, 'status_update', 'success');

    } catch (error) {
      console.error('Failed to send status update notification:', error);
      await this.logNotification(inquiry.id, 'status_update', 'failed', error.message);
    }
  },

  // 发送跟进提醒通知
  async sendFollowUpReminder(inquiry: any) {
    try {
      const notificationSettings = await this.getNotificationSettings();
      
      if (!notificationSettings.followUpReminders?.enabled) {
        return;
      }

      // 发送给负责人
      if (inquiry.assignedTo) {
        await this.sendFollowUpEmail(inquiry);
      }

      await this.logNotification(inquiry.id, 'follow_up_reminder', 'success');

    } catch (error) {
      console.error('Failed to send follow-up reminder:', error);
      await this.logNotification(inquiry.id, 'follow_up_reminder', 'failed', error.message);
    }
  },

  // 发送邮件通知
  async sendEmailNotification(inquiry: any, emailSettings: any) {
    const emailTemplate = this.generateEmailTemplate(inquiry);
    
    // 发送给管理员
    for (const recipient of emailSettings.recipients) {
      await strapi.plugins['email'].services.email.send({
        to: recipient,
        from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
        subject: `新询盘通知: ${inquiry.subject}`,
        html: emailTemplate
      });
    }
  },

  // 发送客户状态通知
  async sendCustomerStatusNotification(inquiry: any, newStatus: string) {
    const statusMessages = {
      'processing': '我们已收到您的询盘，正在处理中，我们会尽快与您联系。',
      'replied': '我们已回复您的询盘，请查收邮件。',
      'closed': '您的询盘已处理完成，感谢您的咨询。'
    };

    const message = statusMessages[newStatus];
    if (!message) return;

    await strapi.plugins['email'].services.email.send({
      to: inquiry.email,
      from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
      subject: `询盘状态更新 - ${inquiry.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">联锦光电</h1>
            <p style="color: white; margin: 10px 0 0 0;">LED显示屏专业制造商</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">询盘状态更新</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>尊敬的 ${inquiry.name}，</strong></p>
              <p>${message}</p>
              
              <div style="margin: 20px 0; padding: 15px; background: #e3f2fd; border-radius: 5px;">
                <p><strong>询盘信息：</strong></p>
                <p>主题: ${inquiry.subject}</p>
                <p>状态: ${this.getStatusLabel(newStatus)}</p>
                <p>时间: ${new Date().toLocaleString('zh-CN')}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666;">如有任何疑问，请随时联系我们</p>
              <p style="color: #666;">电话: +86-755-1234567 | 邮箱: info@lianjin-led.com</p>
            </div>
          </div>
        </div>
      `
    });
  },

  // 发送内部状态通知
  async sendInternalStatusNotification(inquiry: any, oldStatus: string, newStatus: string) {
    const notificationSettings = await this.getNotificationSettings();
    
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>询盘状态更新通知</h2>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>询盘ID:</strong> ${inquiry.id}</p>
          <p><strong>客户:</strong> ${inquiry.name} (${inquiry.company || '个人'})</p>
          <p><strong>主题:</strong> ${inquiry.subject}</p>
          <p><strong>状态变更:</strong> ${this.getStatusLabel(oldStatus)} → ${this.getStatusLabel(newStatus)}</p>
          <p><strong>负责人:</strong> ${inquiry.assignedTo || '未分配'}</p>
          <p><strong>更新时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
        </div>
        
        <p><a href="${process.env.ADMIN_URL}/admin/content-manager/collectionType/api::inquiry.inquiry/${inquiry.id}" 
           style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           查看详情
        </a></p>
      </div>
    `;

    for (const recipient of notificationSettings.email.recipients) {
      await strapi.plugins['email'].services.email.send({
        to: recipient,
        from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
        subject: `询盘状态更新: ${inquiry.subject}`,
        html: template
      });
    }
  },

  // 发送跟进提醒邮件
  async sendFollowUpEmail(inquiry: any) {
    // 获取负责人邮箱
    const assignedUser = await strapi.entityService.findOne('admin::user', inquiry.assignedTo);
    if (!assignedUser?.email) return;

    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>询盘跟进提醒</h2>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>⏰ 提醒：以下询盘需要跟进</strong></p>
        </div>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>询盘ID:</strong> ${inquiry.id}</p>
          <p><strong>客户:</strong> ${inquiry.name} (${inquiry.company || '个人'})</p>
          <p><strong>邮箱:</strong> ${inquiry.email}</p>
          <p><strong>电话:</strong> ${inquiry.phone || '未提供'}</p>
          <p><strong>主题:</strong> ${inquiry.subject}</p>
          <p><strong>状态:</strong> ${this.getStatusLabel(inquiry.status)}</p>
          <p><strong>优先级:</strong> ${this.getPriorityLabel(inquiry.priority)}</p>
          <p><strong>创建时间:</strong> ${new Date(inquiry.createdAt).toLocaleString('zh-CN')}</p>
          <p><strong>跟进日期:</strong> ${new Date(inquiry.followUpDate).toLocaleDateString('zh-CN')}</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>询盘内容:</strong></p>
          <p>${inquiry.message}</p>
        </div>
        
        <p><a href="${process.env.ADMIN_URL}/admin/content-manager/collectionType/api::inquiry.inquiry/${inquiry.id}" 
           style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           立即处理
        </a></p>
      </div>
    `;

    await strapi.plugins['email'].services.email.send({
      to: assignedUser.email,
      from: process.env.EMAIL_FROM || 'noreply@lianjin-led.com',
      subject: `询盘跟进提醒: ${inquiry.subject}`,
      html: template
    });
  },

  // 发送钉钉通知
  async sendDingtalkNotification(inquiry: any, dingtalkSettings: any) {
    try {
      const webhook = dingtalkSettings.webhook;
      if (!webhook) return;

      const message = {
        msgtype: 'markdown',
        markdown: {
          title: '新询盘通知',
          text: `## 新询盘通知\n\n` +
                `**客户:** ${inquiry.name}\n\n` +
                `**公司:** ${inquiry.company || '个人'}\n\n` +
                `**邮箱:** ${inquiry.email}\n\n` +
                `**电话:** ${inquiry.phone || '未提供'}\n\n` +
                `**主题:** ${inquiry.subject}\n\n` +
                `**优先级:** ${this.getPriorityLabel(inquiry.priority)}\n\n` +
                `**时间:** ${new Date(inquiry.createdAt).toLocaleString('zh-CN')}\n\n` +
                `[查看详情](${process.env.ADMIN_URL}/admin/content-manager/collectionType/api::inquiry.inquiry/${inquiry.id})`
        }
      };

      // 发送钉钉消息
      const response = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        throw new Error(`DingTalk notification failed: ${response.statusText}`);
      }

    } catch (error) {
      console.error('Failed to send DingTalk notification:', error);
    }
  },

  // 生成邮件模板
  generateEmailTemplate(inquiry: any): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">联锦光电</h1>
          <p style="color: white; margin: 10px 0 0 0;">新询盘通知</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">询盘详情</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">客户姓名:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">公司名称:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.company || '个人'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">联系邮箱:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">联系电话:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.phone || '未提供'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">国家地区:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.country || '未提供'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">询盘主题:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">产品兴趣:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.productInterest || '未指定'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">项目预算:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.projectBudget || '未指定'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">项目时间:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${inquiry.projectTimeline || '未指定'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">优先级:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${this.getPriorityLabel(inquiry.priority)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">提交时间:</td>
                <td style="padding: 8px 0;">${new Date(inquiry.createdAt).toLocaleString('zh-CN')}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">询盘内容:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; line-height: 1.6;">
              ${inquiry.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.ADMIN_URL}/admin/content-manager/collectionType/api::inquiry.inquiry/${inquiry.id}" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              立即处理询盘
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              此邮件由联锦光电询盘管理系统自动发送<br>
              如需修改通知设置，请联系系统管理员
            </p>
          </div>
        </div>
      </div>
    `;
  },

  // 获取通知设置
  async getNotificationSettings() {
    // 这里可以从数据库或配置文件中获取通知设置
    // 暂时使用环境变量和默认设置
    return {
      enabled: process.env.INQUIRY_NOTIFICATIONS_ENABLED !== 'false',
      email: {
        enabled: true,
        recipients: (process.env.INQUIRY_EMAIL_RECIPIENTS || 'info@lianjin-led.com').split(',')
      },
      statusUpdates: {
        enabled: process.env.STATUS_UPDATE_NOTIFICATIONS !== 'false'
      },
      customerNotifications: {
        enabled: process.env.CUSTOMER_NOTIFICATIONS !== 'false'
      },
      followUpReminders: {
        enabled: process.env.FOLLOW_UP_REMINDERS !== 'false'
      },
      dingtalk: {
        enabled: !!process.env.DINGTALK_WEBHOOK,
        webhook: process.env.DINGTALK_WEBHOOK
      },
      wechat: {
        enabled: !!process.env.WECHAT_WEBHOOK,
        webhook: process.env.WECHAT_WEBHOOK
      }
    };
  },

  // 记录通知日志
  async logNotification(inquiryId: number, type: string, status: string, error?: string) {
    try {
      // 这里可以记录到数据库或日志文件
      console.log(`Notification log: Inquiry ${inquiryId}, Type: ${type}, Status: ${status}`, error ? `Error: ${error}` : '');
      
      // 如果需要持久化日志，可以创建一个通知日志表
      // await strapi.entityService.create('api::notification-log.notification-log', {
      //   data: {
      //     inquiryId,
      //     type,
      //     status,
      //     error,
      //     timestamp: new Date()
      //   }
      // });
    } catch (logError) {
      console.error('Failed to log notification:', logError);
    }
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
  }
}));