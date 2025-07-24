#!/usr/bin/env node

/**
 * 部署脚本
 * 用于自动化部署前端和后端应用
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const config = {
  frontend: {
    buildCommand: 'npm run build',
    deployCommand: 'vercel --prod', // 或其他部署命令
    directory: './frontend'
  },
  backend: {
    buildCommand: 'npm run build',
    deployCommand: 'pm2 restart strapi-production',
    directory: './backend'
  },
  environments: {
    staging: {
      frontendUrl: 'https://staging.yourcompany.com',
      backendUrl: 'https://api-staging.yourcompany.com'
    },
    production: {
      frontendUrl: 'https://www.yourcompany.com',
      backendUrl: 'https://api.yourcompany.com'
    }
  }
};

function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function execCommand(command, cwd = process.cwd()) {
  log(`执行命令: ${command}`);
  try {
    const result = execSync(command, { 
      cwd, 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    return result;
  } catch (error) {
    log(`命令执行失败: ${error.message}`);
    process.exit(1);
  }
}

function checkEnvironment() {
  log('检查部署环境...');
  
  // 检查必要的环境变量
  const requiredEnvVars = [
    'NODE_ENV',
    'DATABASE_HOST',
    'DATABASE_NAME',
    'CLOUDINARY_NAME'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    log(`缺少必要的环境变量: ${missingVars.join(', ')}`);
    process.exit(1);
  }
  
  log('环境检查通过');
}

function runTests() {
  log('运行测试...');
  
  // 运行前端测试
  execCommand('npm test', config.frontend.directory);
  
  // 运行后端测试
  execCommand('npm test', config.backend.directory);
  
  log('所有测试通过');
}

function buildApplications() {
  log('构建应用...');
  
  // 构建后端
  log('构建后端应用...');
  execCommand(config.backend.buildCommand, config.backend.directory);
  
  // 构建前端
  log('构建前端应用...');
  execCommand(config.frontend.buildCommand, config.frontend.directory);
  
  log('应用构建完成');
}

function deployBackend(environment) {
  log('部署后端应用...');
  
  const backendDir = config.backend.directory;
  
  // 运行数据库迁移
  execCommand('npm run strapi:migrate', backendDir);
  
  // 重启应用服务
  execCommand(config.backend.deployCommand, backendDir);
  
  // 等待服务启动
  log('等待后端服务启动...');
  setTimeout(() => {
    // 健康检查
    const healthCheckUrl = `${config.environments[environment].backendUrl}/api/health`;
    execCommand(`curl -f ${healthCheckUrl} || exit 1`);
    log('后端部署完成');
  }, 5000);
}

function deployFrontend(environment) {
  log('部署前端应用...');
  
  const frontendDir = config.frontend.directory;
  
  // 设置环境变量
  process.env.NEXT_PUBLIC_STRAPI_API_URL = config.environments[environment].backendUrl;
  process.env.NEXT_PUBLIC_SITE_URL = config.environments[environment].frontendUrl;
  
  // 部署到CDN
  execCommand(config.frontend.deployCommand, frontendDir);
  
  log('前端部署完成');
}

function validateDeployment(environment) {
  log('验证部署...');
  
  const frontendUrl = config.environments[environment].frontendUrl;
  const backendUrl = config.environments[environment].backendUrl;
  
  // 检查前端
  execCommand(`curl -f ${frontendUrl} || exit 1`);
  log('前端健康检查通过');
  
  // 检查后端API
  execCommand(`curl -f ${backendUrl}/api/health || exit 1`);
  log('后端健康检查通过');
  
  // 检查关键页面
  const criticalPages = [
    '/',
    '/zh/products',
    '/en/products',
    '/zh/case-studies',
    '/en/case-studies',
    '/zh/contact',
    '/en/contact'
  ];
  
  for (const page of criticalPages) {
    execCommand(`curl -f ${frontendUrl}${page} || exit 1`);
  }
  
  log('关键页面检查通过');
}

function createBackup() {
  log('创建数据备份...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = `backup-${timestamp}.sql`;
  
  execCommand(`pg_dump ${process.env.DATABASE_URL} > ${backupFile}`);
  
  log(`数据备份完成: ${backupFile}`);
}

function sendNotification(environment, success) {
  log('发送部署通知...');
  
  const status = success ? '成功' : '失败';
  const message = `${environment}环境部署${status}`;
  
  // 这里可以集成Slack、钉钉等通知服务
  console.log(`通知: ${message}`);
}

async function main() {
  const environment = process.argv[2] || 'production';
  
  if (!config.environments[environment]) {
    log(`不支持的环境: ${environment}`);
    process.exit(1);
  }
  
  log(`开始部署到${environment}环境...`);
  
  try {
    // 1. 环境检查
    checkEnvironment();
    
    // 2. 运行测试
    runTests();
    
    // 3. 创建备份
    createBackup();
    
    // 4. 构建应用
    buildApplications();
    
    // 5. 部署后端
    deployBackend(environment);
    
    // 6. 部署前端
    deployFrontend(environment);
    
    // 7. 验证部署
    validateDeployment(environment);
    
    // 8. 发送成功通知
    sendNotification(environment, true);
    
    log(`${environment}环境部署成功！`);
    
  } catch (error) {
    log(`部署失败: ${error.message}`);
    sendNotification(environment, false);
    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('unhandledRejection', (reason, promise) => {
  log(`未处理的Promise拒绝: ${reason}`);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  log(`未捕获的异常: ${error.message}`);
  process.exit(1);
});

if (require.main === module) {
  main();
}

module.exports = { main };