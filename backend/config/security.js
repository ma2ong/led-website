/**
 * 安全配置
 * 配置应用的安全设置
 */

'use strict';

module.exports = ({ env }) => ({
  // CORS配置
  cors: {
    enabled: true,
    origin: env.array('CORS_ORIGINS', [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://your-domain.com',
    ]),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'X-File-Name',
    ],
  },

  // 内容安全策略
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://www.google.com',
        'https://www.gstatic.com',
        'https://maps.googleapis.com',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
      ],
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https://res.cloudinary.com',
        'https://images.unsplash.com',
      ],
      'media-src': [
        "'self'",
        'https://res.cloudinary.com',
      ],
      'connect-src': [
        "'self'",
        'https://api.cloudinary.com',
        'https://res.cloudinary.com',
      ],
      'frame-src': [
        "'self'",
        'https://www.google.com',
      ],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': env('NODE_ENV') === 'production',
    },
  },

  // 速率限制配置
  rateLimit: {
    // 全局限制
    global: {
      interval: 60000, // 1分钟
      max: 100, // 最大请求数
    },
    
    // API特定限制
    api: {
      interval: 60000,
      max: 60,
    },
    
    // 表单提交限制
    forms: {
      interval: 60000,
      max: 5,
    },
    
    // 认证限制
    auth: {
      interval: 300000, // 5分钟
      max: 5, // 最多5次登录尝试
    },
  },

  // 会话配置
  session: {
    key: 'strapi.sid',
    maxAge: 86400000, // 24小时
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: env('NODE_ENV') === 'production',
    sameSite: 'strict',
  },

  // JWT配置
  jwt: {
    secret: env('JWT_SECRET'),
    expiresIn: '7d',
    issuer: 'strapi-led-website',
    audience: 'strapi-users',
  },

  // 管理员JWT配置
  adminJWT: {
    secret: env('ADMIN_JWT_SECRET'),
    expiresIn: '30d',
    issuer: 'strapi-led-website-admin',
    audience: 'strapi-admins',
  },

  // 文件上传安全
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    filenameSanitization: true,
    virusScan: env.bool('ENABLE_VIRUS_SCAN', false),
  },

  // 密码策略
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90天
    preventReuse: 5, // 防止重复使用最近5个密码
  },

  // 账户锁定策略
  accountLockout: {
    maxAttempts: 5,
    lockoutDuration: 30 * 60 * 1000, // 30分钟
    resetTime: 60 * 60 * 1000, // 1小时后重置尝试次数
  },

  // 审计日志
  auditLog: {
    enabled: env.bool('ENABLE_AUDIT_LOG', true),
    events: [
      'auth.login',
      'auth.logout',
      'auth.failed-login',
      'content.create',
      'content.update',
      'content.delete',
      'admin.user.create',
      'admin.user.update',
      'admin.user.delete',
      'admin.role.update',
      'admin.permission.update',
    ],
    retention: 90, // 保留90天
  },

  // IP白名单（可选）
  ipWhitelist: {
    enabled: env.bool('ENABLE_IP_WHITELIST', false),
    adminPaths: env.array('ADMIN_IP_WHITELIST', []),
    apiPaths: env.array('API_IP_WHITELIST', []),
  },

  // 安全头部
  securityHeaders: {
    hsts: {
      enabled: env('NODE_ENV') === 'production',
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    xssProtection: true,
    noSniff: true,
    frameOptions: 'DENY',
    referrerPolicy: 'strict-origin-when-cross-origin',
    permissionsPolicy: {
      camera: [],
      microphone: [],
      geolocation: ['self'],
      payment: [],
      usb: [],
    },
  },
});