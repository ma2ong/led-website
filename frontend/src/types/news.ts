import { MediaFile } from '@/lib/media'

export interface News {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  category: 'company-news' | 'industry-news' | 'product-updates' | 'events' | 'awards' | 'press-release'
  categoryInfo?: NewsCategory
  tags?: string[]
  
  // Media
  featuredImage?: MediaFile
  images?: MediaFile[]
  
  // Publishing
  publishDate: string
  author?: string
  
  // Business fields
  isActive?: boolean
  isFeatured?: boolean
  viewCount?: number
  
  // SEO
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  
  // Computed fields
  formattedPublishDate?: string
  readingTime?: number
  
  // Timestamps
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface NewsCategory {
  key: string
  name: string
  description?: string
  icon?: string
}

export interface NewsStats {
  total: number
  byCategory: Record<string, number>
  featured: number
  active: number
  thisMonth: number
  thisYear: number
}

export interface NewsSearchParams {
  q?: string
  category?: string
  tag?: string
  featured?: boolean
  locale?: string
  page?: number
  pageSize?: number
  sort?: string
}

// News categories configuration
export const NEWS_CATEGORIES: NewsCategory[] = [
  {
    key: 'company-news',
    name: '公司新闻',
    description: '公司最新动态和发展',
    icon: '🏢'
  },
  {
    key: 'industry-news',
    name: '行业资讯',
    description: 'LED显示屏行业新闻',
    icon: '📰'
  },
  {
    key: 'product-updates',
    name: '产品更新',
    description: '新产品发布和更新',
    icon: '🚀'
  },
  {
    key: 'events',
    name: '活动展会',
    description: '展会活动和会议',
    icon: '🎪'
  },
  {
    key: 'awards',
    name: '奖项荣誉',
    description: '获得的奖项和认证',
    icon: '🏆'
  },
  {
    key: 'press-release',
    name: '新闻发布',
    description: '官方新闻发布',
    icon: '📢'
  }
]

// Get category info by key
export function getNewsCategoryInfo(categoryKey: string): NewsCategory | undefined {
  return NEWS_CATEGORIES.find(cat => cat.key === categoryKey)
}

// Format publish date for display
export function formatPublishDate(date: string): string {
  try {
    const publishDate = new Date(date)
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(publishDate)
  } catch (error) {
    return date
  }
}

// Calculate reading time for news content
export function calculateNewsReadingTime(content: string): number {
  const wordsPerMinute = 200 // Average reading speed
  
  // Remove HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, '').trim()
  const wordCount = textContent.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  
  return Math.max(1, readingTime) // Minimum 1 minute
}

// Create news summary for list views
export function createNewsSummary(news: News): Partial<News> {
  return {
    id: news.id,
    title: news.title,
    slug: news.slug,
    excerpt: news.excerpt,
    category: news.category,
    categoryInfo: news.categoryInfo,
    tags: news.tags,
    featuredImage: news.featuredImage,
    publishDate: news.publishDate,
    formattedPublishDate: news.formattedPublishDate,
    author: news.author,
    isActive: news.isActive,
    isFeatured: news.isFeatured,
    viewCount: news.viewCount,
    readingTime: news.readingTime,
    createdAt: news.createdAt,
    publishedAt: news.publishedAt
  }
}