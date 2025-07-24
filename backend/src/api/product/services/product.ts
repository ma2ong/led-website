/**
 * product service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  // 获取产品统计信息
  async getProductStats() {
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: { isActive: true }
    });

    const stats = {
      total: products.length,
      byCategory: {},
      featured: products.filter(p => p.isFeatured).length,
      active: products.filter(p => p.isActive).length,
    };

    // 按分类统计
    products.forEach(product => {
      const category = product.category || 'other';
      stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
    });

    return stats;
  },

  // 搜索产品
  async searchProducts(searchTerm, locale = 'zh') {
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {
        $or: [
          { name: { $containsi: searchTerm } },
          { shortDescription: { $containsi: searchTerm } },
          { modelNumber: { $containsi: searchTerm } },
        ],
        isActive: true,
      },
      populate: {
        mainImage: true,
        images: true,
      },
      locale,
    });

    return products;
  },

  // 获取相关产品
  async getRelatedProducts(productId, limit = 4) {
    const product = await strapi.entityService.findOne('api::product.product', productId);
    
    if (!product) {
      return [];
    }

    const relatedProducts = await strapi.entityService.findMany('api::product.product', {
      filters: {
        category: product.category,
        id: { $ne: productId },
        isActive: true,
      },
      populate: {
        mainImage: true,
      },
      sort: { sortOrder: 'asc' },
      limit,
    });

    return relatedProducts;
  },

  // 获取产品比较数据
  async getProductComparison(productIds) {
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return [];
    }

    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {
        id: { $in: productIds },
        isActive: true,
      },
      populate: {
        mainImage: true,
        specifications: true,
      },
    });

    return products;
  },

  // 更新产品排序
  async updateSortOrder(productId: string | number, sortOrder: number) {
    return await strapi.entityService.update('api::product.product', productId, {
      data: { sortOrder } as any,
    });
  },
}));