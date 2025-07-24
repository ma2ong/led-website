import { strapi } from '@/lib/strapi'
import { News, NEWS_CATEGORIES } from '@/types/news'

// Transform Strapi news data to our News type
function transformNews(strapiNews: any): News {
  const attributes = strapiNews.attributes || strapiNews
  
  return {
    id: strapiNews.id,
    title: attributes.title,
    slug: attributes.slug,
    excerpt: attributes.excerpt,
    content: attributes.content,
    category: attributes.category,
    categoryInfo: NEWS_CATEGORIES.find(cat => cat.key === attributes.category),
    tags: attributes.tags || [],
    
    // Media
    featuredImage: attributes.featuredImage?.data ? {
      id: attributes.featuredImage.data.id,
      url: attributes.featuredImage.data.attributes.url,
      alternativeText: attributes.featuredImage.data.attributes.alternativeText,
      width: attributes.featuredImage.data.attributes.width,
      height: attributes.featuredImage.data.attributes.height,
    } : undefined,
    images: attributes.images?.data?.map((img: any) => ({
      id: img.id,
      url: img.attributes.url,
      alternativeText: img.attributes.alternativeText,
      width: img.attributes.width,
      height: img.attributes.height,
    })) || [],
    
    // Publishing
    publishDate: attributes.publishDate,
    author: attributes.author,
    
    // Business fields
    isActive: attributes.isActive !== false,
    isFeatured: attributes.isFeatured || false,
    viewCount: attributes.viewCount || 0,
    
    // SEO
    seoTitle: attributes.seoTitle,
    seoDescription: attributes.seoDescription,
    seoKeywords: attributes.seoKeywords,
    
    // Computed fields
    formattedPublishDate: attributes.formattedPublishDate,
    readingTime: attributes.readingTime,
    
    // Timestamps
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
    publishedAt: attributes.publishedAt,
  }
}

export async function getNews(options: {
  locale?: string
  page?: number
  sort?: string
  filter?: string
  category?: string
} = {}): Promise<{ data: News[], meta?: any }> {
  const { locale = 'zh', page = 1, sort = 'newest', filter, category } = options

  try {
    // Build sort parameter
    let sortParam = 'publishDate:desc'
    switch (sort) {
      case 'oldest':
        sortParam = 'publishDate:asc'
        break
      case 'popular':
        sortParam = 'viewCount:desc'
        break
      case 'newest':
      default:
        sortParam = 'publishDate:desc'
        break
    }

    // Build filters
    const filters: any = {
      isActive: true,
      publishDate: { $lte: new Date().toISOString() }
    }

    if (category) {
      filters['category[$eq]'] = category
    }

    // Add additional filters
    if (filter) {
      const filterArray = filter.split(',')
      filterArray.forEach(f => {
        switch (f) {
          case 'featured':
            filters['isFeatured[$eq]'] = true
            break
          case 'recent':
            // News from the last 30 days
            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            filters['publishDate[$gte]'] = thirtyDaysAgo.toISOString()
            break
          case 'popular':
            filters['viewCount[$gt]'] = 0
            break
        }
      })
    }

    const response = await strapi.get('/news', {
      params: {
        filters,
        locale,
        populate: {
          featuredImage: true,
          images: true
        },
        sort: sortParam,
        pagination: {
          page,
          pageSize: 12
        }
      }
    })

    return {
      data: response.data.map(transformNews),
      meta: response.meta
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    return { data: [] }
  }
}

export async function getNewsArticle(slug: string, options: { locale?: string } = {}): Promise<{ data: News | null }> {
  const { locale = 'zh' } = options
  const article = await getNewsBySlug(slug, locale)
  return { data: article }
}

export async function getNewsBySlug(slug: string, locale: string = 'zh'): Promise<News | null> {
  try {
    const response = await strapi.get(`/news/slug/${slug}`, {
      params: {
        locale,
        populate: {
          featuredImage: true,
          images: true
        }
      }
    })

    if (response.data) {
      return transformNews(response.data)
    }

    return null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

export async function getFeaturedNews(locale: string = 'zh'): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get('/news/featured', {
      params: {
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error fetching featured news:', error)
    return { data: [] }
  }
}

export async function getNewsByCategory(
  category: string, 
  locale: string = 'zh'
): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get(`/news/category/${category}`, {
      params: {
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error fetching news by category:', error)
    return { data: [] }
  }
}

export async function getRelatedNews(
  newsId: number, 
  locale: string = 'zh'
): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get(`/news/${newsId}/related`, {
      params: {
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error fetching related news:', error)
    return { data: [] }
  }
}

export async function getNewsByTag(
  tag: string, 
  locale: string = 'zh'
): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get(`/news/tag/${tag}`, {
      params: {
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error fetching news by tag:', error)
    return { data: [] }
  }
}

export async function getLatestNews(
  limit: number = 10, 
  locale: string = 'zh'
): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get('/news/latest', {
      params: {
        limit,
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error fetching latest news:', error)
    return { data: [] }
  }
}

export async function getPopularNews(
  limit: number = 10, 
  locale: string = 'zh'
): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get('/news/popular', {
      params: {
        limit,
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error fetching popular news:', error)
    return { data: [] }
  }
}

export async function searchNews(
  query: string, 
  locale: string = 'zh'
): Promise<{ data: News[] }> {
  try {
    const response = await strapi.get('/news/search', {
      params: {
        q: query,
        locale,
        populate: {
          featuredImage: true
        }
      }
    })

    return {
      data: response.data.map(transformNews)
    }
  } catch (error) {
    console.error('Error searching news:', error)
    return { data: [] }
  }
}

export async function getNewsStats(): Promise<{
  total: number
  byCategory: Record<string, number>
  featured: number
  active: number
  thisMonth: number
  thisYear: number
} | null> {
  try {
    const response = await strapi.get('/news/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching news stats:', error)
    return null
  }
}

export async function getAllNewsTags(): Promise<string[]> {
  try {
    const response = await strapi.get('/news/tags')
    return response.data || []
  } catch (error) {
    console.error('Error fetching news tags:', error)
    return []
  }
}