module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // 设置安全头部
    ctx.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    });

    // 移除敏感头部信息
    ctx.remove('X-Powered-By');
    ctx.remove('Server');

    await next();
  };
};