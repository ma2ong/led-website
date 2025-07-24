/**
 * 内容发布工作流配置
 * 定义内容从创建到发布的工作流程
 */

module.exports = {
  // 默认工作流
  default: {
    // 工作流名称
    name: '默认发布工作流',
    // 工作流描述
    description: '内容从草稿到发布的默认工作流程',
    // 工作流状态
    states: [
      {
        id: 'draft',
        name: '草稿',
        description: '内容处于草稿状态，可以编辑但不会发布',
        color: '#CCCCCC',
        initial: true,
      },
      {
        id: 'review',
        name: '审核中',
        description: '内容已提交审核，等待审核员审核',
        color: '#FFA500',
      },
      {
        id: 'approved',
        name: '已批准',
        description: '内容已通过审核，等待发布',
        color: '#00CC00',
      },
      {
        id: 'published',
        name: '已发布',
        description: '内容已发布到生产环境',
        color: '#0066CC',
        published: true,
      },
      {
        id: 'rejected',
        name: '已拒绝',
        description: '内容未通过审核，需要修改',
        color: '#FF0000',
      },
      {
        id: 'archived',
        name: '已归档',
        description: '内容已归档，不再显示',
        color: '#999999',
      },
    ],
    // 工作流转换
    transitions: [
      {
        from: 'draft',
        to: 'review',
        roles: ['editor', 'administrator'],
      },
      {
        from: 'review',
        to: 'approved',
        roles: ['reviewer', 'administrator'],
      },
      {
        from: 'review',
        to: 'rejected',
        roles: ['reviewer', 'administrator'],
      },
      {
        from: 'approved',
        to: 'published',
        roles: ['reviewer', 'administrator'],
      },
      {
        from: 'rejected',
        to: 'draft',
        roles: ['editor', 'administrator'],
      },
      {
        from: 'published',
        to: 'draft',
        roles: ['administrator'],
      },
      {
        from: 'published',
        to: 'archived',
        roles: ['administrator'],
      },
      {
        from: 'archived',
        to: 'draft',
        roles: ['administrator'],
      },
    ],
    // 工作流操作
    actions: [
      {
        id: 'submit-for-review',
        name: '提交审核',
        from: 'draft',
        to: 'review',
        roles: ['editor', 'administrator'],
      },
      {
        id: 'approve',
        name: '批准',
        from: 'review',
        to: 'approved',
        roles: ['reviewer', 'administrator'],
      },
      {
        id: 'reject',
        name: '拒绝',
        from: 'review',
        to: 'rejected',
        roles: ['reviewer', 'administrator'],
      },
      {
        id: 'publish',
        name: '发布',
        from: 'approved',
        to: 'published',
        roles: ['reviewer', 'administrator'],
      },
      {
        id: 'revise',
        name: '修改',
        from: 'rejected',
        to: 'draft',
        roles: ['editor', 'administrator'],
      },
      {
        id: 'unpublish',
        name: '取消发布',
        from: 'published',
        to: 'draft',
        roles: ['administrator'],
      },
      {
        id: 'archive',
        name: '归档',
        from: 'published',
        to: 'archived',
        roles: ['administrator'],
      },
      {
        id: 'unarchive',
        name: '取消归档',
        from: 'archived',
        to: 'draft',
        roles: ['administrator'],
      },
    ],
  },
  
  // 简化工作流（用于不需要严格审核的内容）
  simplified: {
    name: '简化发布工作流',
    description: '简化的内容发布工作流程，适用于不需要严格审核的内容',
    states: [
      {
        id: 'draft',
        name: '草稿',
        description: '内容处于草稿状态，可以编辑但不会发布',
        color: '#CCCCCC',
        initial: true,
      },
      {
        id: 'published',
        name: '已发布',
        description: '内容已发布到生产环境',
        color: '#0066CC',
        published: true,
      },
      {
        id: 'archived',
        name: '已归档',
        description: '内容已归档，不再显示',
        color: '#999999',
      },
    ],
    transitions: [
      {
        from: 'draft',
        to: 'published',
        roles: ['editor', 'reviewer', 'administrator'],
      },
      {
        from: 'published',
        to: 'draft',
        roles: ['editor', 'reviewer', 'administrator'],
      },
      {
        from: 'published',
        to: 'archived',
        roles: ['administrator'],
      },
      {
        from: 'archived',
        to: 'draft',
        roles: ['administrator'],
      },
    ],
    actions: [
      {
        id: 'publish',
        name: '发布',
        from: 'draft',
        to: 'published',
        roles: ['editor', 'reviewer', 'administrator'],
      },
      {
        id: 'unpublish',
        name: '取消发布',
        from: 'published',
        to: 'draft',
        roles: ['editor', 'reviewer', 'administrator'],
      },
      {
        id: 'archive',
        name: '归档',
        from: 'published',
        to: 'archived',
        roles: ['administrator'],
      },
      {
        id: 'unarchive',
        name: '取消归档',
        from: 'archived',
        to: 'draft',
        roles: ['administrator'],
      },
    ],
  },
  
  // 内容类型工作流映射
  contentTypeWorkflows: {
    'api::product.product': 'default',
    'api::case-study.case-study': 'default',
    'api::news.news': 'default',
    'api::page.page': 'default',
    'api::global-setting.global-setting': 'simplified',
  },
};