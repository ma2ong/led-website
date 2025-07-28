// 增强的API服务基础设施
import { apiClient, ApiResponse, ApiError } from './api';

// 错误类型定义
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// 重试配置
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryCondition?: (error: any) => boolean;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    // 只对网络错误和5xx错误重试
    return !error.status || error.status >= 500;
  }
};

// 高级缓存管理
class AdvancedCache {
  private cache = new Map<string, { 
    data: any; 
    timestamp: number; 
    ttl: number;
    tags: string[];
  }>();

  set(key: string, data: any, ttl: number = 300000, tags: string[] = []) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      tags
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  // 根据标签清除缓存
  clearByTag(tag: string) {
    for (const [key, item] of this.cache.entries()) {
      if (item.tags.includes(tag)) {
        this.cache.delete(key);
      }
    }
  }

  // 清除过期缓存
  clearExpired() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  // 获取缓存统计信息
  getStats() {
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;

    for (const item of this.cache.values()) {
      if (now - item.timestamp > item.ttl) {
        expiredCount++;
      } else {
        validCount++;
      }
    }

    return {
      total: this.cache.size,
      valid: validCount,
      expired: expiredCount
    };
  }
}

const advancedCache = new AdvancedCache();

// 请求拦截器接口
interface RequestInterceptor {
  onRequest?: (config: RequestInit & { url?: string }) => RequestInit | Promise<RequestInit>;
  onResponse?: (response: Response, config: any) => Response | Promise<Response>;
  onError?: (error: any, config: any) => any;
}

// 增强的API客户端
class EnhancedAPIClient {
  private interceptors: RequestInterceptor[] = [];
  private requestQueue: Map<string, Promise<any>> = new Map();

  addInterceptor(interceptor: RequestInterceptor) {
    this.interceptors.push(interceptor);
  }

  removeInterceptor(interceptor: RequestInterceptor) {
    const index = this.interceptors.indexOf(interceptor);
    if (index > -1) {
      this.interceptors.splice(index, 1);
    }
  }

