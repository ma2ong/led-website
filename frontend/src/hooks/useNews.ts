import { useQuery } from '@tanstack/react-query';
import { newsService, type News, getImageUrl, getLocalizedContent } from '@/services/api';

// 查询键工厂
const queryKeys = {
  news: {
    all: ['news'] as const,
    lists: () => [...queryKeys.news.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.news.lists(), filters] as const,
    details: () => [...queryKeys.news.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.news.details(), id] as const,
    latest: () => [...queryKeys.news.all, 'latest'] as const,
  },
};

// 获取所有新闻
export function useNews(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}) {
  return useQuery({
    queryKey: queryKeys.news.list(params || {}),
    queryFn: () => newsService.getNews(params),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
}

// 获取单篇新闻
export function useNewsItem(id: string) {
  return useQuery({
    queryKey: queryKeys.news.detail(id),
    queryFn: () => newsService.getNewsItem(parseInt(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
}

// 获取最新新闻
export function useLatestNews(limit: number = 6) {
  return useQuery({
    queryKey: queryKeys.news.latest(),
    queryFn: () => newsService.getNews({ pageSize: limit }),
    staleTime: 2 * 60 * 1000, // 2分钟
  });
}

// 新闻分类常量
export const NEWS_CATEGORIES = {
  COMPANY: 'company',
  PRODUCT: 'product',
  INDUSTRY: 'industry',
  TECHNOLOGY: 'technology',
  EXHIBITION: 'exhibition',
} as const;

export type NewsCategory = typeof NEWS_CATEGORIES[keyof typeof NEWS_CATEGORIES];

// 新闻分类标签
export const NEWS_CATEGORY_LABELS = {
  [NEWS_CATEGORIES.COMPANY]: {
    zh: '公司动态',
    en: 'Company News',
    icon: '🏢',
    color: 'bg-blue-500',
  },
  [NEWS_CATEGORIES.PRODUCT]: {
    zh: '产品发布',
    en: 'Product Release',
    icon: '🚀',
    color: 'bg-green-500',
  },
  [NEWS_CATEGORIES.INDUSTRY]: {
    zh: '行业资讯',
    en: 'Industry News',
    icon: '📊',
    color: 'bg-purple-500',
  },
  [NEWS_CATEGORIES.TECHNOLOGY]: {
    zh: '技术分享',
    en: 'Technology',
    icon: '🔬',
    color: 'bg-orange-500',
  },
  [NEWS_CATEGORIES.EXHIBITION]: {
    zh: '展会参与',
    en: 'Exhibition',
    icon: '🎪',
    color: 'bg-pink-500',
  },
};

// 新闻工具函数
export const newsUtils = {
  // 获取新闻主图
  getMainImage: (newsItem: News) => {
    return getImageUrl(newsItem.attributes.featured_image);
  },

  // 获取本地化标题
  getLocalizedTitle: (newsItem: News, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(newsItem.attributes, 'title', language);
  },

  // 获取本地化摘要
  getLocalizedExcerpt: (newsItem: News, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(newsItem.attributes, 'excerpt', language);
  },

  // 获取本地化内容
  getLocalizedContent: (newsItem: News, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(newsItem.attributes, 'content', language);
  },

  // 格式化发布日期
  formatPublishDate: (dateString: string, language: 'zh' | 'en' = 'zh') => {
    const date = new Date(dateString);
    if (language === 'en') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // 获取分类标签
  getCategoryLabel: (category: NewsCategory, language: 'zh' | 'en' = 'zh') => {
    return NEWS_CATEGORY_LABELS[category]?.[language] || category;
  },

  // 获取分类图标
  getCategoryIcon: (category: NewsCategory) => {
    return NEWS_CATEGORY_LABELS[category]?.icon || '📰';
  },

  // 获取分类颜色
  getCategoryColor: (category: NewsCategory) => {
    return NEWS_CATEGORY_LABELS[category]?.color || 'bg-gray-500';
  },
};

// 重新导出类型
export type NewsItem = News;