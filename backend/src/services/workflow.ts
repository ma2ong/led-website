/**
 * 工作流服务
 * 处理内容发布工作流和状态管理
 */

export default {
  /**
   * 内容状态枚举
   */
  CONTENT_STATUS: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    APPROVED: 'approved',
    PUBLISHED: 'published',
    REJECTED: 'rejected',
    ARCHIVED: 'archived',
  },

  /**
   * 工作流配置
   */
  workflows: {
    // 产品发布工作流
    product: {
      states: [
        { name: 'draft', label: '草稿', color: 'gray' },
        { name: 'pending_review', label: '待审核', color: 'yellow' },
        { name: 'approved', label: '已批准', color: 'green' },
        { name: 'published', label: '已发布', color: 'blue' },
        { name: 'rejected', label: '已拒绝', color: 'red' },
        { name: 'archived', label: '已归档', color: 'gray' },
      ],
      transitions: [
        { from: 'draft', to: 'pending_review', roles: ['editor', 'contentManager'] },
        { from: 'pending_review', to: 'approved', roles: ['reviewer', 'superAdmin'] },
        { from: 'pending_review', to: 'rejected', roles: ['reviewer', 'superAdmin'] },
        { from: 'approved', to: 'published', roles: ['reviewer', 'superAdmin'] },
        { from: 'published', to: 'archived', roles: ['contentManager', 'superAdmin'] },
        { from: 'rejected', to: 'draft', roles: ['editor', 'contentManager'] },
      ],
    },

    // 案例研究发布工作流
    caseStudy: {
      states: [
        { name: 'draft', label: '草稿', color: 'gray' },
        { name: 'pending_review', label: '待审核', color: 'yellow' },
        { name: 'approved', label: '已批准', color: 'green' },
        { name: 'published', label: '已发布', color: 'blue' },
        { name: 'rejected', label: '已拒绝', color: 'red' },
      ],
      transitions: [
        { from: 'draft', to: 'pending_review', roles: ['editor', 'contentManager'] },
        { from: 'pending_review', to: 'approved', roles: ['reviewer', 'superAdmin'] },
        { from: 'pending_review', to: 'rejected', roles: ['reviewer', 'superAdmin'] },
        { from: 'approved', to: 'published', roles: ['reviewer', 'superAdmin'] },
        { from: 'rejected', to: 'draft', roles: ['editor', 'contentManager'] },
      ],
    },

    // 新闻发布工作流
    news: {
      states: [
        { name: 'draft', label: '草稿', color: 'gray' },
        { name: 'pending_review', label: '待审核', color: 'yellow' },
        { name: 'published', label: '已发布', color: 'blue' },
        { name: 'rejected', label: '已拒绝', color: 'red' },
      ],
      transitions: [
        { from: 'draft', to: 'pending_review', roles: ['editor', 'contentManager'] },
        { from: 'pending_review', to: 'published', roles: ['reviewer', 'superAdmin'] },
        { from: 'pending_review', to: 'rejected', roles: ['reviewer', 'superAdmin'] },
        { from: 'rejected', to: 'draft', roles: ['editor', 'contentManager'] },
      ],
    },
  },

  /**
   * 检查用户是否可以执行状态转换
   */
  async canTransition(contentType: string, fromState: string, toState: string, userRole: string): Promise<boolean> {
    const workflow = this.workflows[contentType];
    if (!workflow) return false;

    const transition = workflow.transitions.find(
      t => t.from === fromState && t.to === toState
    );

    if (!transition) return false;

    return transition.roles.includes(userRole);
  },

  /**
   * 执行状态转换
   */
  async transitionState(
    contentType: string,
    contentId: number,
    fromState: string,
    toState: string,
    userId: number,
    comment?: string
  ) {
    try {
      // 获取用户角色
      const user = await strapi.query('admin::user').findOne({
        where: { id: userId },
        populate: ['roles'],
      });

      if (!user || !user.roles || user.roles.length === 0) {
        throw new Error('用户角色未找到');
      }

      const userRole = user.roles[0].code;

      // 检查是否可以执行转换
      const canTransition = await this.canTransition(contentType, fromState, toState, userRole);
      if (!canTransition) {
        throw new Error('您没有权限执行此状态转换');
      }

      // 更新内容状态
      await strapi.query(`api::${contentType}.${contentType}`).update({
        where: { id: contentId },
        data: {
          workflowState: toState,
          lastTransitionAt: new Date(),
          lastTransitionBy: userId,
        },
      });

      // 记录工作流历史
      await this.logWorkflowHistory(contentType, contentId, fromState, toState, userId, comment);

      // 发送通知
      await this.sendWorkflowNotification(contentType, contentId, fromState, toState, userId);

      strapi.log.info(`Content ${contentType}:${contentId} transitioned from ${fromState} to ${toState} by user ${userId}`);
    } catch (error) {
      strapi.log.error('Failed to transition state:', error);
      throw error;
    }
  },

  /**
   * 记录工作流历史
   */
  async logWorkflowHistory(
    contentType: string,
    contentId: number,
    fromState: string,
    toState: string,
    userId: number,
    comment?: string
  ) {
    try {
      // 这里可以创建一个工作流历史记录表来存储状态变更历史
      // 暂时使用日志记录
      strapi.log.info('Workflow History:', {
        contentType,
        contentId,
        fromState,
        toState,
        userId,
        comment,
        timestamp: new Date(),
      });
    } catch (error) {
      strapi.log.error('Failed to log workflow history:', error);
    }
  },

  /**
   * 发送工作流通知
   */
  async sendWorkflowNotification(
    contentType: string,
    contentId: number,
    fromState: string,
    toState: string,
    userId: number
  ) {
    try {
      // 获取需要通知的用户
      const notificationRules = this.getNotificationRules(contentType, toState);
      
      for (const rule of notificationRules) {
        const users = await this.getUsersByRole(rule.role);
        
        for (const user of users) {
          if (user.id !== userId) { // 不通知执行操作的用户
            await this.sendNotificationEmail(user, {
              contentType,
              contentId,
              fromState,
              toState,
              actionBy: userId,
            });
          }
        }
      }
    } catch (error) {
      strapi.log.error('Failed to send workflow notification:', error);
    }
  },

  /**
   * 获取通知规则
   */
  getNotificationRules(contentType: string, toState: string) {
    const rules = [];

    // 当内容提交审核时，通知审核员
    if (toState === 'pending_review') {
      rules.push({ role: 'reviewer' });
    }

    // 当内容被批准时，通知内容管理员
    if (toState === 'approved') {
      rules.push({ role: 'contentManager' });
    }

    // 当内容被拒绝时，通知编辑员
    if (toState === 'rejected') {
      rules.push({ role: 'editor' });
    }

    return rules;
  },

  /**
   * 根据角色获取用户
   */
  async getUsersByRole(roleName: string) {
    try {
      const role = await strapi.query('admin::role').findOne({
        where: { code: roleName },
      });

      if (!role) return [];

      const users = await strapi.query('admin::user').findMany({
        where: {
          roles: {
            id: role.id,
          },
        },
      });

      return users;
    } catch (error) {
      strapi.log.error(`Failed to get users by role ${roleName}:`, error);
      return [];
    }
  },

  /**
   * 发送通知邮件
   */
  async sendNotificationEmail(user: any, workflowData: any) {
    try {
      const { contentType, contentId, fromState, toState } = workflowData;
      
      const emailTemplate = this.getEmailTemplate(toState);
      const subject = `内容状态更新通知 - ${contentType} #${contentId}`;
      const message = emailTemplate
        .replace('{userName}', user.firstname || user.email)
        .replace('{contentType}', contentType)
        .replace('{contentId}', contentId)
        .replace('{fromState}', fromState)
        .replace('{toState}', toState);

      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject,
        text: message,
        html: message.replace(/\n/g, '<br>'),
      });

      strapi.log.info(`Workflow notification sent to ${user.email}`);
    } catch (error) {
      strapi.log.error('Failed to send notification email:', error);
    }
  },

  /**
   * 获取邮件模板
   */
  getEmailTemplate(toState: string): string {
    const templates = {
      pending_review: `
        您好 {userName}，

        有新的内容需要您审核：
        - 内容类型：{contentType}
        - 内容ID：{contentId}
        - 状态变更：{fromState} → {toState}

        请登录管理后台进行审核。

        此邮件由系统自动发送，请勿回复。
      `,
      approved: `
        您好 {userName}，

        您的内容已通过审核：
        - 内容类型：{contentType}
        - 内容ID：{contentId}
        - 状态变更：{fromState} → {toState}

        您现在可以发布此内容。

        此邮件由系统自动发送，请勿回复。
      `,
      rejected: `
        您好 {userName}，

        您的内容审核未通过：
        - 内容类型：{contentType}
        - 内容ID：{contentId}
        - 状态变更：{fromState} → {toState}

        请根据审核意见修改后重新提交。

        此邮件由系统自动发送，请勿回复。
      `,
      published: `
        您好 {userName}，

        内容已成功发布：
        - 内容类型：{contentType}
        - 内容ID：{contentId}
        - 状态变更：{fromState} → {toState}

        内容现在对公众可见。

        此邮件由系统自动发送，请勿回复。
      `,
    };

    return templates[toState] || '内容状态已更新。';
  },

  /**
   * 获取内容的当前工作流状态
   */
  async getContentWorkflowState(contentType: string, contentId: number) {
    try {
      const content = await strapi.query(`api::${contentType}.${contentType}`).findOne({
        where: { id: contentId },
        select: ['workflowState', 'lastTransitionAt', 'lastTransitionBy'],
      });

      return content?.workflowState || 'draft';
    } catch (error) {
      strapi.log.error('Failed to get content workflow state:', error);
      return 'draft';
    }
  },

  /**
   * 获取用户可执行的状态转换
   */
  async getAvailableTransitions(contentType: string, currentState: string, userRole: string) {
    const workflow = this.workflows[contentType];
    if (!workflow) return [];

    return workflow.transitions.filter(
      t => t.from === currentState && t.roles.includes(userRole)
    );
  },

  /**
   * 批量更新内容状态
   */
  async bulkTransitionState(
    contentType: string,
    contentIds: number[],
    toState: string,
    userId: number,
    comment?: string
  ) {
    const results = [];

    for (const contentId of contentIds) {
      try {
        const currentState = await this.getContentWorkflowState(contentType, contentId);
        await this.transitionState(contentType, contentId, currentState, toState, userId, comment);
        results.push({ contentId, success: true });
      } catch (error) {
        results.push({ contentId, success: false, error: error.message });
      }
    }

    return results;
  },
};