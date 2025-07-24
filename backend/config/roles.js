module.exports = {
  // 管理员角色
  administrator: {
    name: '管理员',
    description: '系统管理员，拥有所有权限',
    permissions: {
      // 所有内容类型的完全权限
      'api::*': {
        actions: ['create', 'read', 'update', 'delete', 'publish'],
      },
      // 管理员面板权限
      'admin::*': {
        actions: ['access', 'settings', 'users', 'roles'],
      },
      // 插件权限
      'plugin::*': {
        actions: ['access', 'settings'],
      },
    },
  },
  
  // 编辑员角色
  editor: {
    name: '编辑员',
    description: '内容编辑人员，可以创建和编辑内容，但需要审核才能发布',
    permissions: {
      // 内容类型权限
      'api::product.product': {
        actions: ['create', 'read', 'update'],
      },
      'api::case-study.case-study': {
        actions: ['create', 'read', 'update'],
      },
      'api::news.news': {
        actions: ['create', 'read', 'update'],
      },
      'api::page.page': {
        actions: ['read', 'update'],
      },
      'api::global-setting.global-setting': {
        actions: ['read'],
      },
      'api::inquiry.inquiry': {
        actions: ['read', 'update'],
      },
      // 媒体库权限
      'plugin::upload': {
        actions: ['read', 'upload'],
      },
      // 内容管理器权限
      'plugin::content-manager': {
        actions: ['read', 'create', 'update'],
      },
      // 内容类型构建器权限
      'plugin::content-type-builder': {
        actions: ['read'],
      },
      // 国际化权限
      'plugin::i18n': {
        actions: ['read', 'locale.read', 'locale.update'],
      },
    },
  },
  
  // 审核员角色
  reviewer: {
    name: '审核员',
    description: '内容审核人员，可以审核和发布内容',
    permissions: {
      // 内容类型权限
      'api::product.product': {
        actions: ['read', 'update', 'publish'],
      },
      'api::case-study.case-study': {
        actions: ['read', 'update', 'publish'],
      },
      'api::news.news': {
        actions: ['read', 'update', 'publish'],
      },
      'api::page.page': {
        actions: ['read', 'update', 'publish'],
      },
      'api::global-setting.global-setting': {
        actions: ['read', 'update'],
      },
      'api::inquiry.inquiry': {
        actions: ['read', 'update'],
      },
      // 媒体库权限
      'plugin::upload': {
        actions: ['read'],
      },
      // 内容管理器权限
      'plugin::content-manager': {
        actions: ['read', 'update'],
      },
    },
  },
  
  // 客服角色
  customer_service: {
    name: '客服',
    description: '客户服务人员，主要处理询盘和客户反馈',
    permissions: {
      // 询盘权限
      'api::inquiry.inquiry': {
        actions: ['read', 'update'],
      },
      // 产品和案例只读权限
      'api::product.product': {
        actions: ['read'],
      },
      'api::case-study.case-study': {
        actions: ['read'],
      },
      'api::news.news': {
        actions: ['read'],
      },
      // 媒体库权限
      'plugin::upload': {
        actions: ['read'],
      },
      // 内容管理器权限
      'plugin::content-manager': {
        actions: ['read'],
      },
    },
  },
  
  // API用户角色
  api_user: {
    name: 'API用户',
    description: '前端API访问用户，只有读取权限',
    permissions: {
      // 内容类型只读权限
      'api::product.product': {
        actions: ['find', 'findOne'],
      },
      'api::case-study.case-study': {
        actions: ['find', 'findOne'],
      },
      'api::news.news': {
        actions: ['find', 'findOne'],
      },
      'api::page.page': {
        actions: ['find', 'findOne'],
      },
      'api::global-setting.global-setting': {
        actions: ['find'],
      },
      // 询盘创建权限
      'api::inquiry.inquiry': {
        actions: ['create'],
      },
    },
  },
};