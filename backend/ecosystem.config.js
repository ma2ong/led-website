/**
 * PM2 生产环境配置
 * 用于管理Strapi应用进程
 */

module.exports = {
  apps: [
    {
      name: 'strapi-production',
      script: './node_modules/.bin/strapi',
      args: 'start',
      cwd: '/path/to/your/backend',
      instances: 'max', // 使用所有CPU核心
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
        HOST: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 1337,
        HOST: '0.0.0.0'
      },
      // 日志配置
      log_file: '/var/log/pm2/strapi-combined.log',
      out_file: '/var/log/pm2/strapi-out.log',
      error_file: '/var/log/pm2/strapi-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // 进程管理
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // 监控配置
      watch: false, // 生产环境不建议开启文件监控
      ignore_watch: ['node_modules', 'logs', '.git'],
      
      // 健康检查
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // 自动重启配置
      autorestart: true,
      
      // 环境变量
      env_file: '.env.production'
    },
    {
      name: 'strapi-staging',
      script: './node_modules/.bin/strapi',
      args: 'start',
      cwd: '/path/to/your/backend',
      instances: 1, // 测试环境使用单实例
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'staging',
        PORT: 1338,
        HOST: '0.0.0.0'
      },
      log_file: '/var/log/pm2/strapi-staging-combined.log',
      out_file: '/var/log/pm2/strapi-staging-out.log',
      error_file: '/var/log/pm2/strapi-staging-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '512M',
      restart_delay: 2000,
      max_restarts: 5,
      min_uptime: '5s',
      watch: false,
      autorestart: true,
      env_file: '.env.staging'
    }
  ],
  
  // 部署配置
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-production-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:yourcompany/led-website.git',
      path: '/var/www/led-website-backend',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    },
    staging: {
      user: 'deploy',
      host: ['your-staging-server.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:yourcompany/led-website.git',
      path: '/var/www/led-website-backend-staging',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': 'apt update && apt install git -y'
    }
  }
};