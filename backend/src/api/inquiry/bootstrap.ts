/**
 * inquiry bootstrap
 */

export default {
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // 初始化询盘调度器
    try {
      const inquiryScheduler = strapi.service('api::inquiry.inquiry-scheduler');
      if (inquiryScheduler && typeof inquiryScheduler.initializeScheduler === 'function') {
        inquiryScheduler.initializeScheduler();
        console.log('Inquiry scheduler initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize inquiry scheduler:', error);
    }

    // 设置询盘相关的默认配置
    try {
      // 检查是否需要创建默认的询盘设置
      const defaultSettings = {
        autoAssignEnabled: process.env.AUTO_ASSIGN_INQUIRIES === 'true',
        notificationsEnabled: process.env.INQUIRY_NOTIFICATIONS_ENABLED !== 'false',
        spamDetectionEnabled: process.env.SPAM_DETECTION_ENABLED !== 'false',
        followUpRemindersEnabled: process.env.FOLLOW_UP_REMINDERS !== 'false',
        dailyReportsEnabled: process.env.DAILY_REPORTS_ENABLED !== 'false',
      };

      console.log('Inquiry system initialized with settings:', defaultSettings);
    } catch (error) {
      console.error('Failed to initialize inquiry settings:', error);
    }
  },
};