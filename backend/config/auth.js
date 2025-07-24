/**
 * 身份认证配置
 * 配置系统的身份认证和安全设置
 */

module.exports = ({ env }) => ({
  // JWT配置
  jwt: {
    secret: env('JWT_SECRET'),
    expiresIn: '30d',
  },
  
  // 会话配置
  session: {
    secret: env('APP_KEYS').split(',')[0],
    maxAge: 24 * 60 * 60 * 1000, // 24小时
    secure: env('NODE_ENV') === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
  
  // 密码策略
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSymbols: true,
    requireUppercase: true,
    requireLowercase: true,
    maxConsecutiveRepeats: 3,
  },
  
  // 登录尝试限制
  loginAttempts: {
    maxAttempts: 5,
    timeWindow: 15 * 60 * 1000, // 15分钟
    lockDuration: 30 * 60 * 1000, // 30分钟
  },
  
  // 双因素认证
  twoFactorAuth: {
    enabled: env.bool('TWO_FACTOR_AUTH_ENABLED', false),
    issuer: 'Lianjin LED',
  },
  
  // 注册配置
  registration: {
    enabled: false, // 禁用公开注册
    requireEmailConfirmation: true,
    defaultRole: 'api_user',
  },
  
  // 密码重置
  passwordReset: {
    enabled: true,
    tokenExpiration: 24 * 60 * 60 * 1000, // 24小时
  },
  
  // API令牌
  apiToken: {
    salt: env('API_TOKEN_SALT'),
    expiresIn: '30d',
  },
  
  // 安全头部
  securityHeaders: {
    enabled: true,
    frameguard: {
      action: 'sameorigin',
    },
    xssProtection: {
      enabled: true,
      mode: 'block',
    },
    noSniff: true,
    noCache: false,
    hsts: {
      enabled: env('NODE_ENV') === 'production',
      maxAge: 31536000, // 1年
      includeSubDomains: true,
      preload: true,
    },
    contentSecurityPolicy: {
      enabled: env('NODE_ENV') === 'production',
      policy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", 'data:', 'blob:', '*.cloudinary.com'],
        'font-src': ["'self'", 'data:'],
        'connect-src': ["'self'", 'https:'],
      },
    },
  },
  
  // CORS配置
  cors: {
    enabled: true,
    origin: env.array('CORS_ORIGIN', ['http://localhost:3000']),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: true,
    maxAge: 86400, // 24小时
  },
  
  // 速率限制
  rateLimit: {
    enabled: true,
    interval: 60 * 1000, // 1分钟
    max: 100, // 每分钟最多100个请求
    delayAfter: 50, // 50个请求后开始延迟
    timeWait: 100, // 延迟100毫秒
    whitelist: ['127.0.0.1'], // 白名单IP
    skipSuccessfulRequests: false,
  },
});