/**
 * 权限配置
 * 定义系统中的权限和访问控制规则
 */

export default {
  // 管理员角色配置
  adminRoles: {
    // 超级管理员 - 完全访问权限
    superAdmin: {
      name: '超级管理员',
      description: '拥有系统完全访问权限，可以管理所有内容和设置',
      permissions: {
        contentManager: {
          read: true,
          create: true,
          update: true,
          delete: true,
          publish: true,
        },
        mediaLibrary: {
          read: true,
          create: true,
          update: true,
          delete: true,
        },
        settings: {
          read: true,
          update: true,
        },
        userManagement: {
          read: true,
          create: true,
          update: true,
          delete: true,
        },
      },
    },
    
    // 内容管理员 - 内容管理权限
    contentManager: {
      name: '内容管理员',
      description: '可以管理所有内容，包括产品、案例、新闻等，但不能修改系统设置',
      permissions: {
        contentManager: {
          read: true,
          create: true,
          update: true,
          delete: true,
          publish: true,
        },
        mediaLibrary: {
          read: true,
          create: true,
          update: true,
          delete: false,
        },
        settings: {
          read: true,
          update: false,
        },
        userManagement: {
          read: false,
          create: false,
          update: false,
          delete: false,
        },
      },
    },
    
    // 编辑员 - 内容编辑权限
    editor: {
      name: '编辑员',
      description: '可以创建和编辑内容，但需要审核后才能发布',
      permissions: {
        contentManager: {
          read: true,
          create: true,
          update: true,
          delete: false,
          publish: false,
        },
        mediaLibrary: {
          read: true,
          create: true,
          update: true,
          delete: false,
        },
        settings: {
          read: false,
          update: false,
        },
        userManagement: {
          read: false,
          create: false,
          update: false,
          delete: false,
        },
      },
    },
    
    // 审核员 - 内容审核权限
    reviewer: {
      name: '审核员',
      description: '可以审核和发布内容，但不能创建新内容',
      permissions: {
        contentManager: {
          read: true,
          create: false,
          update: true,
          delete: false,
          publish: true,
        },
        mediaLibrary: {
          read: true,
          create: false,
          update: false,
          delete: false,
        },
        settings: {
          read: false,
          update: false,
        },
        userManagement: {
          read: false,
          create: false,
          update: false,
          delete: false,
        },
      },
    },
    
    // 客服人员 - 询盘管理权限
    customerService: {
      name: '客服人员',
      description: '可以查看和管理客户询盘，但不能修改网站内容',
      permissions: {
        contentManager: {
          read: true,
          create: false,
          update: false,
          delete: false,
          publish: false,
        },
        mediaLibrary: {
          read: true,
          create: false,
          update: false,
          delete: false,
        },
        settings: {
          read: false,
          update: false,
        },
        userManagement: {
          read: false,
          create: false,
          update: false,
          delete: false,
        },
        inquiryManagement: {
          read: true,
          update: true,
          export: true,
          assign: true,
        },
      },
    },
  },

  // 内容类型权限
  contentTypes: {
    // 产品权限
    'api::product.product': {
      // 创建产品
      create: {
        roles: ['administrator', 'editor'],
      },
      // 读取产品
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service', 'api_user'],
        public: true,
      },
      // 更新产品
      update: {
        roles: ['administrator', 'editor', 'reviewer'],
      },
      // 删除产品
      delete: {
        roles: ['administrator'],
      },
      // 发布产品
      publish: {
        roles: ['administrator', 'reviewer'],
      },
    },
    
    // 案例研究权限
    'api::case-study.case-study': {
      create: {
        roles: ['administrator', 'editor'],
      },
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service', 'api_user'],
        public: true,
      },
      update: {
        roles: ['administrator', 'editor', 'reviewer'],
      },
      delete: {
        roles: ['administrator'],
      },
      publish: {
        roles: ['administrator', 'reviewer'],
      },
    },
    
    // 新闻权限
    'api::news.news': {
      create: {
        roles: ['administrator', 'editor'],
      },
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service', 'api_user'],
        public: true,
      },
      update: {
        roles: ['administrator', 'editor', 'reviewer'],
      },
      delete: {
        roles: ['administrator'],
      },
      publish: {
        roles: ['administrator', 'reviewer'],
      },
    },
    
    // 页面权限
    'api::page.page': {
      create: {
        roles: ['administrator'],
      },
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service', 'api_user'],
        public: true,
      },
      update: {
        roles: ['administrator', 'editor', 'reviewer'],
      },
      delete: {
        roles: ['administrator'],
      },
      publish: {
        roles: ['administrator', 'reviewer'],
      },
    },
    
    // 全局设置权限
    'api::global-setting.global-setting': {
      create: {
        roles: ['administrator'],
      },
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service', 'api_user'],
        public: true,
      },
      update: {
        roles: ['administrator', 'reviewer'],
      },
      delete: {
        roles: ['administrator'],
      },
      publish: {
        roles: ['administrator'],
      },
    },
    
    // 询盘权限
    'api::inquiry.inquiry': {
      create: {
        roles: ['administrator', 'api_user'],
        public: true,
      },
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service'],
      },
      update: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service'],
      },
      delete: {
        roles: ['administrator'],
      },
    },
  },
  
  // 插件权限
  plugins: {
    // 上传插件权限
    'plugin::upload': {
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service'],
      },
      upload: {
        roles: ['administrator', 'editor'],
      },
      update: {
        roles: ['administrator', 'editor'],
      },
      delete: {
        roles: ['administrator'],
      },
    },
    
    // 内容管理器权限
    'plugin::content-manager': {
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service'],
      },
      create: {
        roles: ['administrator', 'editor'],
      },
      update: {
        roles: ['administrator', 'editor', 'reviewer'],
      },
      delete: {
        roles: ['administrator'],
      },
    },
    
    // 内容类型构建器权限
    'plugin::content-type-builder': {
      read: {
        roles: ['administrator', 'editor'],
      },
      update: {
        roles: ['administrator'],
      },
    },
    
    // 国际化插件权限
    'plugin::i18n': {
      read: {
        roles: ['administrator', 'editor', 'reviewer', 'customer_service'],
      },
      update: {
        roles: ['administrator', 'editor', 'reviewer'],
      },
    },
    
    // 电子邮件插件权限
    'plugin::email': {
      settings: {
        roles: ['administrator'],
      },
      send: {
        roles: ['administrator', 'customer_service'],
      },
    },
  },
  
  // 管理员权限
  admin: {
    // 访问管理面板
    access: {
      roles: ['administrator', 'editor', 'reviewer', 'customer_service'],
    },
    // 设置管理
    settings: {
      roles: ['administrator'],
    },
    // 用户管理
    users: {
      roles: ['administrator'],
    },
    // 角色管理
    roles: {
      roles: ['administrator'],
    },
  },
  
  // 自定义API权限
  customApis: {
    // 询盘统计API
    'api::inquiry.inquiry.getStats': {
      roles: ['administrator', 'customer_service'],
    },
    // 询盘导出API
    'api::inquiry.inquiry.export': {
      roles: ['administrator', 'customer_service'],
    },
    // 案例统计API
    'api::case-study.case-study.getStats': {
      roles: ['administrator', 'editor', 'reviewer'],
    },
    // 产品统计API
    'api::product.product.getStats': {
      roles: ['administrator', 'editor', 'reviewer'],
    },
  },
};