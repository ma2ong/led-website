/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  // 自定义查找方法，支持按分类筛选
  async find(ctx) {
    const { query } = ctx;
    
    // 添加默认的populate参数
    const populateQuery = {
      ...query,
      populate: {
        mainImage: true,
        images: true,
        documents: true,
        specifications: true,
        case_studies: {
          populate: {
            mainImage: true
          }
        }
      }
    };

    const rawData = await strapi.entityService.findMany('api::product.product', populateQuery);
    
    // Transform data using transformer service
    const transformer = strapi.service('api::product.product-transformer');
    const data = transformer.transformProductList(rawData);
    
    return { data };
  },

  // 按slug查找产品
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { locale } = ctx.query;
    
    const filters = { slug };
    const query: any = {
      filters,
      populate: {
        mainImage: true,
        images: true,
        documents: true,
        specifications: true,
        case_studies: {
          populate: {
            mainImage: true
          }
        }
      }
    };
    
    // Add locale filter if provided
    if (locale) {
      query.locale = locale;
    }
    
    const entity = await strapi.entityService.findMany('api::product.product', query);

    if (!entity || entity.length === 0) {
      return ctx.notFound('Product not found');
    }
    
    // Increment view count
    try {
      await strapi.entityService.update('api::product.product', entity[0].id, {
        data: {
          viewCount: (entity[0].viewCount || 0) + 1
        } as any
      });
    } catch (error) {
      // Log error but don't fail the request
      strapi.log.warn('Failed to update view count:', error);
    }

    return { data: entity[0] };
  },

  // 获取特色产品
  async findFeatured(ctx) {
    const data = await strapi.entityService.findMany('api::product.product', {
      filters: { 
        isFeatured: true,
        isActive: true 
      },
      populate: {
        mainImage: true,
        images: true
      },
      sort: { sortOrder: 'asc' }
    });
    
    return { data };
  },

  // 按分类获取产品
  async findByCategory(ctx) {
    const { category } = ctx.params;
    const { locale } = ctx.query;
    
    const query: any = {
      filters: { 
        category,
        isActive: true 
      },
      populate: {
        mainImage: true,
        images: true
      },
      sort: { sortOrder: 'asc' }
    };
    
    // Add locale filter if provided
    if (locale) {
      query.locale = locale;
    }
    
    const data = await strapi.entityService.findMany('api::product.product', query);
    
    return { data };
  },

  // 搜索产品
  async search(ctx) {
    const { q: searchTerm, locale = 'zh' } = ctx.query;
    
    if (!searchTerm) {
      return ctx.badRequest('Search term is required');
    }

    try {
      const data = await strapi.service('api::product.product').searchProducts(searchTerm, locale);
      return { data };
    } catch (error) {
      ctx.throw(500, 'Search failed');
    }
  },

  // 获取相关产品
  async findRelated(ctx) {
    const { id } = ctx.params;
    const { limit = 4 } = ctx.query;

    try {
      const data = await strapi.service('api::product.product').getRelatedProducts(id, parseInt(limit as string));
      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get related products');
    }
  },

  // 产品比较
  async compare(ctx) {
    const { ids } = ctx.query;
    
    if (!ids) {
      return ctx.badRequest('Product IDs are required');
    }

    const productIds = Array.isArray(ids) ? ids : (ids as string).split(',');

    try {
      const data = await strapi.service('api::product.product').getProductComparison(productIds);
      return { data };
    } catch (error) {
      ctx.throw(500, 'Comparison failed');
    }
  },

  // 获取产品统计
  async getStats(ctx) {
    try {
      const data = await strapi.service('api::product.product').getProductStats();
      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get product statistics');
    }
  }
}));