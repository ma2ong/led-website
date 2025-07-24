/**
 * 应用程序入口点
 */

import roleManager from './services/role-manager';

export default {
  /**
   * 应用启动时执行的初始化逻辑
   */
  async bootstrap({ strapi }) {
    try {
      // 初始化角色和权限
      await roleManager.initializeRoles();
      strapi.log.info('Application bootstrap completed successfully');
    } catch (error) {
      strapi.log.error('Application bootstrap failed:', error);
    }
  },

  /**
   * 应用注册时执行的逻辑
   */
  async register({ strapi }) {
    // 注册自定义服务
    strapi.container.get('services').add('roleManager', roleManager);
    
    // 注册工作流服务
    const workflowService = await import('./services/workflow');
    strapi.container.get('services').add('workflow', workflowService.default);
    
    strapi.log.info('Custom services registered successfully');
  },

  /**
   * 应用销毁时执行的清理逻辑
   */
  async destroy({ strapi }) {
    strapi.log.info('Application is shutting down...');
  },
};