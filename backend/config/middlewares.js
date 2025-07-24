/**
 * 中间件配置
 * 配置Strapi应用的中间件
 */

module.exports = [
  'strapi::errors',
  // 添加自定义安全中间件
  {
    name: 'global::security',
    config: {},
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  // 添加输入验证中间件
  {
    name: 'global::input-validation',
    config: {},
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  // 添加速率限制中间件
  {
    name: 'global::rate-limit',
    config: {
      interval: 60000, // 1分钟
      max: 100, // 每分钟最多100个请求
      prefixKey: 'middleware:rateLimit',
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      enableHeaders: true,
    },
  },
  // 添加自定义权限中间件
  {
    name: 'global::permissions',
    config: {},
  },
];