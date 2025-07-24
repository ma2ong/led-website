import type { StrapiApp } from '@strapi/strapi/admin';
import CustomHomePage from './components/CustomHomePage';
import InquiryManager from './components/InquiryManager';
import { PreviewButton } from './components/ContentPreview';

export default {
  config: {
    // 设置默认语言为中文
    locales: ['zh-Hans', 'en'],
    
    // 自定义主题
    theme: {
      light: {
        colors: {
          primary100: '#f0f9ff',
          primary200: '#e0f2fe',
          primary500: '#0ea5e9',
          primary600: '#0284c7',
          primary700: '#0369a1',
          danger700: '#dc2626',
        },
      },
      dark: {
        colors: {
          primary100: '#1e293b',
          primary200: '#334155',
          primary500: '#0ea5e9',
          primary600: '#0284c7',
          primary700: '#0369a1',
          danger700: '#dc2626',
        },
      },
    },
    
    // 自定义头部
    head: {
      favicon: '/favicon.ico',
      title: '联锦光电 - 内容管理系统',
    },
    
    // 自定义菜单
    menu: {
      logo: '/images/logo-admin.png',
    },
    
    // 自定义翻译
    translations: {
      'zh-Hans': {
        'app.components.HomePage.welcome': '欢迎使用联锦光电内容管理系统',
        'app.components.HomePage.welcome.again': '欢迎回来！',
        'app.components.LeftMenu.navbrand.title': '联锦光电 CMS',
        'app.components.LeftMenu.navbrand.workplace': '管理面板',
        'global.content-manager': '内容管理',
        'content-manager.containers.Home.introduction': '管理您的网站内容',
        'content-manager.containers.Home.cta': '开始创建内容',
        'Settings.profile.form.section.experience.interfaceLanguageHelp': '这将改变管理界面的语言',
        'Settings.profile.form.section.experience.interfaceLanguage': '界面语言',
        'global.plugins': '插件',
        'global.settings': '设置',
        'global.marketplace': '应用市场',
        'global.documentation': '文档',
        'global.tutorial': '教程',
        'global.community': '社区',
        'global.profile': '个人资料',
        'global.logout': '退出登录',
        'Auth.form.welcome.title': '欢迎使用联锦光电CMS',
        'Auth.form.welcome.subtitle': '登录您的账户',
        'Auth.form.button.login': '登录',
        'Auth.form.button.register': '注册',
        'Auth.form.email.label': '邮箱',
        'Auth.form.password.label': '密码',
        'Auth.form.rememberMe.label': '记住我',
        'Auth.form.forgot-password.label': '忘记密码？',
      },
    },
    
    // 自定义教程
    tutorials: false,
    
    // 禁用通知
    notifications: {
      releases: false,
    },
  },
  
  bootstrap(app: StrapiApp) {
    // 注册自定义页面
    app.addMenuLink({
      to: '/plugins/custom-home',
      icon: 'dashboard',
      intlLabel: {
        id: 'custom-home.plugin.name',
        defaultMessage: '仪表板',
      },
      permissions: [],
    });

    app.addMenuLink({
      to: '/plugins/inquiry-manager',
      icon: 'message',
      intlLabel: {
        id: 'inquiry-manager.plugin.name',
        defaultMessage: '询盘管理',
      },
      permissions: [],
    });

    // 注册自定义组件
    app.registerPlugin({
      id: 'custom-home',
      name: '仪表板',
      pluginId: 'custom-home',
    });

    app.registerPlugin({
      id: 'inquiry-manager',
      name: '询盘管理',
      pluginId: 'inquiry-manager',
    });

    // 自定义启动逻辑
    console.log('联锦光电 CMS 管理界面已启动');
  },
};