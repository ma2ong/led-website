/**
 * inquiry service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::inquiry.inquiry', ({ strapi }) => ({
  // 获取询盘统计信息
  async getInquiryStats() {
    const inquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {});

    const stats = {
      total: inquiries.length,
      byStatus: {},
      byPriority: {},
      byProductInterest: {},
      bySource: {},
      thisMonth: 0,
      thisWeek: 0,
      conversionRate: 0
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    let closedWon = 0;

    // 统计各种维度
    inquiries.forEach((inquiry: any) => {
      // 按状态统计
      const status = inquiry.status || 'new';
      stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

      // 按优先级统计
      const priority = inquiry.priority || 'medium';
      stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;

      // 按产品兴趣统计
      if (inquiry.productInterest) {
        stats.byProductInterest[inquiry.productInterest] = (stats.byProductInterest[inquiry.productInterest] || 0) + 1;
      }

      // 按来源统计
      const source = inquiry.source || 'website';
      stats.bySource[source] = (stats.bySource[source] || 0) + 1;

      // 时间统计
      const createdDate = new Date(inquiry.createdAt);
      if (createdDate.getFullYear() === currentYear && createdDate.getMonth() === currentMonth) {
        stats.thisMonth++;
      }
      if (createdDate >= oneWeekAgo) {
        stats.thisWeek++;
      }

      // 转化率统计
      if (inquiry.status === 'closed-won') {
        closedWon++;
      }
    });

    // 计算转化率
    stats.conversionRate = inquiries.length > 0 ? Math.round((closedWon / inquiries.length) * 100) : 0;

    return stats;
  },

  // 验证询盘数据
  validateInquiryData(data: any) {
    const errors: string[] = [];

    // 必填字段验证
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

    if (!data.subject || data.subject.trim().length === 0) {
      errors.push('Subject is required');
    }

    if (!data.message || data.message.trim().length === 0) {
      errors.push('Message is required');
    }

    // 长度验证
    if (data.name && data.name.length > 100) {
      errors.push('Name must be less than 100 characters');
    }

    if (data.subject && data.subject.length > 200) {
      errors.push('Subject must be less than 200 characters');
    }

    if (data.message && data.message.length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // 检测垃圾询盘
  async detectSpam(data: any, ipAddress: string) {
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'winner', 'congratulations',
      'click here', 'free money', 'make money fast', 'work from home'
    ];

    const suspiciousPatterns = [
      /\b\d{10,}\b/, // 长数字串
      /http[s]?:\/\/[^\s]+/gi, // URL链接
      /[A-Z]{10,}/, // 连续大写字母
    ];

    let spamScore = 0;

    // 检查垃圾关键词
    const content = `${data.subject} ${data.message}`.toLowerCase();
    spamKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        spamScore += 10;
      }
    });

    // 检查可疑模式
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        spamScore += 5;
      }
    });

    // 检查IP地址历史
    const recentInquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {
      filters: {
        ipAddress,
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
      }
    });

    if (recentInquiries.length > 3) {
      spamScore += 15; // 24小时内超过3次询盘
    }

    return {
      isSpam: spamScore >= 20,
      spamScore,
      reasons: spamScore >= 20 ? ['High spam score detected'] : []
    };
  },

  // 自动分配询盘
  async autoAssignInquiry(inquiryId: number) {
    // 这里可以实现自动分配逻辑
    // 例如：轮询分配、按产品类型分配、按地区分配等
    
    const salesTeam = [
      'sales1@lianjin-led.com',
      'sales2@lianjin-led.com',
      'sales3@lianjin-led.com'
    ];

    // 简单的轮询分配
    const assignedTo = salesTeam[inquiryId % salesTeam.length];

    await strapi.entityService.update('api::inquiry.inquiry', inquiryId, {
      data: { assignedTo }
    } as any);

    return assignedTo;
  }
}));