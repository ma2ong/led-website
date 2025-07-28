// API服务基础设施
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

// API响应类型定义
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// 产品数据类型
export interface Product {
  id: number;
  attributes: {
    name: string;
    name_en?: string;
    description: string;
    description_en?: string;
    category: string;
    specifications: any;
    images?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          width: number;
          height: number;
        };
      }>;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// 新闻数据类型
export interface News {
  id: number;
  attributes: {
    title: string;
    title_en?: string;
    content: string;
    content_en?: string;
    excerpt: string;
    excerpt_en?: string;
    publishDate: string;
    featured_image?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// 案例研究数据类型
export interface CaseStudy {
  id: number;
  attributes: {
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
    industry: string;
    location: string;
    challenge: string;
    challenge_en?: string;
    solution: string;
    solution_en?: string;
    results: string;
    results_en?: string;
    images?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      }>;
    };
    products?: {
      data: Product[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// HTTP客户端类
class ApiClient {
  private baseURL: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5分钟缓存

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // 获取缓存的数据
  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  // 设置缓存数据
  private setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // 通用请求方法
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}_${url}`;

    // 检查缓存（仅对GET请求）
    if (!options.method || options.method === 'GET') {
      const cachedData = this.getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error.message || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // 缓存GET请求的结果
      if (!options.method || options.method === 'GET') {
        this.setCachedData(cacheKey, data);
      }

      return data;
    } catch (error) {
      console.error(`API请求失败: ${url}`, error);
      throw error;
    }
  }

  // GET请求
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  // POST请求
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT请求
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE请求
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // 清除缓存
  clearCache(): void {
    this.cache.clear();
  }
}

// 创建API客户端实例
export const apiClient = new ApiClient(API_BASE_URL);

// 产品API服务
export const productService = {
  // 获取所有产品
  async getProducts(params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    populate?: string;
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.category) searchParams.append('filters[category][$eq]', params.category);
    if (params?.populate) searchParams.append('populate', params.populate);
    else searchParams.append('populate', 'images');

    const query = searchParams.toString();
    return apiClient.get<ApiResponse<Product[]>>(`/products${query ? `?${query}` : ''}`);
  },

  // 根据ID获取单个产品
  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return apiClient.get<ApiResponse<Product>>(`/products/${id}?populate=images,case_studies`);
  },

  // 搜索产品
  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams({
      'filters[$or][0][name][$containsi]': query,
      'filters[$or][1][description][$containsi]': query,
      'populate': 'images'
    });
    return apiClient.get<ApiResponse<Product[]>>(`/products?${searchParams.toString()}`);
  }
};

// 新闻API服务
export const newsService = {
  // 获取所有新闻
  async getNews(params?: {
    page?: number;
    pageSize?: number;
    populate?: string;
  }): Promise<ApiResponse<News[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.populate) searchParams.append('populate', params.populate);
    else searchParams.append('populate', 'featured_image');
    
    searchParams.append('sort', 'publishDate:desc');

    return apiClient.get<ApiResponse<News[]>>(`/news?${searchParams.toString()}`);
  },

  // 根据ID获取单个新闻
  async getNewsItem(id: number): Promise<ApiResponse<News>> {
    return apiClient.get<ApiResponse<News>>(`/news/${id}?populate=featured_image`);
  }
};

// 案例研究API服务
export const caseStudyService = {
  // 获取所有案例研究
  async getCaseStudies(params?: {
    page?: number;
    pageSize?: number;
    industry?: string;
    populate?: string;
  }): Promise<ApiResponse<CaseStudy[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.industry) searchParams.append('filters[industry][$eq]', params.industry);
    if (params?.populate) searchParams.append('populate', params.populate);
    else searchParams.append('populate', 'images,products');

    return apiClient.get<ApiResponse<CaseStudy[]>>(`/case-studies?${searchParams.toString()}`);
  },

  // 根据ID获取单个案例研究
  async getCaseStudy(id: number): Promise<ApiResponse<CaseStudy>> {
    return apiClient.get<ApiResponse<CaseStudy>>(`/case-studies/${id}?populate=images,products`);
  }
};

// 询盘API服务
export const inquiryService = {
  // 提交询盘
  async submitInquiry(data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    product_type?: string;
    message: string;
  }): Promise<ApiResponse<any>> {
    return apiClient.post<ApiResponse<any>>('/inquiries', { data });
  }
};

// 错误处理工具
export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return '网络请求失败，请稍后重试';
};

// 图片URL处理工具
export const getImageUrl = (imageData: any): string => {
  if (!imageData?.data?.attributes?.url) return '';
  
  const url = imageData.data.attributes.url;
  // 如果是相对路径，添加API基础URL
  if (url.startsWith('/')) {
    return `${API_BASE_URL.replace('/api', '')}${url}`;
  }
  return url;
};

// 多语言内容获取工具
export const getLocalizedContent = (
  content: any,
  field: string,
  language: 'zh' | 'en' = 'zh'
): string => {
  if (language === 'en' && content[`${field}_en`]) {
    return content[`${field}_en`];
  }
  return content[field] || '';
};