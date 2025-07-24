/**
 * 角色初始化中间件
 * 在应用启动时初始化默认角色和权限
 */

import roleManager from '../services/role-manager';

export default () => {
  return async (ctx, next) => {
    // 只在应用启动时执行一次
    if (!global.rolesInitialized) {
      try {
        await roleManager.initializeRoles();
        global.rolesInitialized = true;
        strapi.log.info('Roles initialized successfully');
      } catch (error) {
        strapi.log.error('Failed to initialize roles:', error);
      }
    }
    
    await next();
  };
};