  // 防重复请求
  private async deduplicateRequest<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key);
    }

    const promise = requestFn().finally(() => {
      this.requestQueue.delete(key);
    });

    this.requestQueue.set(key, promise);
    return promise;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    config: {
      cache?: boolean;
      cacheTTL?: number;
      cacheTags?: string[];
      retry?: Partial<RetryConfig>;
      timeout?: number;
      deduplicate?: boolean;
    } = {}
  ): Promise<T> {
    const {
      cache = false,
      cacheTTL = 300000,
      cacheTags = [],
      retry = {},
      timeout = 10000,
      deduplicate = true
    } = config;

    const requestKey = `${options.method || 'GET'}:${endpoint}:${JSON.stringify(options.body)}`;
    
    if (deduplicate) {
      return this.deduplicateRequest(requestKey, () => 
        this.executeRequest<T>(endpoint, options, {
          cache,
          cacheTTL,
          cacheTags,
          retry,
          timeout
        })
      );
    }

    return this.executeRequest<T>(endpoint, options, {
      cache,
      cacheTTL,
      cacheTags,
      retry,
      timeout
    });
  }

  private async executeRequest<T>(
    endpoint: string,
    options: RequestInit,
    config: {
      cache: boolean;
      cacheTTL: number;
      cacheTags: string[];
      retry: Partial<RetryConfig>;
      timeout: number;
    }
  ): Promise<T> {
    const cacheKey = config.cache ? `${endpoint}:${JSON.stringify(options)}` : null;
    
    // 检查缓存
    if (cacheKey) {
      const cachedData = advancedCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    const retryConfig = { ...defaultRetryConfig, ...config.retry };
    let lastError: any;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        const result = await this.performRequest<T>(endpoint, options, config.timeout);
        
        // 缓存成功的响应
        if (cacheKey && result) {
          advancedCache.set(cacheKey, result, config.cacheTTL, config.cacheTags);
        }
        
        return result;
      } catch (error) {
        lastError = error;
        
        // 应用错误拦截器
        const processedError = await this.applyErrorInterceptors(error, { endpoint, options });
        
        // 检查是否应该重试
        if (
          attempt < retryConfig.maxRetries &&
          retryConfig.retryCondition &&
          retryConfig.retryCondition(processedError)
        ) {
          // 指数退避重试
          const delay = retryConfig.retryDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw processedError;
      }
    }

    throw lastError;
  }

  private async performRequest<T>(
    endpoint: string,
    options: RequestInit,
    timeout: number
  ): Promise<T> {
    // 应用请求拦截器
    let finalOptions = await this.applyRequestInterceptors({ ...options, url: endpoint });

    // 使用原有的apiClient进行实际请求
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // 这里我们复用现有的apiClient逻辑
      const method = (finalOptions.method || 'GET').toLowerCase();
      let result: T;

      switch (method) {
        case 'get':
          result = await apiClient.get<T>(endpoint);
          break;
        case 'post':
          result = await apiClient.post<T>(endpoint, finalOptions.body ? JSON.parse(finalOptions.body as string) : undefined);
          break;
        case 'put':
          result = await apiClient.put<T>(endpoint, finalOptions.body ? JSON.parse(finalOptions.body as string) : undefined);
          break;
        case 'delete':
          result = await apiClient.delete<T>(endpoint);
          break;
        default:
          throw new APIError(`Unsupported method: ${method}`, 400, 'UNSUPPORTED_METHOD');
      }

      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, 'TIMEOUT');
      }
      
      throw error;
    }
  }

  private async applyRequestInterceptors(config: RequestInit & { url?: string }): Promise<RequestInit> {
    let finalConfig = config;
    for (const interceptor of this.interceptors) {
      if (interceptor.onRequest) {
        finalConfig = await interceptor.onRequest(finalConfig);
      }
    }
    return finalConfig;
  }

  private async applyErrorInterceptors(error: any, config: any): Promise<any> {
    let finalError = error;
    for (const interceptor of this.interceptors) {
      if (interceptor.onError) {
        finalError = await interceptor.onError(finalError, config);
      }
    }
    return finalError;
  }

  // 批量请求
  async batch<T>(requests: Array<{
    endpoint: string;
    options?: RequestInit;
    config?: any;
  }>): Promise<Array<T | Error>> {
    const promises = requests.map(({ endpoint, options, config }) =>
      this.request<T>(endpoint, options, config).catch(error => error)
    );

    return Promise.all(promises);
  }

  // 并发控制请求
  async requestWithConcurrency<T>(
    requests: Array<{
      endpoint: string;
      options?: RequestInit;
      config?: any;
    }>,
    concurrency: number = 5
  ): Promise<Array<T | Error>> {
    const results: Array<T | Error> = [];
    
    for (let i = 0; i < requests.length; i += concurrency) {
      const batch = requests.slice(i, i + concurrency);
      const batchResults = await this.batch<T>(batch);
      results.push(...batchResults);
    }

    return results;
  }
}

// 创建增强的API客户端实例
const enhancedApiClient = new EnhancedAPIClient();

