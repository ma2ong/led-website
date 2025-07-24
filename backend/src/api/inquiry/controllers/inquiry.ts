/**
 * inquiry controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::inquiry.inquiry', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // 验证询盘数据
    const validation = await strapi.service('api::inquiry.inquiry').validateInquiryData(data);
    if (!validation.isValid) {
      return ctx.throw(400, validation.errors.join(', '));
    }

    // 检测垃圾询盘
    const spamCheck = await strapi.service('api::inquiry.inquiry').detectSpam(data, ctx.request.ip);
    if (spamCheck.isSpam) {
      console.warn(`Spam inquiry detected from IP ${ctx.request.ip}:`, spamCheck.reasons);
      // 可以选择拒绝或标记为垃圾询盘
      data.isSpam = true;
      data.spamScore = spamCheck.spamScore;
    }
    
    // 添加IP地址和用户代理信息
    const inquiryData = {
      ...data,
      ipAddress: ctx.request.ip,
      userAgent: ctx.request.header['user-agent'],
      status: 'new',
      priority: data.priority || 'medium'
    };

    const entity = await strapi.entityService.create('api::inquiry.inquiry', {
      data: inquiryData,
      populate: {
        attachments: true
      }
    });

    // 发送新询盘通知
    try {
      await strapi.service('api::inquiry.inquiry-notification').sendNewInquiryNotification(entity);
    } catch (error) {
      console.error('Failed to send inquiry notification:', error);
    }

    // 自动分配询盘（如果启用）
    if (process.env.AUTO_ASSIGN_INQUIRIES === 'true') {
      try {
        await strapi.service('api::inquiry.inquiry').autoAssignInquiry(entity.id);
      } catch (error) {
        console.error('Failed to auto-assign inquiry:', error);
      }
    }

    return { data: entity };
  },

  async find(ctx) {
    const { query } = ctx;
    
    const populateQuery = {
      ...query,
      populate: {
        attachments: true
      }
    };

    const data = await strapi.entityService.findMany('api::inquiry.inquiry', populateQuery);
    
    return { data };
  },

  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status, notes, assignedTo, followUpDate } = ctx.request.body;

    const entity = await strapi.entityService.update('api::inquiry.inquiry', id, {
      data: {
        status,
        notes,
        assignedTo,
        followUpDate
      }
    } as any);

    return { data: entity };
  },

  // 获取询盘统计
  async getStats(ctx) {
    try {
      const data = await strapi.service('api::inquiry.inquiry').getInquiryStats();
      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get inquiry statistics');
    }
  },

  // 按状态获取询盘
  async findByStatus(ctx) {
    const { status } = ctx.params;
    
    const data = await strapi.entityService.findMany('api::inquiry.inquiry', {
      filters: { status },
      populate: {
        attachments: true
      },
      sort: { createdAt: 'desc' }
    });
    
    return { data };
  },

  // 按优先级获取询盘
  async findByPriority(ctx) {
    const { priority } = ctx.params;
    
    const data = await strapi.entityService.findMany('api::inquiry.inquiry', {
      filters: { priority },
      populate: {
        attachments: true
      },
      sort: { createdAt: 'desc' }
    });
    
    return { data };
  },

  // 获取需要跟进的询盘
  async findFollowUps(ctx) {
    const today = new Date().toISOString().split('T')[0];
    
    const data = await strapi.entityService.findMany('api::inquiry.inquiry', {
      filters: {
        followUpDate: { $lte: today },
        status: { $in: ['new', 'contacted', 'in-progress'] }
      },
      populate: {
        attachments: true
      },
      sort: { followUpDate: 'asc' }
    });
    
    return { data };
  },

  // 导出询盘数据
  async export(ctx) {
    try {
      const { format = 'excel', ...filters } = ctx.query;
      
      let exportResult;
      if (format === 'csv') {
        exportResult = await strapi.service('api::inquiry.inquiry-export').exportToCSV(filters);
      } else {
        exportResult = await strapi.service('api::inquiry.inquiry-export').exportToExcel(filters);
      }

      ctx.set('Content-Type', exportResult.contentType);
      ctx.set('Content-Disposition', `attachment; filename="${exportResult.filename}"`);
      ctx.body = exportResult.buffer;
    } catch (error) {
      ctx.throw(500, 'Failed to export inquiries');
    }
  },

  // 生成询盘报告
  async generateReport(ctx) {
    try {
      const { startDate, endDate } = ctx.query;
      
      if (!startDate || !endDate) {
        return ctx.throw(400, 'Start date and end date are required');
      }

      const report = await strapi.service('api::inquiry.inquiry-export').generateReport({
        start: startDate,
        end: endDate
      });

      return { data: report };
    } catch (error) {
      ctx.throw(500, 'Failed to generate report');
    }
  },

  // 批量更新询盘状态
  async bulkUpdateStatus(ctx) {
    try {
      const { ids, status, assignedTo } = ctx.request.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return ctx.throw(400, 'Invalid inquiry IDs');
      }

      const updateData: any = { updatedAt: new Date() };
      if (status) updateData.status = status;
      if (assignedTo) updateData.assignedTo = assignedTo;

      const updatedInquiries = await Promise.all(
        ids.map(id => 
          strapi.entityService.update('api::inquiry.inquiry', id, {
            data: updateData
          })
        )
      );

      return { data: updatedInquiries };
    } catch (error) {
      ctx.throw(500, 'Failed to bulk update inquiries');
    }
  },

  // 添加询盘回复
  async addReply(ctx) {
    try {
      const { id } = ctx.params;
      const { content, attachments } = ctx.request.body;
      const user = ctx.state.user;

      // 获取当前询盘
      const inquiry = await strapi.entityService.findOne('api::inquiry.inquiry', id, {
        populate: ['replies']
      });

      if (!inquiry) {
        return ctx.throw(404, 'Inquiry not found');
      }

      // 创建新回复
      const newReply = {
        content,
        replyBy: user.id,
        replyTime: new Date(),
        attachments: attachments || []
      };

      // 更新询盘，添加回复
      const updatedInquiry = await strapi.entityService.update('api::inquiry.inquiry', id, {
        data: {
          replies: [...(inquiry.replies || []), newReply],
          status: 'replied',
          updatedAt: new Date()
        }
      });

      return { data: updatedInquiry };
    } catch (error) {
      ctx.throw(500, 'Failed to add reply');
    }
  },

  // 设置询盘提醒
  async setReminder(ctx) {
    try {
      const { id } = ctx.params;
      const { followUpDate, notes } = ctx.request.body;

      const updatedInquiry = await strapi.entityService.update('api::inquiry.inquiry', id, {
        data: {
          followUpDate,
          notes,
          updatedAt: new Date()
        }
      });

      return { data: updatedInquiry };
    } catch (error) {
      ctx.throw(500, 'Failed to set reminder');
    }
  }
}));