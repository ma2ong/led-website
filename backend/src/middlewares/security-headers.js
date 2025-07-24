/**
 * 安全头部中间件
 * 设置各种安全相关的HTTP头部
 */

'use strict';

const securityHeaders = (options = {}) => {
  const {
    contentSecurityPolicy = true,
    hsts = true,
    noSniff = true,
    frameOptions = true,
    xssProtection = true,
    referrerPolicy = true,
    permissionsPolicy = true,
  } = options;

  return async (ctx, next) => {
    await next();

    // Content Security Policy
    if (contentSecurityPolicy) {
      const cspDirectives = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://maps.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "media-src 'self' https:",
        "connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com",
        "frame-src 'self' https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests"
      ];
      
      ctx.set('Content-Security-Policy', cspDirectives.join('; '));
    }

    // HTTP Strict Transport Security
    if (hsts) {
      ctx.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    // X-Content-Type-Options
    if (noSniff) {
      ctx.set('X-Content-Type-Options', 'nosniff');
    }

    // X-Frame-Options
    if (frameOptions) {
      ctx.set('X-Frame-Options', 'DENY');
    }

    // X-XSS-Protection
    if (xssProtection) {
      ctx.set('X-XSS-Protection', '1; mode=block');
    }

    // Referrer Policy
    if (referrerPolicy) {
      ctx.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    // Permissions Policy
    if (permissionsPolicy) {
      const permissions = [
        'camera=()',
        'microphone=()',
        'geolocation=(self)',
        'payment=()',
        'usb=()',
        'magnetometer=()',
        'accelerometer=()',
        'gyroscope=()',
        'fullscreen=(self)'
      ];
      
      ctx.set('Permissions-Policy', permissions.join(', '));
    }

    // Remove server information
    ctx.remove('X-Powered-By');
    ctx.remove('Server');

    // Add custom security headers
    ctx.set('X-DNS-Prefetch-Control', 'off');
    ctx.set('X-Download-Options', 'noopen');
    ctx.set('X-Permitted-Cross-Domain-Policies', 'none');
  };
};

module.exports = securityHeaders;