// 添加默认拦截器
enhancedApiClient.addInterceptor({
  onRequest: async (config) => {
    // 添加认证头
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    // 添加请求ID用于追踪
    config.headers = {
      ...config.headers,
      'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    return config;
  },
  onError: async (error, config) => {
    // 统一错误处理和日志记录
    console.error('Enhanced API Error:', {
      error,
      config,
      timestamp: new Date().toISOString(),
    });
    
    // 认证错误处理
    if (error.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // 可以触发全局事件通知应用
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
    }
    
    return error;
  }
});

// 性能监控
class PerformanceMonitor {
  private metrics: Map<string, {
    count: number;
    totalTime: number;
    avgTime: number;
    errors: number;
  }> = new Map();

  recordRequest(endpoint: string, duration: number, success: boolean) {
    const current = this.metrics.get(endpoint) || {
      count: 0,
      totalTime: 0,
      avgTime: 0,
      errors: 0
    };

    current.count++;
    current.totalTime += duration;
    current.avgTime = current.totalTime / current.count;
    
    if (!success) {
      current.errors++;
    }

    this.metrics.set(endpoint, current);
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  clearMetrics() {
    this.metrics.clear();
  }
}

const performanceMonitor = new PerformanceMonitor();

// 添加性能监控拦截器
enhancedApiClient.addInterceptor({
  onRequest: async (config) => {
    (config as any)._startTime = Date.now();
    return config;
  },
  onResponse: async (response, config) => {
    const duration = Date.now() - (config._startTime || 0);
    performanceMonitor.recordRequest(config.url || 'unknown', duration, response.ok);
    return response;
  },
  onError: async (error, config) => {
    const duration = Date.now() - (config._startTime || 0);
    performanceMonitor.recordRequest(config.url || 'unknown', duration, false);
    return error;
  }
});

// 导出增强的API服务
export const enhancedApi = {
  // 基础请求方法
  request: <T>(endpoint: string, options?: RequestInit, config?: any) => 
    enhancedApiClient.request<T>(endpoint, options, config),
  
  // 便捷方法
  get: <T>(endpoint: string, config?: any) => 
    enhancedApiClient.request<T>(endpoint, { method: 'GET' }, { 
      cache: true, 
      cacheTags: ['get'], 
      ...config 
    }),
  
  post: <T>(endpoint: string, data?: any, config?: any) => 
    enhancedApiClient.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, { cacheTags: ['post'], ...config }),
  
  put: <T>(endpoint: string, data?: any, config?: any) => 
    enhancedApiClient.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, { cacheTags: ['put'], ...config }),
  
  delete: <T>(endpoint: string, config?: any) => 
    enhancedApiClient.request<T>(endpoint, { method: 'DELETE' }, { 
      cacheTags: ['delete'], 
      ...config 
    }),
  
  // 批量请求
  batch: <T>(requests: Array<{ endpoint: string; options?: RequestInit; config?: any }>) =>
    enhancedApiClient.batch<T>(requests),
  
  // 并发控制请求
  requestWithConcurrency: <T>(
    requests: Array<{ endpoint: string; options?: RequestInit; config?: any }>,
    concurrency?: number
  ) => enhancedApiClient.requestWithConcurrency<T>(requests, concurrency),
  
  // 缓存管理
  cache: {
    clear: () => advancedCache.clear(),
    clearByTag: (tag: string) => advancedCache.clearByTag(tag),
    clearExpired: () => advancedCache.clearExpired(),
    delete: (key: string) => advancedCache.delete(key),
    getStats: () => advancedCache.getStats(),
  },
  
  // 性能监控
  performance: {
    getMetrics: () => performanceMonitor.getMetrics(),
    clearMetrics: () => performanceMonitor.clearMetrics(),
  },
  
  // 拦截器管理
  addInterceptor: (interceptor: RequestInterceptor) => enhancedApiClient.addInterceptor(interceptor),
  removeInterceptor: (interceptor: RequestInterceptor) => enhancedApiClient.removeInterceptor(interceptor),
};

// 健康检查
export const healthCheck = {
  async checkAPI(): Promise<{ status: 'healthy' | 'unhealthy'; details: any }> {
    try {
      const startTime = Date.now();
      await enhancedApi.get('/health', { timeout: 5000 });
      const responseTime = Date.now() - startTime;
      
      return {
        status: 'healthy',
        details: {
          responseTime,
          timestamp: new Date().toISOString(),
          cache: enhancedApi.cache.getStats(),
          performance: enhancedApi.performance.getMetrics()
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: error.message,
          timestamp: new Date().toISOString(),
        }
      };
    }
  }
};

// 自动清理过期缓存
if (typeof window !== 'undefined') {
  setInterval(() => {
    advancedCache.clearExpired();
  }, 60000); // 每分钟清理一次
}

export default enhancedApi;