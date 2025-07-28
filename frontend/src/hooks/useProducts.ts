import { useQuery } from '@tanstack/react-query';
import { productService, type Product, getImageUrl, getLocalizedContent } from '@/services/api';

// 查询键工厂
const queryKeys = {
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    categories: () => [...queryKeys.products.all, 'categories'] as const,
  },
};

// 获取所有产品
export function useProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.products.list(params || {}),
    queryFn: () => productService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
}

// 获取单个产品
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productService.getProduct(parseInt(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
}

// 按分类获取产品
export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.products.list({ category }),
    queryFn: () => productService.getProducts({ category }),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

// 获取特色产品
export function useFeaturedProducts(limit: number = 8) {
  return useQuery({
    queryKey: queryKeys.products.list({ pageSize: limit }),
    queryFn: () => productService.getProducts({ pageSize: limit }),
    staleTime: 10 * 60 * 1000,
  });
}

// 产品分类常量
export const PRODUCT_CATEGORIES = {
  FINE_PITCH: 'fine-pitch',
  RENTAL: 'rental',
  OUTDOOR: 'outdoor',
  CREATIVE: 'creative',
  TRANSPARENT: 'transparent',
  ALL_IN_ONE: 'all-in-one',
  POSTER: 'poster',
  ENERGY_SAVING: 'energy-saving',
} as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];

// 产品分类映射
export const CATEGORY_LABELS = {
  [PRODUCT_CATEGORIES.FINE_PITCH]: {
    zh: '小间距显示屏',
    en: 'Fine Pitch LED Display',
    icon: '📺',
    color: 'from-blue-600 to-blue-800',
  },
  [PRODUCT_CATEGORIES.RENTAL]: {
    zh: '租赁显示屏',
    en: 'Rental LED Display',
    icon: '🎭',
    color: 'from-purple-600 to-purple-800',
  },
  [PRODUCT_CATEGORIES.OUTDOOR]: {
    zh: '户外显示屏',
    en: 'Outdoor LED Display',
    icon: '🏢',
    color: 'from-green-600 to-green-800',
  },
  [PRODUCT_CATEGORIES.CREATIVE]: {
    zh: '创意显示屏',
    en: 'Creative LED Display',
    icon: '✨',
    color: 'from-pink-600 to-pink-800',
  },
  [PRODUCT_CATEGORIES.TRANSPARENT]: {
    zh: '透明显示屏',
    en: 'Transparent LED Display',
    icon: '🔮',
    color: 'from-indigo-600 to-indigo-800',
  },
  [PRODUCT_CATEGORIES.ALL_IN_ONE]: {
    zh: '会议一体机',
    en: 'All-in-One Display',
    icon: '💼',
    color: 'from-teal-600 to-teal-800',
  },
  [PRODUCT_CATEGORIES.POSTER]: {
    zh: 'LED广告机',
    en: 'Poster LED Display',
    icon: '📱',
    color: 'from-red-600 to-red-800',
  },
  [PRODUCT_CATEGORIES.ENERGY_SAVING]: {
    zh: '节能显示屏',
    en: 'Energy-Saving Display',
    icon: '🌱',
    color: 'from-yellow-600 to-yellow-800',
  },
};

// 获取产品分类标签
export function getCategoryLabel(category: ProductCategory, language: 'zh' | 'en' = 'zh') {
  return CATEGORY_LABELS[category]?.[language] || category;
}

// 获取产品分类图标
export function getCategoryIcon(category: ProductCategory) {
  return CATEGORY_LABELS[category]?.icon || '📺';
}

// 获取产品分类颜色
export function getCategoryColor(category: ProductCategory) {
  return CATEGORY_LABELS[category]?.color || 'from-gray-600 to-gray-800';
}

// 产品工具函数
export const productUtils = {
  // 获取产品主图
  getMainImage: (product: Product) => {
    const images = product.attributes.images?.data;
    if (!images || images.length === 0) return null;
    return getImageUrl({ data: images[0] });
  },

  // 获取产品所有图片
  getAllImages: (product: Product) => {
    const images = product.attributes.images?.data;
    if (!images) return [];
    return images.map(img => ({
      url: getImageUrl({ data: img }),
      alt: img.attributes.alternativeText || product.attributes.name,
      width: img.attributes.width,
      height: img.attributes.height,
    }));
  },

  // 获取本地化名称
  getLocalizedName: (product: Product, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(product.attributes, 'name', language);
  },

  // 获取本地化描述
  getLocalizedDescription: (product: Product, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(product.attributes, 'description', language);
  },

  // 获取产品规格
  getSpecifications: (product: Product) => {
    return product.attributes.specifications || {};
  },
};