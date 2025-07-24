/**
 * case-study controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study.case-study', ({ strapi }) => ({
  // 获取案例列表，支持高级筛选和排序
  async find(ctx) {
    const { query } = ctx;

    // 处理行业筛选
    if (query.industry && !Array.isArray(query.industry)) {
      query.filters = {
        ...(query.filters || {}),
        industry: query.industry,
      };
      delete query.industry;
    }

    // 处理地区筛选
    if (query.region && !Array.isArray(query.region)) {
      query.filters = {
        ...(query.filters || {}),
        region: query.region,
      };
      delete query.region;
    }

    // 处理产品筛选
    if (query.product) {
      query.filters = {
        ...(query.filters || {}),
        products: {
          id: { $in: Array.isArray(query.product) ? query.product : [query.product] }
        },
      };
      delete query.product;
    }

    // 处理特色案例筛选
    if (query.featured !== undefined) {
      query.filters = {
        ...(query.filters || {}),
        featured: query.featured === 'true',
      };
      delete query.featured;
    }

    // 处理搜索
    if (query.search) {
      query.filters = {
        ...(query.filters || {}),
        $or: [
          { title: { $containsi: query.search } },
          { summary: { $containsi: query.search } },
          { challenge: { $containsi: query.search } },
          { solution: { $containsi: query.search } },
        ],
      };
      delete query.search;
    }

    // 默认按优先级和发布日期排序
    if (!query.sort) {
      query.sort = { priority: 'desc', publishedDate: 'desc' };
    }

    // 调用默认的find方法
    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },

  // 获取单个案例详情，包括关联数据
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    // 确保加载关联数据
    query.populate = {
      client: true,
      project: true,
      keyFeatures: {
        populate: ['image', 'metrics']
      },
      technicalSpecs: true,
      images: true,
      videos: true,
      documents: true,
      coverImage: true,
      gallery: {
        populate: ['media', 'thumbnail']
      },
      products: {
        populate: ['images']
      },
      relatedCases: {
        populate: ['coverImage']
      },
      testimonial: {
        populate: ['avatar']
      },
      seo: true,
    };

    const response = await super.findOne(ctx);
    return response;
  },

  // 获取案例统计信息
  async getStats(ctx) {
    try {
      const cases = await strapi.entityService.findMany('api::case-study.case-study', {
        populate: ['products']
      });

      const stats = {
        total: cases.length,
        byIndustry: {},
        byRegion: {},
        byProductType: {},
        featured: 0,
        thisYear: 0,
        avgProjectValue: 0
      };

      const currentYear = new Date().getFullYear();
      let totalValue = 0;
      let valueCount = 0;

      cases.forEach((caseStudy: any) => {
        // 按行业统计
        const industry = caseStudy.industry || 'other';
        stats.byIndustry[industry] = (stats.byIndustry[industry] || 0) + 1;

        // 按地区统计
        const region = caseStudy.region || 'other';
        stats.byRegion[region] = (stats.byRegion[region] || 0) + 1;

        // 按产品类型统计
        if (caseStudy.products && caseStudy.products.length > 0) {
          caseStudy.products.forEach((product: any) => {
            const category = product.category || 'other';
            stats.byProductType[category] = (stats.byProductType[category] || 0) + 1;
          });
        }

        // 特色案例统计
        if (caseStudy.featured) {
          stats.featured++;
        }

        // 今年案例统计
        if (caseStudy.publishedDate) {
          const publishYear = new Date(caseStudy.publishedDate).getFullYear();
          if (publishYear === currentYear) {
            stats.thisYear++;
          }
        }

        // 项目价值统计
        if (caseStudy.projectValue && !isNaN(parseFloat(caseStudy.projectValue))) {
          totalValue += parseFloat(caseStudy.projectValue);
          valueCount++;
        }
      });

      // 计算平均项目价值
      stats.avgProjectValue = valueCount > 0 ? Math.round(totalValue / valueCount) : 0;

      return { data: stats };
    } catch (error) {
      ctx.throw(500, 'Failed to get case study statistics');
    }
  },

  // 按行业获取案例
  async findByIndustry(ctx) {
    const { industry } = ctx.params;
    
    const data = await strapi.entityService.findMany('api::case-study.case-study', {
      filters: { industry },
      populate: {
        coverImage: true,
        client: true,
        products: true
      },
      sort: { priority: 'desc', publishedDate: 'desc' }
    });
    
    return { data };
  },

  // 按地区获取案例
  async findByRegion(ctx) {
    const { region } = ctx.params;
    
    const data = await strapi.entityService.findMany('api::case-study.case-study', {
      filters: { region },
      populate: {
        coverImage: true,
        client: true,
        products: true
      },
      sort: { priority: 'desc', publishedDate: 'desc' }
    });
    
    return { data };
  },

  // 获取特色案例
  async findFeatured(ctx) {
    const { query } = ctx;
    
    const data = await strapi.entityService.findMany('api::case-study.case-study', {
      filters: { featured: true },
      populate: {
        coverImage: true,
        client: true,
        products: true,
        testimonial: true
      },
      sort: { priority: 'desc', publishedDate: 'desc' },
      ...query
    });
    
    return { data };
  },

  // 获取相关案例
  async findRelated(ctx) {
    const { id } = ctx.params;
    const { limit = 4 } = ctx.query;

    try {
      // 获取当前案例信息
      const currentCase = await strapi.entityService.findOne('api::case-study.case-study', id, {
        populate: ['products']
      });

      if (!currentCase) {
        return ctx.throw(404, 'Case study not found');
      }

      // 构建查询条件：相同行业或相同产品
      const filters = {
        id: { $ne: id }, // 排除当前案例
        $or: [
          { industry: currentCase.industry },
          ...(currentCase.products && currentCase.products.length > 0 
            ? [{ products: { id: { $in: currentCase.products.map(p => p.id) } } }]
            : []
          )
        ]
      };

      const data = await strapi.entityService.findMany('api::case-study.case-study', {
        filters,
        populate: {
          coverImage: true,
          client: true,
          products: true
        },
        sort: { priority: 'desc', publishedDate: 'desc' },
        limit: parseInt(limit)
      });

      return { data };
    } catch (error) {
      ctx.throw(500, 'Failed to get related case studies');
    }
  },

  // 获取案例标签
  async getTags(ctx) {
    try {
      const cases = await strapi.entityService.findMany('api::case-study.case-study', {
        fields: ['tags']
      });

      const allTags = new Set();
      
      cases.forEach((caseStudy: any) => {
        if (caseStudy.tags && Array.isArray(caseStudy.tags)) {
          caseStudy.tags.forEach(tag => allTags.add(tag));
        }
      });

      return { data: Array.from(allTags).sort() };
    } catch (error) {
      ctx.throw(500, 'Failed to get case study tags');
    }
  },

  // 按标签获取案例
  async findByTag(ctx) {
    const { tag } = ctx.params;
    
    const data = await strapi.entityService.findMany('api::case-study.case-study', {
      filters: {
        tags: { $contains: tag }
      },
      populate: {
        coverImage: true,
        client: true,
        products: true
      },
      sort: { priority: 'desc', publishedDate: 'desc' }
    });
    
    return { data };
  }
}));