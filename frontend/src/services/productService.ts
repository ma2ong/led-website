// 增强的产品数据管理服务
import { enhancedApi } from './apiEnhanced';
import { productService, Product, ApiResponse } from './api';

// 扩展的产品类型定义
export interface EnhancedProduct extends Product {
  // 计算属性
  displayName?: string;
  displayDescription?: string;
  primaryImage?: string;
  categoryLabel?: string;
  priceRange?: string;
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order';
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  relatedProducts?: Product[];
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  specifications: Record<string, any>;
  images: string[];
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
}

export interface ProductFilter {
  category?: string;
  priceRange?: [number, number];
  availability?: string;
  tags?: string[];
  rating?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'created' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductSearchResult {
  products: EnhancedProduct[];
  total: number;
  facets: {
    categories: Array<{ name: string; count: number }>;
    priceRanges: Array<{ range: [number, number]; count: number }>;
    tags: Array<{ name: string; count: number }>;
    availability: Array<{ status: string; count: number }>;
  };
  suggestions?: string[];
}

// 产品缓存管理
class ProductCache {
  private static instance: ProductCache;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly DEFAULT_TTL = 10 * 60 * 1000; // 10分钟

  static getInstance(): ProductCache {
    if (!ProductCache.instance) {
      ProductCache.instance = new ProductCache();
    }
    return ProductCache.instance;
  }

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
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

  invalidate(pattern?: string) {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

const productCache = ProductCache.getInstance();

// 增强的产品服务
export class EnhancedProductService {
  private readonly CACHE_KEYS = {
    PRODUCTS: 'products',
    PRODUCT: 'product',
    CATEGORIES: 'categories',
    SEARCH: 'search',
    RELATED: 'related',
    POPULAR: 'popular',
    FEATURED: 'featured'
  };

  // 获取产品列表（带缓存和增强功能）
  async getProducts(params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    populate?: string;
    filters?: ProductFilter;
  }): Promise<ApiResponse<EnhancedProduct[]>> {
    const cacheKey = `${this.CACHE_KEYS.PRODUCTS}:${JSON.stringify(params)}`;
    const cached = productCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // 使用原有的产品服务获取数据
      const response = await productService.getProducts(params);
      
      // 增强产品数据
      const enhancedProducts = response.data.map(product => this.enhanceProduct(product));
      
      const enhancedResponse = {
        ...response,
        data: enhancedProducts
      };

      // 缓存结果
      productCache.set(cacheKey, enhancedResponse);
      
      return enhancedResponse;
    } catch (error) {
      console.error('获取产品列表失败:', error);
      throw error;
    }
  }

  // 获取单个产品（带缓存和相关产品）
  async getProduct(id: number, options?: {
    includeRelated?: boolean;
    includeVariants?: boolean;
  }): Promise<ApiResponse<EnhancedProduct>> {
    const cacheKey = `${this.CACHE_KEYS.PRODUCT}:${id}:${JSON.stringify(options)}`;
    const cached = productCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await productService.getProduct(id);
      const enhancedProduct = this.enhanceProduct(response.data);

      // 获取相关产品
      if (options?.includeRelated) {
        enhancedProduct.relatedProducts = await this.getRelatedProducts(enhancedProduct);
      }

      // 获取产品变体
      if (options?.includeVariants) {
        enhancedProduct.variants = await this.getProductVariants(id);
      }

      const enhancedResponse = {
        ...response,
        data: enhancedProduct
      };

      productCache.set(cacheKey, enhancedResponse);
      
      return enhancedResponse;
    } catch (error) {
      console.error('获取产品详情失败:', error);
      throw error;
    }
  }

