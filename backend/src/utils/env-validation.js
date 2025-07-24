/**
 * 环境变量验证工具
 * 确保所有必需的环境变量都已设置
 */

'use strict';

const requiredEnvVars = [
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_NAME',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'JWT_SECRET',
  'ADMIN_JWT_SECRET',
  'API_TOKEN_SALT',
  'APP_KEYS',
];

const optionalEnvVars = [
  'CLOUDINARY_NAME',
  'CLOUDINARY_KEY',
  'CLOUDINARY_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USERNAME',
  'SMTP_PASSWORD',
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_PASSWORD',
];

/**
 * 验证环境变量
 */
function validateEnvironment() {
  const missing = [];
  const warnings = [];

  // 检查必需的环境变量
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // 检查可选但推荐的环境变量
  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar]) {
      warnings.push(envVar);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => {
      console.error(`   - ${envVar}`);
    });
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Missing optional environment variables:');
    warnings.forEach(envVar => {
      console.warn(`   - ${envVar}`);
    });
  }

  console.log('✅ Environment validation passed');
}

/**
 * 验证JWT密钥强度
 */
function validateJWTSecrets() {
  const jwtSecret = process.env.JWT_SECRET;
  const adminJwtSecret = process.env.ADMIN_JWT_SECRET;
  
  if (jwtSecret && jwtSecret.length < 32) {
    console.warn('⚠️  JWT_SECRET should be at least 32 characters long');
  }
  
  if (adminJwtSecret && adminJwtSecret.length < 32) {
    console.warn('⚠️  ADMIN_JWT_SECRET should be at least 32 characters long');
  }
  
  if (jwtSecret === adminJwtSecret) {
    console.error('❌ JWT_SECRET and ADMIN_JWT_SECRET should be different');
    process.exit(1);
  }
}

/**
 * 验证数据库配置
 */
function validateDatabaseConfig() {
  const host = process.env.DATABASE_HOST;
  const port = process.env.DATABASE_PORT;
  const name = process.env.DATABASE_NAME;
  
  if (host === 'localhost' && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  Using localhost database in production environment');
  }
  
  if (port && (isNaN(port) || port < 1 || port > 65535)) {
    console.error('❌ DATABASE_PORT must be a valid port number');
    process.exit(1);
  }
  
  if (name && name.length < 3) {
    console.warn('⚠️  DATABASE_NAME seems too short');
  }
}

/**
 * 验证安全配置
 */
function validateSecurityConfig() {
  const nodeEnv = process.env.NODE_ENV;
  
  if (nodeEnv === 'production') {
    // 生产环境安全检查
    if (!process.env.HTTPS) {
      console.warn('⚠️  HTTPS should be enabled in production');
    }
    
    if (process.env.STRAPI_DISABLE_UPDATE_NOTIFICATION !== 'true') {
      console.warn('⚠️  Consider disabling update notifications in production');
    }
    
    if (!process.env.ADMIN_PATH || process.env.ADMIN_PATH === '/admin') {
      console.warn('⚠️  Consider changing the default admin path in production');
    }
  }
}

/**
 * 生成安全的随机字符串
 */
function generateSecureSecret(length = 64) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * 生成环境变量模板
 */
function generateEnvTemplate() {
  const template = `# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_led_website
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=${generateSecureSecret(32)}

# Secrets
JWT_SECRET=${generateSecureSecret(64)}
ADMIN_JWT_SECRET=${generateSecureSecret(64)}
API_TOKEN_SALT=${generateSecureSecret(32)}
APP_KEYS=${generateSecureSecret(32)},${generateSecureSecret(32)},${generateSecureSecret(32)},${generateSecureSecret(32)}

# Cloudinary (Optional)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Security
NODE_ENV=development
HTTPS=false
ADMIN_PATH=/admin
STRAPI_DISABLE_UPDATE_NOTIFICATION=false
`;

  return template;
}

module.exports = {
  validateEnvironment,
  validateJWTSecrets,
  validateDatabaseConfig,
  validateSecurityConfig,
  generateSecureSecret,
  generateEnvTemplate,
};