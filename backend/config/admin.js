module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // 增加JWT令牌有效期为7天
    options: {
      expiresIn: '7d',
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  // 配置管理面板设置
  url: env('ADMIN_URL', '/admin'),
  autoOpen: false,
  watchIgnoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/.tmp/**',
  ],
  // 配置管理面板UI
  ui: {
    theme: {
      colors: {
        primary100: '#f0f9ff',
        primary200: '#e0f2fe',
        primary500: '#0ea5e9',
        primary600: '#0284c7',
        primary700: '#0369a1',
        danger700: '#dc2626',
      },
    },
  },
  // 设置默认语言为中文
  locales: ['zh-Hans', 'en'],
  // 自定义头部
  head: {
    favicon: '/favicon.ico',
    title: '联锦光电 - 内容管理系统',
  },
  // 自定义菜单
  menu: {
    logo: '/admin/images/logo-admin.png',
  },
  // 自定义教程
  tutorials: false,
  // 禁用通知
  notifications: {
    releases: false,
  },
});