  // 高级产品搜索
  async searchProducts(
    query: string,
    filters?: ProductFilter,
    options?: {
      includeFacets?: boolean;
      includeSuggestions?: boolean;
      page?: number;
      pageSize?: number;
    }
  ): Promise<ProductSearchResult> {
    const cacheKey = `${this.CACHE_KEYS.SEARCH}:${query}:${JSON.stringify(filters)}:${JSON.stringify(options)}`;
    const cached = productCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // 构建搜索参数
      const searchParams = this.buildSearchParams(query, filters, options);
      
      // 执行搜索
      const response = await enhancedApi.get<ApiResponse<Product[]>>(
        `/products/search?${searchParams.toString()}`,
        { 
          cache: true, 
          cacheTTL: 5 * 60 * 1000, // 5分钟缓存
          cacheTags: ['products', 'search']
        }
      );

      // 增强搜索结果
      const enhancedProducts = response.data.map(product => this.enhanceProduct(product));
      
      const searchResult: ProductSearchResult = {
        products: enhancedProducts,
        total: response.meta?.pagination?.total || enhancedProducts.length,
        facets: {
          categories: [],
          priceRanges: [],
          tags: [],
          availability: []
        }
      };

      // 如果需要，获取搜索面
      if (options?.includeFacets) {
        searchResult.facets = await this.getSearchFacets(query, filters);
      }

      // 如果需要，获取搜索建议
      if (options?.includeSuggestions) {
        searchResult.suggestions = await this.getSearchSuggestions(query);
      }

      productCache.set(cacheKey, searchResult, 5 * 60 * 1000); // 5分钟缓存
      
      return searchResult;
    } catch (error) {
      console.error('产品搜索失败:', error);
      throw error;
    }
  }

  // 获取产品分类
  async getCategories(): Promise<Array<{ name: string; label: string; count: number; children?: any[] }>> {
    const cacheKey = this.CACHE_KEYS.CATEGORIES;
    const cached = productCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await enhancedApi.get<any>('/products/categories', {
        cache: true,
        cacheTTL: 30 * 60 * 1000, // 30分钟缓存
        cacheTags: ['categories']
      });

      const categories = response.data || [
        { name: 'fine-pitch', label: '小间距显示屏', count: 0 },
        { name: 'outdoor', label: '户外显示屏', count: 0 },
        { name: 'rental', label: '租赁显示屏', count: 0 },
        { name: 'creative', label: '创意显示屏', count: 0 },
        { name: 'all-in-one', label: '会议一体机', count: 0 },
        { name: 'poster', label: 'LED广告机', count: 0 }
      ];

      productCache.set(cacheKey, categories, 30 * 60 * 1000);
      
      return categories;
    } catch (error) {
      console.error('获取产品分类失败:', error);
      // 返回默认分类
      return [
        { name: 'fine-pitch', label: '小间距显示屏', count: 0 },
        { name: 'outdoor', label: '户外显示屏', count: 0 },
        { name: 'rental', label: '租赁显示屏', count: 0 },
        { name: 'creative', label: '创意显示屏', count: 0 },
        { name: 'all-in-one', label: '会议一体机', count: 0 },
        { name: 'poster', label: 'LED广告机', count: 0 }
      ];
    }
  }

  // 获取热门产品
  async getPopularProducts(limit: number = 10): Promise<EnhancedProduct[]> {
    const cacheKey = `${this.CACHE_KEYS.POPULAR}:${limit}`;
    const cached = productCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await this.getProducts({
        pageSize: limit,
        // 这里可以添加排序逻辑，比如按销量或浏览量排序
      });

      const popularProducts = response.data.slice(0, limit);
      
      productCache.set(cacheKey, popularProducts, 15 * 60 * 1000); // 15分钟缓存
      
      return popularProducts;
    } catch (error) {
      console.error('获取热门产品失败:', error);
      return [];
    }
  }

  // 获取推荐产品
  async getFeaturedProducts(limit: number = 6): Promise<EnhancedProduct[]> {
    const cacheKey = `${this.CACHE_KEYS.FEATURED}:${limit}`;
    const cached = productCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      // 这里可以实现基于用户行为的推荐算法
      const response = await this.getProducts({
        pageSize: limit,
        // 添加推荐逻辑的参数
      });

      const featuredProducts = response.data.slice(0, limit);
      
      productCache.set(cacheKey, featuredProducts, 20 * 60 * 1000); // 20分钟缓存
      
      return featuredProducts;
    } catch (error) {
      console.error('获取推荐产品失败:', error);
      return [];
    }
  }

  // 产品比较
  async compareProducts(productIds: number[]): Promise<{
    products: EnhancedProduct[];
    comparison: Record<string, any[]>;
  }> {
    try {
      const products = await Promise.all(
        productIds.map(id => this.getProduct(id))
      );

      const enhancedProducts = products.map(p => p.data);
      
      // 构建比较表
      const comparison = this.buildComparisonTable(enhancedProducts);

      return {
        products: enhancedProducts,
        comparison
      };
    } catch (error) {
      console.error('产品比较失败:', error);
      throw error;
    }
  }

  // 私有方法：增强产品数据
  private enhanceProduct(product: Product): EnhancedProduct {
    const enhanced: EnhancedProduct = {
      ...product,
      displayName: product.attributes.name,
      displayDescription: product.attributes.description,
      primaryImage: this.getPrimaryImage(product),
      categoryLabel: this.getCategoryLabel(product.attributes.category),
      tags: this.extractTags(product),
      rating: this.calculateRating(product),
      reviewCount: this.getReviewCount(product)
    };

    return enhanced;
  }

  // 私有方法：获取相关产品
  private async getRelatedProducts(product: EnhancedProduct): Promise<Product[]> {
    try {
      const response = await this.getProducts({
        category: product.attributes.category,
        pageSize: 4
      });

      return response.data
        .filter(p => p.id !== product.id)
        .slice(0, 3);
    } catch (error) {
      console.error('获取相关产品失败:', error);
      return [];
    }
  }

  // 私有方法：获取产品变体
  private async getProductVariants(productId: number): Promise<ProductVariant[]> {
    try {
      const response = await enhancedApi.get<any>(`/products/${productId}/variants`);
      return response.data || [];
    } catch (error) {
      console.error('获取产品变体失败:', error);
      return [];
    }
  }

  // 私有方法：构建搜索参数
  private buildSearchParams(
    query: string,
    filters?: ProductFilter,
    options?: any
  ): URLSearchParams {
    const params = new URLSearchParams();
    
    if (query) {
      params.append('q', query);
    }

    if (filters?.category) {
      params.append('category', filters.category);
    }

    if (filters?.priceRange) {
      params.append('minPrice', filters.priceRange[0].toString());
      params.append('maxPrice', filters.priceRange[1].toString());
    }

    if (filters?.tags?.length) {
      filters.tags.forEach(tag => params.append('tags', tag));
    }

    if (filters?.sortBy) {
      params.append('sortBy', filters.sortBy);
      params.append('sortOrder', filters.sortOrder || 'asc');
    }

    if (options?.page) {
      params.append('page', options.page.toString());
    }

    if (options?.pageSize) {
      params.append('pageSize', options.pageSize.toString());
    }

    return params;
  }

  // 私有方法：获取搜索面
  private async getSearchFacets(query: string, filters?: ProductFilter): Promise<any> {
    try {
      const response = await enhancedApi.get<any>(`/products/search/facets?q=${query}`);
      return response.data || {
        categories: [],
        priceRanges: [],
        tags: [],
        availability: []
      };
    } catch (error) {
      console.error('获取搜索面失败:', error);
      return {
        categories: [],
        priceRanges: [],
        tags: [],
        availability: []
      };
    }
  }

  // 私有方法：获取搜索建议
  private async getSearchSuggestions(query: string): Promise<string[]> {
    try {
      const response = await enhancedApi.get<any>(`/products/search/suggestions?q=${query}`);
      return response.data || [];
    } catch (error) {
      console.error('获取搜索建议失败:', error);
      return [];
    }
  }

  // 私有方法：构建比较表
  private buildComparisonTable(products: EnhancedProduct[]): Record<string, any[]> {
    const comparison: Record<string, any[]> = {};
    
    // 基本信息
    comparison['名称'] = products.map(p => p.displayName);
    comparison['分类'] = products.map(p => p.categoryLabel);
    comparison['描述'] = products.map(p => p.displayDescription);
    
    // 规格参数
    const allSpecs = new Set<string>();
    products.forEach(p => {
      if (p.attributes.specifications) {
        Object.keys(p.attributes.specifications).forEach(key => allSpecs.add(key));
      }
    });

    allSpecs.forEach(spec => {
      comparison[spec] = products.map(p => 
        p.attributes.specifications?.[spec] || '-'
      );
    });

    return comparison;
  }

  // 工具方法
  private getPrimaryImage(product: Product): string {
    return product.attributes.images?.data?.[0]?.attributes?.url || '';
  }

  private getCategoryLabel(category: string): string {
    const categoryMap: Record<string, string> = {
      'fine-pitch': '小间距显示屏',
      'outdoor': '户外显示屏',
      'rental': '租赁显示屏',
      'creative': '创意显示屏',
      'all-in-one': '会议一体机',
      'poster': 'LED广告机'
    };
    return categoryMap[category] || category;
  }

  private extractTags(product: Product): string[] {
    // 从产品名称和描述中提取标签
    const text = `${product.attributes.name} ${product.attributes.description}`.toLowerCase();
    const tags: string[] = [];
    
    // 简单的标签提取逻辑
    if (text.includes('led')) tags.push('LED');
    if (text.includes('4k')) tags.push('4K');
    if (text.includes('高清')) tags.push('高清');
    if (text.includes('户外')) tags.push('户外');
    if (text.includes('室内')) tags.push('室内');
    
    return tags;
  }

  private calculateRating(product: Product): number {
    // 这里可以实现真实的评分计算逻辑
    return Math.random() * 2 + 3; // 3-5分随机评分
  }

  private getReviewCount(product: Product): number {
    // 这里可以实现真实的评论数量获取逻辑
    return Math.floor(Math.random() * 100);
  }

  // 缓存管理
  clearCache(pattern?: string) {
    productCache.invalidate(pattern);
  }
}

// 创建服务实例
export const enhancedProductService = new EnhancedProductService();

// 导出便捷方法
export const productAPI = {
  getProducts: (params?: any) => enhancedProductService.getProducts(params),
  getProduct: (id: number, options?: any) => enhancedProductService.getProduct(id, options),
  searchProducts: (query: string, filters?: ProductFilter, options?: any) => 
    enhancedProductService.searchProducts(query, filters, options),
  getCategories: () => enhancedProductService.getCategories(),
  getPopularProducts: (limit?: number) => enhancedProductService.getPopularProducts(limit),
  getFeaturedProducts: (limit?: number) => enhancedProductService.getFeaturedProducts(limit),
  compareProducts: (productIds: number[]) => enhancedProductService.compareProducts(productIds),
  clearCache: (pattern?: string) => enhancedProductService.clearCache(pattern)
};

export default enhancedProductService;