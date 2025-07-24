/**
 * 权限中间件
 * 用于检查用户是否有权限访问特定的API端点
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    // 跳过预检请求
    if (ctx.request.method === 'OPTIONS') {
      return await next();
    }

    try {
      // 获取当前用户
      const user = ctx.state.user;

      // 如果没有用户，则检查是否是公开路由
      if (!user) {
        // 检查是否是公开路由
        const isPublicRoute = await isRoutePublic(ctx.request.path, ctx.request.method, strapi);
        if (!isPublicRoute) {
          return ctx.unauthorized('未授权访问，请登录');
        }
        return await next();
      }

      // 获取用户角色
      const roles = user.roles || [];

      // 如果用户是管理员，直接放行
      if (roles.some(role => role.code === 'strapi-super-admin' || role.name === '管理员')) {
        return await next();
      }

      // 检查用户是否有权限访问当前路由
      const hasPermission = await checkPermission(ctx.request.path, ctx.request.method, roles, strapi);
      if (!hasPermission) {
        return ctx.forbidden('您没有权限执行此操作');
      }

      // 继续处理请求
      await next();
    } catch (error) {
      strapi.log.error('权限检查错误:', error);
      return ctx.badRequest('权限检查过程中发生错误');
    }
  };
};

/**
 * 检查路由是否公开
 */
const isRoutePublic = async (path: string, method: string, strapi: Strapi): Promise<boolean> => {
  // 公开路由列表
  const publicRoutes = [
    { path: '/api/products', method: 'GET' },
    { path: '/api/products/:id', method: 'GET' },
    { path: '/api/case-studies', method: 'GET' },
    { path: '/api/case-studies/:id', method: 'GET' },
    { path: '/api/news', method: 'GET' },
    { path: '/api/news/:id', method: 'GET' },
    { path: '/api/pages', method: 'GET' },
    { path: '/api/pages/:id', method: 'GET' },
    { path: '/api/global-setting', method: 'GET' },
    { path: '/api/inquiries', method: 'POST' },
    { path: '/api/auth/local', method: 'POST' },
    { path: '/api/auth/local/register', method: 'POST' },
    { path: '/api/auth/forgot-password', method: 'POST' },
    { path: '/api/auth/reset-password', method: 'POST' },
    { path: '/api/auth/send-email-confirmation', method: 'POST' },
    { path: '/api/auth/email-confirmation', method: 'GET' },
  ];

  // 检查路径是否匹配公开路由
  for (const route of publicRoutes) {
    if (matchRoute(path, route.path) && method === route.method) {
      return true;
    }
  }

  return false;
};

/**
 * 检查用户是否有权限访问路由
 */
const checkPermission = async (path: string, method: string, roles: any[], strapi: Strapi): Promise<boolean> => {
  // 获取路由对应的API和操作
  const { api, action } = getApiAndAction(path, method);
  if (!api || !action) {
    return false;
  }

  // 检查用户角色是否有权限
  for (const role of roles) {
    const permissions = await strapi.query('admin::permission').findMany({
      where: {
        role: role.id,
        action: `api::${api}.${api}.${action}`,
      },
    });

    if (permissions.length > 0) {
      return true;
    }
  }

  return false;
};

/**
 * 从路径和方法获取API和操作
 */
const getApiAndAction = (path: string, method: string): { api: string | null; action: string | null } => {
  // 解析路径获取API名称
  const matches = path.match(/^\/api\/([^\/]+)/);
  if (!matches || !matches[1]) {
    return { api: null, action: null };
  }

  const api = matches[1];
  let action = null;

  // 根据HTTP方法确定操作
  switch (method) {
    case 'GET':
      action = path.includes(`/${api}/`) ? 'findOne' : 'find';
      break;
    case 'POST':
      action = 'create';
      break;
    case 'PUT':
    case 'PATCH':
      action = 'update';
      break;
    case 'DELETE':
      action = 'delete';
      break;
    default:
      action = null;
  }

  return { api, action };
};

/**
 * 匹配路由路径
 */
const matchRoute = (requestPath: string, routePath: string): boolean => {
  // 将路由路径转换为正则表达式
  const pattern = routePath
    .replace(/:\w+/g, '[^/]+') // 替换路径参数为正则
    .replace(/\//g, '\\/'); // 转义斜杠

  const regex = new RegExp(`^${pattern}$`);
  return regex.test(requestPath);
};