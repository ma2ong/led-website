/**
 * case-study transformer service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::case-study.case-study', ({ strapi }) => ({
  // 转换案例数据为前端格式
  async transformForFrontend(caseStudy: any, options: any = {}) {
    if (!caseStudy) return null;

    const transformed = {
      id: caseStudy.id,
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary,
      industry: caseStudy.industry,
      region: caseStudy.region,
      featured: caseStudy.featured,
      priority: caseStudy.priority,
      publishedDate: caseStudy.publishedDate,
      createdAt: caseStudy.createdAt,
      updatedAt: caseStudy.updatedAt,
      
      // 客户信息
      client: caseStudy.client ? {
        name: caseStudy.client.name,
        industry: caseStudy.client.industry,
        location: caseStudy.client.location,
        website: caseStudy.client.website,
        logo: caseStudy.client.logo ? this.transformMedia(caseStudy.client.logo) : null,
        description: caseStudy.client.description,
        size: caseStudy.client.size
      } : null,

      // 项目信息
      project: caseStudy.project ? {
        name: caseStudy.project.name,
        type: caseStudy.project.type,
        scale: caseStudy.project.scale,
        location: caseStudy.project.location,
        completionDate: caseStudy.project.completionDate,
        budget: caseStudy.project.budget,
        duration: caseStudy.project.duration,
        teamSize: caseStudy.project.teamSize,
        challenges: caseStudy.project.challenges,
        objectives: caseStudy.project.objectives
      } : null,

      // 媒体文件
      coverImage: caseStudy.coverImage ? this.transformMedia(caseStudy.coverImage) : null,
      images: caseStudy.images ? caseStudy.images.map(img => this.transformMedia(img)) : [],
      videos: caseStudy.videos ? caseStudy.videos.map(video => this.transformMedia(video)) : [],
      documents: caseStudy.documents ? caseStudy.documents.map(doc => this.transformMedia(doc)) : [],

      // 标签和分类
      tags: caseStudy.tags || [],
      industryLabel: this.getIndustryLabel(caseStudy.industry),
      regionLabel: this.getRegionLabel(caseStudy.region),

      // SEO数据
      seo: caseStudy.seo ? {
        metaTitle: caseStudy.seo.metaTitle,
        metaDescription: caseStudy.seo.metaDescription,
        keywords: caseStudy.seo.keywords,
        metaImage: caseStudy.seo.metaImage ? this.transformMedia(caseStudy.seo.metaImage) : null,
        structuredData: caseStudy.seo.structuredData,
        canonicalURL: caseStudy.seo.canonicalURL
      } : null
    };

    // 根据选项包含详细内容
    if (options.includeContent) {
      transformed.challenge = caseStudy.challenge;
      transformed.solution = caseStudy.solution;
      transformed.results = caseStudy.results;
      transformed.projectDuration = caseStudy.projectDuration;
      transformed.projectValue = caseStudy.projectValue;
    }

    // 包含关键特性
    if (options.includeFeatures && caseStudy.keyFeatures) {
      transformed.keyFeatures = caseStudy.keyFeatures.map(feature => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon,
        image: feature.image ? this.transformMedia(feature.image) : null,
        metrics: feature.metrics || [],
        benefits: feature.benefits || []
      }));
    }

    // 包含技术规格
    if (options.includeSpecs && caseStudy.technicalSpecs) {
      transformed.technicalSpecs = caseStudy.technicalSpecs.map(spec => ({
        key: spec.key,
        value: spec.value
      }));
    }

    // 包含画廊
    if (options.includeGallery && caseStudy.gallery) {
      transformed.gallery = caseStudy.gallery
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(item => ({
          title: item.title,
          description: item.description,
          type: item.type,
          media: this.transformMedia(item.media),
          thumbnail: item.thumbnail ? this.transformMedia(item.thumbnail) : null,
          featured: item.featured,
          tags: item.tags || [],
          metadata: item.metadata || {}
        }));
    }

    // 包含关联产品
    if (options.includeProducts && caseStudy.products) {
      transformed.products = caseStudy.products.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        images: product.images ? product.images.slice(0, 1).map(img => this.transformMedia(img)) : []
      }));
    }

    // 包含相关案例
    if (options.includeRelated && caseStudy.relatedCases) {
      transformed.relatedCases = caseStudy.relatedCases.map(relatedCase => ({
        id: relatedCase.id,
        title: relatedCase.title,
        slug: relatedCase.slug,
        summary: relatedCase.summary,
        industry: relatedCase.industry,
        coverImage: relatedCase.coverImage ? this.transformMedia(relatedCase.coverImage) : null,
        client: relatedCase.client ? { name: relatedCase.client.name } : null
      }));
    }

    // 包含证言
    if (options.includeTestimonial && caseStudy.testimonial) {
      transformed.testimonial = {
        content: caseStudy.testimonial.content,
        author: caseStudy.testimonial.author,
        position: caseStudy.testimonial.position,
        company: caseStudy.testimonial.company,
        avatar: caseStudy.testimonial.avatar ? this.transformMedia(caseStudy.testimonial.avatar) : null,
        rating: caseStudy.testimonial.rating,
        date: caseStudy.testimonial.date,
        featured: caseStudy.testimonial.featured
      };
    }

    return transformed;
  },

  // 转换案例列表为前端格式
  async transformListForFrontend(cases: any[], options: any = {}) {
    if (!cases || !Array.isArray(cases)) return [];

    return Promise.all(
      cases.map(caseStudy => this.transformForFrontend(caseStudy, {
        includeContent: false,
        includeFeatures: false,
        includeSpecs: false,
        includeGallery: false,
        includeProducts: true,
        includeRelated: false,
        includeTestimonial: false,
        ...options
      }))
    );
  },

  // 转换媒体文件
  transformMedia(media: any) {
    if (!media) return null;

    return {
      id: media.id,
      name: media.name,
      alternativeText: media.alternativeText,
      caption: media.caption,
      width: media.width,
      height: media.height,
      formats: media.formats,
      hash: media.hash,
      ext: media.ext,
      mime: media.mime,
      size: media.size,
      url: media.url,
      previewUrl: media.previewUrl,
      provider: media.provider,
      createdAt: media.createdAt,
      updatedAt: media.updatedAt
    };
  },

  // 转换案例统计数据
  transformStatsForFrontend(stats: any) {
    return {
      total: stats.total,
      featured: stats.featured,
      thisYear: stats.thisYear,
      avgRating: stats.avgRating,
      withTestimonials: stats.withTestimonials,
      
      byIndustry: Object.entries(stats.byIndustry).map(([key, value]) => ({
        key,
        label: this.getIndustryLabel(key),
        count: value,
        percentage: Math.round((value as number / stats.total) * 100)
      })),
      
      byRegion: Object.entries(stats.byRegion).map(([key, value]) => ({
        key,
        label: this.getRegionLabel(key),
        count: value,
        percentage: Math.round((value as number / stats.total) * 100)
      })),
      
      byProductType: Object.entries(stats.byProductType).map(([key, value]) => ({
        key,
        label: this.getCategoryLabel(key),
        count: value,
        percentage: Math.round((value as number / stats.total) * 100)
      })),
      
      byYear: Object.entries(stats.byYear)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([key, value]) => ({
          year: key,
          count: value,
          percentage: Math.round((value as number / stats.total) * 100)
        }))
    };
  },

  // 转换案例为卡片格式
  transformForCard(caseStudy: any) {
    return {
      id: caseStudy.id,
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary,
      industry: caseStudy.industry,
      industryLabel: this.getIndustryLabel(caseStudy.industry),
      region: caseStudy.region,
      regionLabel: this.getRegionLabel(caseStudy.region),
      featured: caseStudy.featured,
      publishedDate: caseStudy.publishedDate,
      coverImage: caseStudy.coverImage ? this.transformMedia(caseStudy.coverImage) : null,
      client: caseStudy.client ? {
        name: caseStudy.client.name,
        logo: caseStudy.client.logo ? this.transformMedia(caseStudy.client.logo) : null
      } : null,
      products: caseStudy.products ? caseStudy.products.slice(0, 2).map(product => ({
        id: product.id,
        name: product.name,
        category: product.category
      })) : [],
      tags: (caseStudy.tags || []).slice(0, 3),
      testimonial: caseStudy.testimonial ? {
        rating: caseStudy.testimonial.rating,
        author: caseStudy.testimonial.author
      } : null
    };
  },

  // 转换案例为搜索结果格式
  transformForSearch(caseStudy: any) {
    return {
      id: caseStudy.id,
      title: caseStudy.title,
      slug: caseStudy.slug,
      summary: caseStudy.summary,
      type: 'case-study',
      url: `/cases/${caseStudy.slug}`,
      image: caseStudy.coverImage ? this.transformMedia(caseStudy.coverImage) : null,
      metadata: {
        industry: this.getIndustryLabel(caseStudy.industry),
        region: this.getRegionLabel(caseStudy.region),
        client: caseStudy.client?.name,
        publishedDate: caseStudy.publishedDate
      }
    };
  },

  // 转换案例为RSS格式
  transformForRSS(caseStudy: any) {
    return {
      title: caseStudy.title,
      description: caseStudy.summary || this.extractTextFromRichText(caseStudy.challenge),
      link: `https://www.lianjin-led.com/cases/${caseStudy.slug}`,
      guid: `case-study-${caseStudy.id}`,
      pubDate: new Date(caseStudy.publishedDate || caseStudy.createdAt),
      category: this.getIndustryLabel(caseStudy.industry),
      enclosure: caseStudy.coverImage ? {
        url: caseStudy.coverImage.url,
        type: caseStudy.coverImage.mime,
        length: caseStudy.coverImage.size
      } : null
    };
  },

  // 从富文本中提取纯文本
  extractTextFromRichText(richText: string): string {
    if (!richText) return '';
    
    return richText
      .replace(/<[^>]*>/g, '') // 移除HTML标签
      .replace(/\s+/g, ' ') // 合并空白字符
      .trim()
      .substring(0, 200); // 限制长度
  },

  // 获取行业标签
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

  // 获取地区标签
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
  },

  // 获取产品分类标签
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

  // 生成面包屑导航
  generateBreadcrumbs(caseStudy: any) {
    return [
      { name: '首页', url: '/' },
      { name: '案例研究', url: '/cases' },
      { name: this.getIndustryLabel(caseStudy.industry), url: `/cases?industry=${caseStudy.industry}` },
      { name: caseStudy.title, url: `/cases/${caseStudy.slug}`, current: true }
    ];
  },

  // 生成结构化数据
  generateStructuredData(caseStudy: any) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": caseStudy.title,
      "description": caseStudy.summary,
      "image": caseStudy.coverImage ? caseStudy.coverImage.url : null,
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
      },
      "about": {
        "@type": "Thing",
        "name": this.getIndustryLabel(caseStudy.industry)
      }
    };
  }
}));