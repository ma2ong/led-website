import { factories } from '@strapi/strapi';
import roleManager from '../../services/role-manager';

export default factories.createCoreController('admin', ({ strapi }) => ({
  // 自定义首页数据
  async customHome(ctx) {
    try {
      // 获取统计数据
      const stats = await Promise.all([
        strapi.entityService.count('api::product.product'),
        strapi.entityService.count('api::case-study.case-study'),
        strapi.entityService.count('api::news.news'),
        strapi.entityService.count('api::inquiry.inquiry'),
      ]);

      // 获取最近活动
      const recentActivities = await Promise.all([
        strapi.entityService.findMany('api::product.product', {
          limit: 3,
          sort: { createdAt: 'desc' },
          fields: ['name', 'createdAt'],
        }),
        strapi.entityService.findMany('api::inquiry.inquiry', {
          limit: 3,
          sort: { createdAt: 'desc' },
          fields: ['name', 'subject', 'createdAt'],
        }),
        strapi.entityService.findMany('api::news.news', {
          limit: 3,
          sort: { createdAt: 'desc' },
          fields: ['title', 'createdAt'],
        }),
      ]);

      ctx.body = {
        stats: {
          products: stats[0],
          cases: stats[1],
          news: stats[2],
          inquiries: stats[3],
        },
        recentActivities: {
          products: recentActivities[0],
          inquiries: recentActivities[1],
          news: recentActivities[2],
        },
      };
    } catch (error) {
      ctx.throw(500, '获取首页数据失败');
    }
  },

  // 询盘管理数据
  async inquiryManager(ctx) {
    try {
      const { page = 1, pageSize = 25, status, priority, search } = ctx.query;

      const filters = {};
      
      if (status && status !== 'all') {
        filters.status = status;
      }
      
      if (priority && priority !== 'all') {
        filters.priority = priority;
      }
      
      if (search) {
        filters.$or = [
          { name: { $containsi: search } },
          { company: { $containsi: search } },
          { email: { $containsi: search } },
          { subject: { $containsi: search } },
        ];
      }

      const inquiries = await strapi.entityService.findMany('api::inquiry.inquiry', {
        filters,
        sort: { createdAt: 'desc' },
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
        },
        populate: ['assignedTo'],
      });

      const total = await strapi.entityService.count('api::inquiry.inquiry', { filters });

      ctx.body = {
        data: inquiries,
        meta: {
          pagination: {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            total,
            pageCount: Math.ceil(total / parseInt(pageSize)),
          },
        },
      };
    } catch (error) {
      ctx.throw(500, '获取询盘数据失败');
    }
  },

  // 内容预览
  async contentPreview(ctx) {
    try {
      const { contentType, id } = ctx.params;
      const { locale = 'zh' } = ctx.query;

      // 验证内容类型
      const validContentTypes = ['api::product.product', 'api::case-study.case-study', 'api::news.news'];
      if (!validContentTypes.includes(contentType)) {
        return ctx.throw(400, '无效的内容类型');
      }

      // 获取内容数据
      const content = await strapi.entityService.findOne(contentType, id, {
        populate: '*',
      });

      if (!content) {
        return ctx.throw(404, '内容不存在');
      }

      // 生成预览URL
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      let path = '';

      switch (contentType) {
        case 'api::product.product':
          path = `/products/${content.slug || id}`;
          break;
        case 'api::case-study.case-study':
          path = `/cases/${content.slug || id}`;
          break;
        case 'api::news.news':
          path = `/news/${content.slug || id}`;
          break;
      }

      const previewUrl = `${baseUrl}/${locale}${path}?preview=true`;

      ctx.body = {
        content,
        previewUrl,
      };
    } catch (error) {
      ctx.throw(500, '生成预览失败');
    }
  },

  // 更新询盘状态
  async updateInquiryStatus(ctx) {
    try {
      const { id } = ctx.params;
      const { status } = ctx.request.body;

      const validStatuses = ['new', 'processing', 'replied', 'closed'];
      if (!validStatuses.includes(status)) {
        return ctx.throw(400, '无效的状态');
      }

      const updatedInquiry = await strapi.entityService.update('api::inquiry.inquiry', id, {
        data: {
          status,
          updatedAt: new Date(),
        },
      });

      ctx.body = updatedInquiry;
    } catch (error) {
      ctx.throw(500, '更新询盘状态失败');
    }
  },

  // 分配询盘
  async assignInquiry(ctx) {
    try {
      const { id } = ctx.params;
      const { assignedTo } = ctx.request.body;

      const updatedInquiry = await strapi.entityService.update('api::inquiry.inquiry', id, {
        data: {
          assignedTo,
          updatedAt: new Date(),
        },
      });

      ctx.body = updatedInquiry;
    } catch (error) {
      ctx.throw(500, '分配询盘失败');
    }
  },

  // 获取仪表板统计数据
  async getDashboardStats(ctx) {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

      // 获取各种统计数据
      const [
        totalProducts,
        totalCases,
        totalNews,
        totalInquiries,
        monthlyInquiries,
        weeklyInquiries,
        pendingInquiries,
        publishedProducts,
      ] = await Promise.all([
        strapi.entityService.count('api::product.product'),
        strapi.entityService.count('api::case-study.case-study'),
        strapi.entityService.count('api::news.news'),
        strapi.entityService.count('api::inquiry.inquiry'),
        strapi.entityService.count('api::inquiry.inquiry', {
          filters: { createdAt: { $gte: startOfMonth } },
        }),
        strapi.entityService.count('api::inquiry.inquiry', {
          filters: { createdAt: { $gte: startOfWeek } },
        }),
        strapi.entityService.count('api::inquiry.inquiry', {
          filters: { status: { $in: ['new', 'processing'] } },
        }),
        strapi.entityService.count('api::product.product', {
          filters: { publishedAt: { $notNull: true } },
        }),
      ]);

      ctx.body = {
        overview: {
          totalProducts,
          totalCases,
          totalNews,
          totalInquiries,
        },
        inquiries: {
          total: totalInquiries,
          monthly: monthlyInquiries,
          weekly: weeklyInquiries,
          pending: pendingInquiries,
        },
        content: {
          publishedProducts,
          draftProducts: totalProducts - publishedProducts,
        },
      };
    } catch (error) {
      ctx.throw(500, '获取统计数据失败');
    }
  },

  // ===== 用户管理相关方法 =====

  /**
   * 获取所有用户
   */
  async getUsers(ctx) {
    try {
      const { page = 1, pageSize = 10, search, role } = ctx.query;
      
      const filters = {};
      if (search) {
        filters.$or = [
          { email: { $containsi: search } },
          { firstname: { $containsi: search } },
          { lastname: { $containsi: search } },
        ];
      }
      
      if (role) {
        filters.roles = { code: role };
      }

      const users = await strapi.query('admin::user').findWithCount({
        where: filters,
        populate: ['roles'],
        limit: parseInt(pageSize),
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        orderBy: { createdAt: 'desc' },
      });

      ctx.body = {
        success: true,
        data: users[0],
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total: users[1],
          pageCount: Math.ceil(users[1] / parseInt(pageSize)),
        },
      };
    } catch (error) {
      strapi.log.error('获取用户列表失败:', error);
      ctx.throw(500, '获取用户列表失败');
    }
  },

  /**
   * 创建用户
   */
  async createUser(ctx) {
    try {
      const { email, firstname, lastname, password, roleId, isActive = true } = ctx.request.body;

      // 验证必填字段
      if (!email || !password || !roleId) {
        return ctx.throw(400, '邮箱、密码和角色为必填项');
      }

      // 检查邮箱是否已存在
      const existingUser = await strapi.query('admin::user').findOne({
        where: { email },
      });

      if (existingUser) {
        return ctx.throw(400, '该邮箱已被使用');
      }

      // 验证角色是否存在
      const role = await strapi.query('admin::role').findOne({
        where: { id: roleId },
      });

      if (!role) {
        return ctx.throw(400, '指定的角色不存在');
      }

      // 创建用户
      const user = await strapi.query('admin::user').create({
        data: {
          email,
          firstname,
          lastname,
          password,
          isActive,
          roles: [roleId],
        },
        populate: ['roles'],
      });

      // 移除密码字段
      delete user.password;

      ctx.body = {
        success: true,
        data: user,
        message: '用户创建成功',
      };
    } catch (error) {
      strapi.log.error('创建用户失败:', error);
      ctx.throw(500, '创建用户失败');
    }
  },

  /**
   * 更新用户
   */
  async updateUser(ctx) {
    try {
      const { id } = ctx.params;
      const { email, firstname, lastname, roleId, isActive } = ctx.request.body;

      // 检查用户是否存在
      const existingUser = await strapi.query('admin::user').findOne({
        where: { id },
      });

      if (!existingUser) {
        return ctx.throw(404, '用户不存在');
      }

      // 如果更新邮箱，检查是否重复
      if (email && email !== existingUser.email) {
        const emailExists = await strapi.query('admin::user').findOne({
          where: { email, id: { $ne: id } },
        });

        if (emailExists) {
          return ctx.throw(400, '该邮箱已被使用');
        }
      }

      // 如果更新角色，验证角色是否存在
      if (roleId) {
        const role = await strapi.query('admin::role').findOne({
          where: { id: roleId },
        });

        if (!role) {
          return ctx.throw(400, '指定的角色不存在');
        }
      }

      // 更新用户
      const updateData = {};
      if (email) updateData.email = email;
      if (firstname) updateData.firstname = firstname;
      if (lastname) updateData.lastname = lastname;
      if (typeof isActive === 'boolean') updateData.isActive = isActive;
      if (roleId) updateData.roles = [roleId];

      const user = await strapi.query('admin::user').update({
        where: { id },
        data: updateData,
        populate: ['roles'],
      });

      ctx.body = {
        success: true,
        data: user,
        message: '用户更新成功',
      };
    } catch (error) {
      strapi.log.error('更新用户失败:', error);
      ctx.throw(500, '更新用户失败');
    }
  },

  /**
   * 删除用户
   */
  async deleteUser(ctx) {
    try {
      const { id } = ctx.params;

      // 检查用户是否存在
      const user = await strapi.query('admin::user').findOne({
        where: { id },
        populate: ['roles'],
      });

      if (!user) {
        return ctx.throw(404, '用户不存在');
      }

      // 防止删除超级管理员
      const isSuperAdmin = user.roles?.some(role => 
        role.code === 'strapi-super-admin' || role.name === '超级管理员'
      );

      if (isSuperAdmin) {
        return ctx.throw(400, '不能删除超级管理员');
      }

      // 防止用户删除自己
      if (parseInt(id) === ctx.state.user.id) {
        return ctx.throw(400, '不能删除自己的账户');
      }

      await strapi.query('admin::user').delete({
        where: { id },
      });

      ctx.body = {
        success: true,
        message: '用户删除成功',
      };
    } catch (error) {
      strapi.log.error('删除用户失败:', error);
      ctx.throw(500, '删除用户失败');
    }
  },

  /**
   * 重置用户密码
   */
  async resetUserPassword(ctx) {
    try {
      const { id } = ctx.params;
      const { newPassword } = ctx.request.body;

      if (!newPassword) {
        return ctx.throw(400, '新密码不能为空');
      }

      // 检查用户是否存在
      const user = await strapi.query('admin::user').findOne({
        where: { id },
      });

      if (!user) {
        return ctx.throw(404, '用户不存在');
      }

      // 更新密码
      await strapi.query('admin::user').update({
        where: { id },
        data: { password: newPassword },
      });

      ctx.body = {
        success: true,
        message: '密码重置成功',
      };
    } catch (error) {
      strapi.log.error('重置密码失败:', error);
      ctx.throw(500, '重置密码失败');
    }
  },

  // ===== 角色管理相关方法 =====

  /**
   * 获取所有角色
   */
  async getRoles(ctx) {
    try {
      const roles = await roleManager.getAllRoles();

      ctx.body = {
        success: true,
        data: roles,
      };
    } catch (error) {
      strapi.log.error('获取角色列表失败:', error);
      ctx.throw(500, '获取角色列表失败');
    }
  },

  /**
   * 创建角色
   */
  async createRole(ctx) {
    try {
      const { name, description, permissions } = ctx.request.body;

      if (!name) {
        return ctx.throw(400, '角色名称不能为空');
      }

      const role = await roleManager.createRole(name, description, permissions);

      ctx.body = {
        success: true,
        data: role,
        message: '角色创建成功',
      };
    } catch (error) {
      strapi.log.error('创建角色失败:', error);
      ctx.throw(500, '创建角色失败');
    }
  },

  /**
   * 更新角色权限
   */
  async updateRolePermissions(ctx) {
    try {
      const { id } = ctx.params;
      const { permissions } = ctx.request.body;

      await roleManager.updateRolePermissions(parseInt(id), permissions);

      ctx.body = {
        success: true,
        message: '角色权限更新成功',
      };
    } catch (error) {
      strapi.log.error('更新角色权限失败:', error);
      ctx.throw(500, '更新角色权限失败');
    }
  },

  /**
   * 删除角色
   */
  async deleteRole(ctx) {
    try {
      const { id } = ctx.params;

      await roleManager.deleteRole(parseInt(id));

      ctx.body = {
        success: true,
        message: '角色删除成功',
      };
    } catch (error) {
      strapi.log.error('删除角色失败:', error);
      ctx.throw(500, error.message || '删除角色失败');
    }
  },

  /**
   * 审计用户权限
   */
  async auditUserPermissions(ctx) {
    try {
      const { id } = ctx.params;

      const audit = await roleManager.auditUserPermissions(parseInt(id));

      ctx.body = {
        success: true,
        data: audit,
      };
    } catch (error) {
      strapi.log.error('审计用户权限失败:', error);
      ctx.throw(500, '审计用户权限失败');
    }
  },

  /**
   * 批量分配角色
   */
  async batchAssignRole(ctx) {
    try {
      const { userIds, roleId } = ctx.request.body;

      if (!userIds || !Array.isArray(userIds) || !roleId) {
        return ctx.throw(400, '用户ID列表和角色ID不能为空');
      }

      const results = [];
      for (const userId of userIds) {
        try {
          await roleManager.assignRoleToUser(userId, roleId);
          results.push({ userId, success: true });
        } catch (error) {
          results.push({ userId, success: false, error: error.message });
        }
      }

      ctx.body = {
        success: true,
        data: results,
        message: '批量角色分配完成',
      };
    } catch (error) {
      strapi.log.error('批量分配角色失败:', error);
      ctx.throw(500, '批量分配角色失败');
    }
  },
}));