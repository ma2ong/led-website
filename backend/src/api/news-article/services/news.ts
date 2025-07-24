/**
 * news service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::news-article.news-article', ({ strapi }) => ({
  // 获取新闻统计信息
  async getNewsStats() {
    const news = await strapi.entityService.findMany('api::news-article.news-article', {
      filters: { isActive: true }
    });

    const stats = {
      total: news.length,
      byCategory: {},
      featured: news.filter((n: any) => n.isFeatured).length,
      active: news.filter((n: any) => n.isActive).length,
      thisMonth: 0,
      thisYear: 0
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // 按分类统计和时间统计
    news.forEach((article: any) => {
      const category = article.category || 'other';
      stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

      // 统计本月和本年发布的新闻
      if (article.publishDate) {
        const publishDate = new Date(article.publishDate);
        if (publishDate.getFullYear() === currentYear) {
          stats.thisYear++;
          if (publishDate.getMonth() === currentMonth) {
            stats.thisMonth++;
          }
        }
      }
    });

    return stats;
  },

  // 搜索新闻
  async searchNews(searchTerm: any, locale = 'zh') {
    const news = await strapi.entityService.findMany('api::news-article.news-article', {
      filters: {
        $or: [
          { title: { $containsi: searchTerm } },
          { excerpt: { $containsi: searchTerm } },
          { content: { $containsi: searchTerm } },
        ],
        isActive: true,
      },
      populate: {
        featuredImage: true,
      },
      sort: { publishDate: 'desc' },
      locale,
    });

    return news;
  },

  // 获取相关新闻
  async getRelatedNews(newsId: any, limit = 4) {
    const news = await strapi.entityService.findOne('api::news-article.news-article', newsId);
    
    if (!news) {
      return [];
    }

    const relatedNews = await strapi.entityService.findMany('api::news-article.news-article', {
      filters: {
        category: news.category,
        id: { $ne: newsId },
        isActive: true,
      },
      populate: {
        featuredImage: true,
      },
      sort: { publishDate: 'desc' },
      limit,
    });

    return relatedNews;
  },

  // 按标签获取新闻
  async getNewsByTag(tag: string, locale = 'zh') {
    const news = await strapi.entityService.findMany('api::news.news', {
      filters: {
        tags: { $contains: tag },
        isActive: true,
      },
      populate: {
        featuredImage: true,
      },
      sort: { publishDate: 'desc' },
      locale,
    });

    return news;
  },

  // 获取最新新闻
  async getLatestNews(limit = 10, locale = 'zh') {
    const news = await strapi.entityService.findMany('api::news.news', {
      filters: {
        isActive: true,
        publishDate: { $lte: new Date().toISOString() }
      },
      populate: {
        featuredImage: true,
      },
      sort: { publishDate: 'desc' },
      limit,
      locale,
    });

    return news;
  },

  // 获取热门新闻（按浏览量）
  async getPopularNews(limit = 10, locale = 'zh') {
    const news = await strapi.entityService.findMany('api::news.news', {
      filters: {
        isActive: true,
        publishDate: { $lte: new Date().toISOString() }
      },
      populate: {
        featuredImage: true,
      },
      sort: { viewCount: 'desc' },
      limit,
      locale,
    });

    return news;
  },

  // 获取所有标签
  async getAllTags() {
    const news = await strapi.entityService.findMany('api::news.news', {
      filters: { isActive: true },
      fields: ['tags']
    });

    const allTags = new Set();
    news.forEach((article: any) => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach((tag: string) => allTags.add(tag));
      }
    });

    return Array.from(allTags);
  }
}));