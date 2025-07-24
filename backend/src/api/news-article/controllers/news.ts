/**
 * news controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::news-article.news-article', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const populateQuery = {
      ...query,
      populate: {
        featuredImage: true,
        images: true
      }
    };

    const data = await strapi.entityService.findMany('api::news-article.news-article', populateQuery);
    
    return { data };
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    
    const query: any = {
      filters: { slug },
      populate: {
        featuredImage: true,
        images: true
      }
    };
    
    // Add locale filter if provided
    if (locale) {
      query.locale = locale;
    }
    
    const entity = await strapi.entityService.findMany('api::news-article.news-article', query);

    if (!entity || entity.length === 0) {
      return ctx.notFound('News not found');
    }

    // 增加浏览次数
    try {
      await strapi.entityService.update('api::news-article.news-article', entity[0].id, {
        data: {
          viewCount: (entity[0].viewCount || 0) + 1
        }
      } as any);
    } catch (error) {
      // Log error but don't fail the request
      strapi.log.warn('Failed to update view count:', error);
    }

    return { data: entity[0] };
  },

  async findFeatured(ctx) {
    const data = await strapi.entityService.findMany('api::news-article.news-article', {
      filters: { 
        isFeatured: true,
        isActive: true 
      },
      populate: {
        featuredImage: true
      },
      sort: { publishDate: 'desc' }
    });
    
    return { data };
  },

  async findByCategory(ctx) {
    const { category } = ctx.params;
    const { locale } = ctx.query;
    
    const query: any = {
      filters: { 
        category,
        isActive: true 
      },
      populate: {
        featuredImage: true
      },
      sort: { publishDate: 'desc' }
    };
    
    // Add locale filter if provided
    if (locale) {
      query.locale = locale;
    }
    
    const data = await strapi.entityService.findMany('api::news-article.news-article', query);
    
    return { data };
  },

  // 搜索新闻
  async search(ctx) {
    const { q: searchTerm, locale = 'zh' } = ctx.query;
    
    if (!searchTerm) {
      return ctx.badRequest('Search term is required');
    }

    try {
      const data = await strapi.service('api::news-article.news-article').searchNews(searchTerm, locale);
      return { data };
    } catch (error) {
      ctx.throw(500, 'Search failed');
    }
  },

  // 获取相关新闻
  async findRelated(ctx) {
    const { id } = ctx.params;
    const { limit = 4 } = ctx.query;

    try {
      const data = await strapi.service('api::news-article.news-article').getRelatedNews(id, parseInt(limit as string));
      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get related news');
    }
  },

  // 获取新闻统计
  async getStats(ctx) {
    try {
      const data = await strapi.service('api::news-article.news-article').getNewsStats();
      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get news statistics');
    }
  },

  // 按标签获取新闻
  async findByTag(ctx) {
    const { tag } = ctx.params;
    const { locale } = ctx.query;

    try {
      const data = await strapi.service('api::news-article.news-article').getNewsByTag(tag, locale);
      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get news by tag');
    }
  }
}));