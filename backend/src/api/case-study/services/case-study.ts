/**
 * case-study service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::case-study.case-study', ({ strapi }) => ({
  // 获取案例统计信息
  async getCaseStudyStats() {
    const cases = await strapi.entityService.findMany('api::case-study.case-study', {
      populate: ['products', 'client']
    });

    const stats = {
      total: cases.length,
      byIndustry: {},
      byRegion: {},
      byProductType: {},
      byYear: {},
      featured: 0,
      withTestimonials: 0,
      avgRating: 0,
      totalProjects: cases.length
    };

    let totalRating = 0;
    let ratingCount = 0;

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

      // 按年份统计
      if (caseStudy.publishedDate) {
        const year = new Date(caseStudy.publishedDate).getFullYear().toString();
        stats.byYear[year] = (stats.byYear[year] || 0) + 1;
      }

      // 特色案例统计
      if (caseStudy.featured) {
        stats.featured++;
      }

      // 有证言的案例统计
      if (caseStudy.testimonial && caseStudy.testimonial.content) {
        stats.withTestimonials++;
        
        if (caseStudy.testimonial.rating) {
          totalRating += caseStudy.testimonial.rating;
          ratingCount++;
        }
      }
    });

    // 计算平均评分
    stats.avgRating = ratingCount > 0 ? Math.round((totalRating / ratingCount) * 10) / 10 : 0;

    return stats;
  },

  // 验证案例数据
  async validateCaseStudyData(data: any) {
    const errors: string[] = [];

    // 必填字段验证
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!data.challenge || data.challenge.trim().length === 0) {
      errors.push('Challenge description is required');
    }

    if (!data.solution || data.solution.trim().length === 0) {
      errors.push('Solution description is required');
    }

    if (!data.results || data.results.trim().length === 0) {
      errors.push('Results description is required');
    }

    if (!data.industry) {
      errors.push('Industry is required');
    }

    if (!data.region) {
      errors.push('Region is required');
    }

    // 长度验证
    if (data.title && data.title.length > 200) {
      errors.push('Title must be less than 200 characters');
    }

    if (data.summary && data.summary.length > 500) {
      errors.push('Summary must be less than 500 characters');
    }

    // 客户信息验证
    if (data.client && data.client.name && data.client.name.length > 100) {
      errors.push('Client name must be less than 100 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // 生成案例SEO数据
  async generateSEOData(caseStudy: any) {
    const seoData = {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      structuredData: {}
    };

    // 生成标题
    seoData.metaTitle = caseStudy.title;
    if (caseStudy.client?.name) {
      seoData.metaTitle += ` - ${caseStudy.client.name}`;
    }
    seoData.metaTitle += ' | 联锦光电案例研究';

    // 生成描述
    if (caseStudy.summary) {
      seoData.metaDescription = caseStudy.summary.substring(0, 160);
    } else {
      seoData.metaDescription = `了解${caseStudy.client?.name || '客户'}如何通过联锦光电的LED显示屏解决方案实现业务目标。`;
    }

    // 生成关键词
    const keywords = [];
    if (caseStudy.industry) {
      keywords.push(this.getIndustryLabel(caseStudy.industry));
    }
    if (caseStudy.products && caseStudy.products.length > 0) {
      caseStudy.products.forEach((product: any) => {
        if (product.name) keywords.push(product.name);
        if (product.category) keywords.push(this.getCategoryLabel(product.category));
      });
    }
    keywords.push('LED显示屏', '案例研究', '联锦光电');
    seoData.keywords = keywords;

    // 生成结构化数据
    seoData.structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": caseStudy.title,
      "description": seoData.metaDescription,
      "author": {
        "@type": "Organization",
        "name": "联锦光电"
      },
      "publisher": {
        "@type": "Organization",
        "name": "联锦光电",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.lianjin-led.com/logo.png"
        }
      },
      "datePublished": caseStudy.publishedDate || caseStudy.createdAt,
      "dateModified": caseStudy.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.lianjin-led.com/cases/${caseStudy.slug}`
      }
    };

    if (caseStudy.coverImage) {
      seoData.structuredData.image = {
        "@type": "ImageObject",
        "url": caseStudy.coverImage.url,
        "width": caseStudy.coverImage.width,
        "height": caseStudy.coverImage.height
      };
    }

    return seoData;
  },

  // 处理案例图片
  async processImages(caseStudy: any) {
    if (!caseStudy.images || caseStudy.images.length === 0) {
      return caseStudy;
    }

    // 为图片添加alt文本和标题
    const processedImages = caseStudy.images.map((image: any, index: number) => ({
      ...image,
      alternativeText: image.alternativeText || `${caseStudy.title} - 图片 ${index + 1}`,
      caption: image.caption || `${caseStudy.client?.name || '项目'} LED显示屏案例图片`
    }));

    return {
      ...caseStudy,
      images: processedImages
    };
  },

  // 获取推荐案例
  async getRecommendedCases(currentCaseId: number, limit: number = 4) {
    try {
      // 获取当前案例信息
      const currentCase = await strapi.entityService.findOne('api::case-study.case-study', currentCaseId, {
        populate: ['products']
      });

      if (!currentCase) {
        return [];
      }

      // 构建推荐逻辑：相同行业 > 相同产品 > 特色案例
      const recommendations = [];

      // 1. 相同行业的案例
      const sameIndustryCases = await strapi.entityService.findMany('api::case-study.case-study', {
        filters: {
          industry: currentCase.industry,
          id: { $ne: currentCaseId },
          publishedAt: { $notNull: true }
        },
        populate: ['coverImage', 'client', 'products'],
        sort: { priority: 'desc', publishedDate: 'desc' },
        limit: 2
      });
      recommendations.push(...sameIndustryCases);

      // 2. 如果不够，添加相同产品的案例
      if (recommendations.length < limit && currentCase.products?.length > 0) {
        const sameProductCases = await strapi.entityService.findMany('api::case-study.case-study', {
          filters: {
            products: { id: { $in: currentCase.products.map(p => p.id) } },
            id: { $ne: currentCaseId },
            industry: { $ne: currentCase.industry }, // 排除已添加的相同行业案例
            publishedAt: { $notNull: true }
          },
          populate: ['coverImage', 'client', 'products'],
          sort: { priority: 'desc', publishedDate: 'desc' },
          limit: limit - recommendations.length
        });
        recommendations.push(...sameProductCases);
      }

      // 3. 如果还不够，添加特色案例
      if (recommendations.length < limit) {
        const featuredCases = await strapi.entityService.findMany('api::case-study.case-study', {
          filters: {
            featured: true,
            id: { $ne: currentCaseId },
            publishedAt: { $notNull: true }
          },
          populate: ['coverImage', 'client', 'products'],
          sort: { priority: 'desc', publishedDate: 'desc' },
          limit: limit - recommendations.length
        });
        
        // 过滤掉已经添加的案例
        const existingIds = recommendations.map(c => c.id);
        const newFeaturedCases = featuredCases.filter(c => !existingIds.includes(c.id));
        recommendations.push(...newFeaturedCases);
      }

      return recommendations.slice(0, limit);
    } catch (error) {
      console.error('Error getting recommended cases:', error);
      return [];
    }
  },

  // 辅助方法：获取行业标签
  getIndustryLabel(industry: string): string {
    const industryLabels = {
      'retail': '零售',
      'sports': '体育',
      'transportation': '交通',
      'education': '教育',
      'healthcare': '医疗',
      'entertainment': '娱乐',
      'corporate': '企业',
      'government': '政府',
      'hospitality': '酒店',
      'advertising': '广告',
      'broadcasting': '广播',
      'events': '活动',
      'other': '其他'
    };
    return industryLabels[industry] || industry;
  },

  // 辅助方法：获取分类标签
  getCategoryLabel(category: string): string {
    const categoryLabels = {
      'outdoor': '户外显示屏',
      'indoor': '室内显示屏',
      'rental': '租赁显示屏',
      'creative': '创意显示屏',
      'transparent': '透明显示屏',
      'fine-pitch': '小间距显示屏',
      'poster': '海报屏',
      'all-in-one': '一体机'
    };
    return categoryLabels[category] || category;
  },

  // 辅助方法：获取地区标签
  getRegionLabel(region: string): string {
    const regionLabels = {
      'china': '中国',
      'asia-pacific': '亚太地区',
      'north-america': '北美',
      'europe': '欧洲',
      'middle-east': '中东',
      'africa': '非洲',
      'south-america': '南美',
      'oceania': '大洋洲'
    };
    return regionLabels[region] || region;
  }
}));