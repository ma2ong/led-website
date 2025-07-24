import { MediaFile } from '@/lib/media'

export interface ProductSpecification {
  id: number
  name: string
  value: string
  unit?: string
  category: 'display' | 'physical' | 'electrical' | 'environmental' | 'control' | 'other'
  order: number
  isHighlighted: boolean
}

export interface Product {
  id: number
  name: string
  slug: string
  description?: string
  shortDescription?: string
  category: 'outdoor' | 'indoor' | 'rental' | 'creative' | 'transparent' | 'fine-pitch' | 'poster' | 'all-in-one'
  categoryInfo?: ProductCategory
  
  // Technical specifications
  technicalSpecs?: Record<string, string | number | boolean>
  specifications?: ProductSpecification[]
  features?: any[]
  applications?: any[]
  advantages?: string[]
  
  // LED specific fields
  modelNumber?: string
  pixelPitch?: string
  resolution?: string
  brightness?: string
  refreshRate?: string
  viewingAngle?: string
  powerConsumption?: string
  operatingTemperature?: string
  ipRating?: string
  lifespan?: string
  warranty?: string
  certifications?: string[]
  
  // Media
  mainImage?: MediaFile
  images?: MediaFile[]
  documents?: MediaFile[]
  
  // Business fields
  price?: number
  discountPrice?: number
  formattedPrice?: string
  isActive?: boolean
  isFeatured?: boolean
  inStock?: boolean
  sortOrder?: number
  
  // SEO
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  
  // Relations
  case_studies?: Array<{
    id: number
    title: string
    slug: string
    shortDescription?: string
    industry?: string
    location?: string
    mainImage?: MediaFile
  }>
  
  // Timestamps
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface ProductCategory {
  key: string
  name: string
  description?: string
  icon?: string
}

export interface ProductStats {
  total: number
  byCategory: Record<string, number>
  featured: number
  active: number
}

export interface ProductSearchParams {
  q?: string
  category?: string
  featured?: boolean
  locale?: string
  page?: number
  pageSize?: number
  sort?: string
}

export interface ProductComparisonData {
  products: Product[]
  specifications: {
    category: string
    specs: {
      name: string
      values: Record<string, string>
    }[]
  }[]
}

// Product categories configuration
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    key: 'outdoor',
    name: '户外显示屏',
    description: '适用于户外环境的高亮度LED显示屏',
    icon: '🌞'
  },
  {
    key: 'indoor',
    name: '室内显示屏',
    description: '适用于室内环境的高清LED显示屏',
    icon: '🏢'
  },
  {
    key: 'rental',
    name: '租赁显示屏',
    description: '便于安装拆卸的租赁用LED显示屏',
    icon: '🎪'
  },
  {
    key: 'creative',
    name: '创意显示屏',
    description: '异形创意LED显示屏解决方案',
    icon: '🎨'
  },
  {
    key: 'transparent',
    name: '透明显示屏',
    description: '高透明度LED显示屏',
    icon: '💎'
  },
  {
    key: 'fine-pitch',
    name: '小间距显示屏',
    description: '超高清小间距LED显示屏',
    icon: '🔍'
  },
  {
    key: 'poster',
    name: '海报屏',
    description: '轻薄便携的LED海报显示屏',
    icon: '📋'
  },
  {
    key: 'all-in-one',
    name: '一体机',
    description: '集成化LED显示一体机',
    icon: '📺'
  }
]

// Get category info by key
export function getCategoryInfo(categoryKey: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find(cat => cat.key === categoryKey)
}

// Format technical specifications for display
export function formatTechnicalSpecs(specs: ProductSpecification[]): Record<string, ProductSpecification[]> {
  const grouped: Record<string, ProductSpecification[]> = {}
  
  specs
    .sort((a, b) => a.order - b.order)
    .forEach(spec => {
      if (!grouped[spec.category]) {
        grouped[spec.category] = []
      }
      grouped[spec.category].push(spec)
    })
  
  return grouped
}

// Format specification value with unit
export function formatSpecValue(spec: ProductSpecification): string {
  return spec.unit ? `${spec.value} ${spec.unit}` : spec.value
}