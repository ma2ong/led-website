const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiRequestOptions {
  locale?: string
  populate?: string | string[] | object
  filters?: object
  sort?: string | string[]
  pagination?: {
    page?: number
    pageSize?: number
  }
}

class StrapiAPI {
  private baseURL: string
  private token?: string

  constructor() {
    this.baseURL = STRAPI_URL
    this.token = STRAPI_API_TOKEN
  }

  private buildURL(endpoint: string, options?: StrapiRequestOptions): string {
    const url = new URL(`/api/${endpoint}`, this.baseURL)
    
    if (options) {
      const params = new URLSearchParams()
      
      if (options.locale) {
        params.append('locale', options.locale)
      }
      
      if (options.populate) {
        if (typeof options.populate === 'string') {
          params.append('populate', options.populate)
        } else if (Array.isArray(options.populate)) {
          options.populate.forEach(field => params.append('populate', field))
        } else {
          params.append('populate', JSON.stringify(options.populate))
        }
      }
      
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params.append(`filters[${key}]`, String(value))
        })
      }
      
      if (options.sort) {
        if (Array.isArray(options.sort)) {
          options.sort.forEach(field => params.append('sort', field))
        } else {
          params.append('sort', options.sort)
        }
      }
      
      if (options.pagination) {
        if (options.pagination.page) {
          params.append('pagination[page]', String(options.pagination.page))
        }
        if (options.pagination.pageSize) {
          params.append('pagination[pageSize]', String(options.pagination.pageSize))
        }
      }
      
      url.search = params.toString()
    }
    
    return url.toString()
  }

  private async request<T>(endpoint: string, options?: StrapiRequestOptions): Promise<StrapiResponse<T>> {
    const url = this.buildURL(endpoint, options)
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }
    
    try {
      const response = await fetch(url, {
        headers,
        next: { revalidate: 60 }, // Cache for 1 minute
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Strapi API Error:', error)
      throw error
    }
  }

  // Products
  async getProducts(options?: StrapiRequestOptions) {
    return this.request('products', {
      populate: ['mainImage', 'images', 'specifications'],
      ...options,
    })
  }

  async getProduct(id: string, options?: StrapiRequestOptions) {
    return this.request(`products/${id}`, {
      populate: ['mainImage', 'images', 'documents', 'specifications', 'case_studies'],
      ...options,
    })
  }

  async getProductBySlug(slug: string, options?: StrapiRequestOptions) {
    return this.request(`products/slug/${slug}`, {
      populate: ['mainImage', 'images', 'documents', 'specifications', 'case_studies'],
      ...options,
    })
  }

  async getFeaturedProducts(options?: StrapiRequestOptions) {
    return this.request('products/featured', {
      populate: ['mainImage', 'images', 'specifications'],
      ...options,
    })
  }

  async getProductsByCategory(category: string, options?: StrapiRequestOptions) {
    return this.request(`products/category/${category}`, {
      populate: ['mainImage', 'images', 'specifications'],
      ...options,
    })
  }

  async searchProducts(searchTerm: string, options?: StrapiRequestOptions) {
    return this.request('products/search', {
      ...options,
      filters: {
        ...options?.filters,
        q: searchTerm,
      },
      populate: ['mainImage', 'images'],
    })
  }

  async getRelatedProducts(productId: string, limit: number = 4, options?: StrapiRequestOptions) {
    return this.request(`products/${productId}/related`, {
      ...options,
      pagination: {
        pageSize: limit,
      },
      populate: ['mainImage'],
    })
  }

  async compareProducts(productIds: string[], options?: StrapiRequestOptions) {
    return this.request('products/compare', {
      ...options,
      filters: {
        ids: productIds.join(','),
      },
      populate: ['mainImage', 'specifications'],
    })
  }

  async getProductStats(options?: StrapiRequestOptions) {
    return this.request('products/stats', options)
  }

  // Case Studies
  async getCaseStudies(options?: StrapiRequestOptions) {
    return this.request('case-studies', {
      populate: ['mainImage', 'images', 'products'],
      ...options,
    })
  }

  async getCaseStudy(id: string, options?: StrapiRequestOptions) {
    return this.request(`case-studies/${id}`, {
      populate: ['mainImage', 'images', 'videos', 'products'],
      ...options,
    })
  }

  async getCaseStudyBySlug(slug: string, options?: StrapiRequestOptions) {
    return this.request(`case-studies/slug/${slug}`, {
      populate: ['mainImage', 'images', 'videos', 'products'],
      ...options,
    })
  }

  // News
  async getNews(options?: StrapiRequestOptions) {
    return this.request('news', {
      populate: ['featuredImage'],
      ...options,
    })
  }

  async getNewsArticle(id: string, options?: StrapiRequestOptions) {
    return this.request(`news/${id}`, {
      populate: ['featuredImage', 'images'],
      ...options,
    })
  }

  async getNewsArticleBySlug(slug: string, options?: StrapiRequestOptions) {
    return this.request(`news/slug/${slug}`, {
      populate: ['featuredImage', 'images'],
      ...options,
    })
  }

  // Global Settings
  async getGlobalSettings(options?: StrapiRequestOptions) {
    return this.request('global-setting', {
      populate: ['logo', 'favicon'],
      ...options,
    })
  }

  // Contact Form
  async submitInquiry(data: Record<string, unknown>) {
    const url = `${this.baseURL}/api/inquiries`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }
}

// Export convenience functions
export async function getCaseStudies(options?: StrapiRequestOptions) {
  return strapi.getCaseStudies(options)
}

export async function getNews(options?: StrapiRequestOptions) {
  return strapi.getNews(options)
}

export const strapi = new StrapiAPI()
export default strapi