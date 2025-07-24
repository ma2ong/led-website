/**
 * inquiry export service
 */

import { factories } from '@strapi/strapi';
import * as XLSX from 'xlsx';

export default factories.createCoreService('api::inquiry.inquiry', ({ strapi }) => ({
  // 导出询盘数据为Excel
  async exportToExcel(filters: any = {}) {
    try {
      const inquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {
        filters,
        populate: {
          attachments: true,
          assignedTo: true
        },
        sort: { createdAt: 'desc' }
      });

      // 准备Excel数据
      const excelData = inquiries.map((inquiry: any) => ({
        'ID': inquiry.id,
        '姓名': inquiry.name,
        '公司': inquiry.company || '',
        '邮箱': inquiry.email,
        '电话': inquiry.phone || '',
        '国家': inquiry.country || '',
        '主题': inquiry.subject,
        '消息内容': inquiry.message,
        '状态': this.getStatusLabel(inquiry.status),
        '优先级': this.getPriorityLabel(inquiry.priority),
        '负责人': inquiry.assignedTo?.firstname ? `${inquiry.assignedTo.firstname} ${inquiry.assignedTo.lastname}` : '未分配',
        '产品兴趣': inquiry.productInterest || '',
        '项目预算': inquiry.projectBudget || '',
        '项目时间': inquiry.projectTimeline || '',
        '来源': this.getSourceLabel(inquiry.source),
        '创建时间': new Date(inquiry.createdAt).toLocaleString('zh-CN'),
        '更新时间': new Date(inquiry.updatedAt).toLocaleString('zh-CN'),
        '备注': inquiry.notes || ''
      }));

      // 创建工作簿
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // 设置列宽
      const columnWidths = [
        { wch: 8 },  // ID
        { wch: 15 }, // 姓名
        { wch: 20 }, // 公司
        { wch: 25 }, // 邮箱
        { wch: 15 }, // 电话
        { wch: 12 }, // 国家
        { wch: 30 }, // 主题
        { wch: 50 }, // 消息内容
        { wch: 10 }, // 状态
        { wch: 10 }, // 优先级
        { wch: 15 }, // 负责人
        { wch: 15 }, // 产品兴趣
        { wch: 15 }, // 项目预算
        { wch: 15 }, // 项目时间
        { wch: 10 }, // 来源
        { wch: 20 }, // 创建时间
        { wch: 20 }, // 更新时间
        { wch: 30 }  // 备注
      ];
      worksheet['!cols'] = columnWidths;

      // 添加工作表到工作簿
      XLSX.utils.book_append_sheet(workbook, worksheet, '询盘数据');

      // 生成Excel文件
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      return {
        buffer: excelBuffer,
        filename: `inquiries_export_${new Date().toISOString().split('T')[0]}.xlsx`,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      };
    } catch (error) {
      throw new Error(`Failed to export inquiries: ${error.message}`);
    }
  },

  // 导出询盘数据为CSV
  async exportToCSV(filters: any = {}) {
    try {
      const inquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {
        filters,
        populate: {
          attachments: true,
          assignedTo: true
        },
        sort: { createdAt: 'desc' }
      });

      // 准备CSV数据
      const csvData = inquiries.map((inquiry: any) => ({
        'ID': inquiry.id,
        '姓名': inquiry.name,
        '公司': inquiry.company || '',
        '邮箱': inquiry.email,
        '电话': inquiry.phone || '',
        '国家': inquiry.country || '',
        '主题': inquiry.subject,
        '消息内容': inquiry.message.replace(/[\r\n]+/g, ' '), // 移除换行符
        '状态': this.getStatusLabel(inquiry.status),
        '优先级': this.getPriorityLabel(inquiry.priority),
        '负责人': inquiry.assignedTo?.firstname ? `${inquiry.assignedTo.firstname} ${inquiry.assignedTo.lastname}` : '未分配',
        '产品兴趣': inquiry.productInterest || '',
        '项目预算': inquiry.projectBudget || '',
        '项目时间': inquiry.projectTimeline || '',
        '来源': this.getSourceLabel(inquiry.source),
        '创建时间': new Date(inquiry.createdAt).toLocaleString('zh-CN'),
        '更新时间': new Date(inquiry.updatedAt).toLocaleString('zh-CN'),
        '备注': inquiry.notes || ''
      }));

      // 转换为CSV格式
      const headers = Object.keys(csvData[0] || {});
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => 
          headers.map(header => `"${(row[header] || '').toString().replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');

      // 添加BOM以支持中文
      const csvBuffer = Buffer.from('\ufeff' + csvContent, 'utf8');

      return {
        buffer: csvBuffer,
        filename: `inquiries_export_${new Date().toISOString().split('T')[0]}.csv`,
        contentType: 'text/csv; charset=utf-8'
      };
    } catch (error) {
      throw new Error(`Failed to export inquiries to CSV: ${error.message}`);
    }
  },

  // 生成询盘报告
  async generateReport(dateRange: { start: string; end: string }) {
    try {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      const inquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {
        filters: {
          createdAt: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString()
          }
        },
        populate: {
          assignedTo: true
        }
      });

      // 统计数据
      const stats = {
        total: inquiries.length,
        byStatus: {},
        byPriority: {},
        bySource: {},
        byAssignee: {},
        byProductInterest: {},
        conversionRate: 0,
        responseTime: {
          average: 0,
          median: 0
        }
      };

      let totalResponseTime = 0;
      let responseTimes = [];
      let closedWon = 0;

      inquiries.forEach((inquiry: any) => {
        // 按状态统计
        const status = inquiry.status || 'new';
        stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

        // 按优先级统计
        const priority = inquiry.priority || 'medium';
        stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;

        // 按来源统计
        const source = inquiry.source || 'website';
        stats.bySource[source] = (stats.bySource[source] || 0) + 1;

        // 按负责人统计
        const assignee = inquiry.assignedTo ? 
          `${inquiry.assignedTo.firstname} ${inquiry.assignedTo.lastname}` : '未分配';
        stats.byAssignee[assignee] = (stats.byAssignee[assignee] || 0) + 1;

        // 按产品兴趣统计
        if (inquiry.productInterest) {
          stats.byProductInterest[inquiry.productInterest] = 
            (stats.byProductInterest[inquiry.productInterest] || 0) + 1;
        }

        // 计算响应时间
        if (inquiry.status !== 'new') {
          const responseTime = new Date(inquiry.updatedAt).getTime() - new Date(inquiry.createdAt).getTime();
          const responseHours = responseTime / (1000 * 60 * 60);
          responseTimes.push(responseHours);
          totalResponseTime += responseHours;
        }

        // 转化率统计
        if (inquiry.status === 'closed-won') {
          closedWon++;
        }
      });

      // 计算平均响应时间
      if (responseTimes.length > 0) {
        stats.responseTime.average = Math.round(totalResponseTime / responseTimes.length * 100) / 100;
        
        // 计算中位数响应时间
        responseTimes.sort((a, b) => a - b);
        const mid = Math.floor(responseTimes.length / 2);
        stats.responseTime.median = responseTimes.length % 2 === 0 ?
          Math.round((responseTimes[mid - 1] + responseTimes[mid]) / 2 * 100) / 100 :
          Math.round(responseTimes[mid] * 100) / 100;
      }

      // 计算转化率
      stats.conversionRate = inquiries.length > 0 ? 
        Math.round((closedWon / inquiries.length) * 100) : 0;

      return {
        dateRange,
        stats,
        inquiries: inquiries.length,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
  },

  // 辅助方法：获取状态标签
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

  // 辅助方法：获取优先级标签
  getPriorityLabel(priority: string): string {
    const priorityLabels = {
      'low': '低',
      'medium': '中',
      'high': '高',
      'urgent': '紧急'
    };
    return priorityLabels[priority] || priority;
  },

  // 辅助方法：获取来源标签
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
  }
}));