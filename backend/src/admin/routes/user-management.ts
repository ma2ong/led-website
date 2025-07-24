/**
 * 用户管理路由
 */

export default {
  routes: [
    // 用户管理路由
    {
      method: 'GET',
      path: '/admin/users',
      handler: 'admin.getUsers',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/admin/users',
      handler: 'admin.createUser',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/admin/users/:id',
      handler: 'admin.updateUser',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/admin/users/:id',
      handler: 'admin.deleteUser',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/admin/users/:id/reset-password',
      handler: 'admin.resetUserPassword',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/admin/users/:id/audit',
      handler: 'admin.auditUserPermissions',
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // 角色管理路由
    {
      method: 'GET',
      path: '/admin/roles',
      handler: 'admin.getRoles',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/admin/roles',
      handler: 'admin.createRole',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/admin/roles/:id/permissions',
      handler: 'admin.updateRolePermissions',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/admin/roles/:id',
      handler: 'admin.deleteRole',
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // 批量操作路由
    {
      method: 'POST',
      path: '/admin/users/batch-assign-role',
      handler: 'admin.batchAssignRole',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};