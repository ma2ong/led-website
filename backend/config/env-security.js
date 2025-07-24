/**
 * 环境变量安全配置
 * 确保敏感信息的安全存储和访问
 */

// 必需的环境变量列表
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ADMIN_JWT_SECRET',
  'APP_KEYS',
  'API_TOKEN_SALT',
  'TRANSFER_TOKEN_SALT',
];

// 验证必需的环境变量
function validateRequiredEnvVars() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// 生成安全的随机密钥
function generateSecureKey(length = 32) {
  const crypto = require('crypto');
  return crypto.randomBytes(length).toString('hex');
}

// 验证JWT密钥强度
function validateJWTSecret(secret) {
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
}

// 初始化安全配置
function initializeSecurity() {
  try {
    validateRequiredEnvVars();
    validateJWTSecret(process.env.JWT_SECRET);
    validateJWTSecret(process.env.ADMIN_JWT_SECRET);
    
    console.log('✅ Environment security validation passed');
  } catch (error) {
    console.error('❌ Environment security validation failed:', error.message);
    process.exit(1);
  }
}

module.exports = {
  validateRequiredEnvVars,
  generateSecureKey,
  validateJWTSecret,
  initializeSecurity,
};