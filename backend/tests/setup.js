/**
 * Jest测试设置文件 - 后端
 */

const Strapi = require('@strapi/strapi');
const fs = require('fs');

let instance;

/**
 * 设置Strapi实例用于测试
 */
async function setupStrapi() {
  if (!instance) {
    // 设置测试环境变量
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_NAME = process.env.TEST_DATABASE_NAME || 'strapi_test';
    
    // 创建Strapi实例
    instance = await Strapi({
      distDir: './dist',
      autoReload: false,
      serveAdminPanel: false,
    }).load();
    
    // 启动服务器
    await instance.server.mount();
  }
  
  return instance;
}

/**
 * 清理Strapi实例
 */
async function cleanupStrapi() {
  if (instance) {
    await instance.destroy();
    instance = null;
  }
}

/**
 * 重置数据库
 */
async function resetDatabase() {
  if (instance) {
    // 获取所有内容类型
    const contentTypes = Object.keys(strapi.contentTypes);
    
    // 清空所有表
    for (const contentType of contentTypes) {
      if (contentType.startsWith('api::')) {
        await strapi.entityService.deleteMany(contentType, {});
      }
    }
  }
}

/**
 * 创建测试用户
 */
async function createTestUser(userData = {}) {
  const defaultUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpassword123',
    confirmed: true,
    blocked: false,
  };
  
  const user = await strapi.plugins['users-permissions'].services.user.add({
    ...defaultUser,
    ...userData,
  });
  
  return user;
}

/**
 * 创建测试管理员
 */
async function createTestAdmin(adminData = {}) {
  const defaultAdmin = {
    firstname: 'Test',
    lastname: 'Admin',
    email: 'admin@example.com',
    password: 'adminpassword123',
    isActive: true,
  };
  
  const admin = await strapi.admin.services.user.create({
    ...defaultAdmin,
    ...adminData,
  });
  
  return admin;
}

/**
 * 生成JWT令牌
 */
function generateJWT(user) {
  return strapi.plugins['users-permissions'].services.jwt.issue({
    id: user.id,
  });
}

/**
 * 生成管理员JWT令牌
 */
function generateAdminJWT(admin) {
  return strapi.admin.services.token.createJwtToken(admin);
}

/**
 * 创建测试请求
 */
function createRequest() {
  return strapi.server.httpServer.listen();
}

// 全局设置
beforeAll(async () => {
  await setupStrapi();
  global.strapi = instance;
});

// 每个测试前重置数据库
beforeEach(async () => {
  await resetDatabase();
});

// 全局清理
afterAll(async () => {
  await cleanupStrapi();
});

// 导出工具函数
module.exports = {
  setupStrapi,
  cleanupStrapi,
  resetDatabase,
  createTestUser,
  createTestAdmin,
  generateJWT,
  generateAdminJWT,
  createRequest,
};