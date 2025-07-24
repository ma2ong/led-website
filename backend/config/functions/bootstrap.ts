export default async () => {
  // 初始化询盘调度器
  try {
    await strapi.service('api::inquiry.inquiry-scheduler').initializeScheduler();
    console.log('Inquiry scheduler initialized successfully');
  } catch (error) {
    console.error('Failed to initialize inquiry scheduler:', error);
  }
};