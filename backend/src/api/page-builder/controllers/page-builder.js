/**
 * 页面构建器控制器
 */

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page-builder.page-builder', ({ strapi }) => ({
  /**
   * 获取页面构建器列表
   */
  async find(ctx) {
    const { query } = ctx;
    
    const entity = await strapi.entityService.findMany('api::page-builder.page-builder', {
      ...query,
      populate: {
        seo: true,
        author: {
          select: ['firstname', 'lastname', 'email']
        }
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  /**
   * 根据ID获取页面构建器
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.entityService.findOne('api::page-builder.page-builder', id, {
      ...query,
      populate: {
        seo: true,
        author: {
          select: ['firstname', 'lastname', 'email']
        }
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  /**
   * 根据slug获取页面
   */
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale = 'zh' } = ctx.query;

    try {
      const entity = await strapi.entityService.findMany('api::page-builder.page-builder', {
        filters: { 
          slug: slug,
          publishedAt: { $notNull: true }
        },
        locale,
        populate: {
          seo: true,
          author: {
            select: ['firstname', 'lastname']
          }
        }
      });

      if (!entity || entity.length === 0) {
        return ctx.notFound('Page not found');
      }

      const sanitizedEntity = await this.sanitizeOutput(entity[0], ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Error finding page by slug:', error);
      return ctx.internalServerError('Error retrieving page');
    }
  },

  /**
   * 创建页面构建器
   */
  async create(ctx) {
    const { data } = ctx.request.body;
    
    // 添加作者信息
    if (ctx.state.user) {
      data.author = ctx.state.user.id;
    }

    // 验证组件数据
    if (data.components && typeof data.components === 'string') {
      try {
        data.components = JSON.parse(data.components);
      } catch (error) {
        return ctx.badRequest('Invalid components JSON format');
      }
    }

    const entity = await strapi.entityService.create('api::page-builder.page-builder', {
      data,
      populate: {
        seo: true,
        author: {
          select: ['firstname', 'lastname', 'email']
        }
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  /**
   * 更新页面构建器
   */
  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    // 验证组件数据
    if (data.components && typeof data.components === 'string') {
      try {
        data.components = JSON.parse(data.components);
      } catch (error) {
        return ctx.badRequest('Invalid components JSON format');
      }
    }

    const entity = await strapi.entityService.update('api::page-builder.page-builder', id, {
      data,
      populate: {
        seo: true,
        author: {
          select: ['firstname', 'lastname', 'email']
        }
      }
    });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  /**
   * 删除页面构建器
   */
  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.delete('api::page-builder.page-builder', id);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  /**
   * 预览页面
   */
  async preview(ctx) {
    const { id } = ctx.params;
    const { locale = 'zh' } = ctx.query;

    try {
      const entity = await strapi.entityService.findOne('api::page-builder.page-builder', id, {
        locale,
        populate: {
          seo: true,
          author: {
            select: ['firstname', 'lastname']
          }
        }
      });

      if (!entity) {
        return ctx.notFound('Page not found');
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Error previewing page:', error);
      return ctx.internalServerError('Error previewing page');
    }
  },

  /**
   * 复制页面
   */
  async duplicate(ctx) {
    const { id } = ctx.params;

    try {
      const originalPage = await strapi.entityService.findOne('api::page-builder.page-builder', id, {
        populate: {
          seo: true
        }
      });

      if (!originalPage) {
        return ctx.notFound('Page not found');
      }

      // 创建副本
      const duplicateData = {
        ...originalPage,
        title: `${originalPage.title} (Copy)`,
        slug: `${originalPage.slug}-copy-${Date.now()}`,
        publishedAt: null,
        status: 'draft',
        author: ctx.state.user?.id
      };

      // 移除不需要复制的字段
      delete duplicateData.id;
      delete duplicateData.createdAt;
      delete duplicateData.updatedAt;

      const entity = await strapi.entityService.create('api::page-builder.page-builder', {
        data: duplicateData,
        populate: {
          seo: true,
          author: {
            select: ['firstname', 'lastname', 'email']
          }
        }
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      console.error('Error duplicating page:', error);
      return ctx.internalServerError('Error duplicating page');
    }
  },

  /**
   * 获取页面模板
   */
  async getTemplates(ctx) {
    const templates = [
      {
        id: 'default',
        name: '默认模板',
        description: '标准页面模板',
        components: []
      },
      {
        id: 'landing',
        name: '着陆页模板',
        description: '营销着陆页模板',
        components: [
          {
            id: 'hero-1',
            type: 'hero',
            name: '主视觉区',
            props: {
              title: '欢迎来到我们的网站',
              subtitle: '专业的LED显示解决方案',
              backgroundImage: '',
              buttonText: '了解更多',
              buttonLink: '#about'
            }
          },
          {
            id: 'stats-1',
            type: 'stats',
            name: '数据统计',
            props: {
              stats: [
                { label: '成功项目', value: '500+' },
                { label: '满意客户', value: '1000+' },
                { label: '服务年限', value: '15+' },
                { label: '技术专家', value: '50+' }
              ]
            }
          },
          {
            id: 'cta-1',
            type: 'cta',
            name: '行动号召',
            props: {
              title: '准备开始您的项目？',
              description: '联系我们获取专业建议和定制方案',
              buttonText: '立即咨询',
              buttonLink: '/contact'
            }
          }
        ]
      },
      {
        id: 'product',
        name: '产品页模板',
        description: '产品展示页面模板',
        components: [
          {
            id: 'hero-2',
            type: 'hero',
            name: '产品主视觉',
            props: {
              title: '我们的产品',
              subtitle: '高品质LED显示解决方案',
              backgroundImage: '',
              buttonText: '查看产品',
              buttonLink: '#products'
            }
          },
          {
            id: 'product-grid-1',
            type: 'productGrid',
            name: '产品网格',
            props: {
              category: '',
              limit: 12,
              showFilters: true
            }
          }
        ]
      }
    ];

    return { data: templates };
  }
}));