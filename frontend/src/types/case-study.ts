import { MediaFile } from '@/lib/media'

export interface CaseStudy {
  id: number
  title: string
  slug: string
  client: string
  location?: string
  industry: 'retail' | 'transportation' | 'entertainment' | 'corporate' | 'education' | 'healthcare' | 'government' | 'sports' | 'hospitality' | 'other'
  industryInfo?: IndustryInfo
  
  // Content
  challenge: string
  solution: string
  results: string
  summary?: string
  
  // Project details
  projectDate?: string
  projectValue?: number
  formattedProjectValue?: string
  formattedProjectDate?: string
  
  // Media
  mainImage?: MediaFile
  images?: MediaFile[]
  videos?: MediaFile[]
  
  // Business fields
  isActive?: boolean
  isFeatured?: boolean
  sortOrder?: number
  
  // SEO
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  
  // Relations
  products?: Array<{
    id: number
    name: string
    slug: string
    category: string
    modelNumber?: string
    pixelPitch?: string
    mainImage?: MediaFile
    isActive?: boolean
    isFeatured?: boolean
  }>
  
  // Computed fields
  readingTime?: number
  productCount?: number
  imageCount?: number
  videoCount?: number
  
  // Timestamps
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface IndustryInfo {
  name: string
  icon: string
  description: string
}

export interface CaseStudyStats {
  total: number
  byIndustry: Record<string, number>
  featured: number
  active: number
}

export interface CaseStudySearchParams {
  q?: string
  industry?: string
  featured?: boolean
  locale?: string
  page?: number
  pageSize?: number
  sort?: string
}

export interface CaseStudyMetrics {
  projectValue?: number
  formattedProjectValue?: string
  projectDate?: string
  formattedProjectDate?: string
  industry: string
  industryInfo: IndustryInfo
  location?: string
  client: string
  productCount: number
  imageCount: number
  videoCount: number
  readingTime: number
}

// Industry categories configuration
export const CASE_STUDY_INDUSTRIES: Record<string, IndustryInfo> = {
  'retail': { name: '零售', icon: '🛍️', description: '零售商业环境' },
  'transportation': { name: '交通运输', icon: '🚇', description: '交通运输枢纽' },
  'entertainment': { name: '娱乐', icon: '🎭', description: '娱乐休闲场所' },
  'corporate': { name: '企业', icon: '🏢', description: '企业办公环境' },
  'education': { name: '教育', icon: '🎓', description: '教育培训机构' },
  'healthcare': { name: '医疗', icon: '🏥', description: '医疗健康机构' },
  'government': { name: '政府', icon: '🏛️', description: '政府机关单位' },
  'sports': { name: '体育', icon: '⚽', description: '体育运动场馆' },
  'hospitality': { name: '酒店', icon: '🏨', description: '酒店餐饮服务' },
  'other': { name: '其他', icon: '📱', description: '其他行业' }
}

// Get industry info by key
export function getIndustryInfo(industryKey: string): IndustryInfo {
  return CASE_STUDY_INDUSTRIES[industryKey] || CASE_STUDY_INDUSTRIES['other']
}

// Format project value for display
export function formatProjectValue(value?: number): string | null {
  if (!value || value <= 0) return null
  
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Format project date for display
export function formatProjectDate(date?: string): string | null {
  if (!date) return null
  
  try {
    const projectDate = new Date(date)
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long'
    }).format(projectDate)
  } catch (error) {
    return null
  }
}

// Calculate reading time for case study content
export function calculateReadingTime(challenge: string, solution: string, results: string): number {
  const wordsPerMinute = 200 // Average reading speed
  
  // Remove HTML tags and count words
  const totalText = [challenge, solution, results]
    .filter(Boolean)
    .map(text => text.replace(/<[^>]*>/g, ''))
    .join(' ')
  
  const wordCount = totalText.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  
  return Math.max(1, readingTime) // Minimum 1 minute
}

// Create case study summary for list views
export function createCaseStudySummary(caseStudy: CaseStudy): Partial<CaseStudy> {
  return {
    id: caseStudy.id,
    title: caseStudy.title,
    slug: caseStudy.slug,
    client: caseStudy.client,
    location: caseStudy.location,
    industry: caseStudy.industry,
    industryInfo: caseStudy.industryInfo,
    summary: caseStudy.summary,
    projectDate: caseStudy.projectDate,
    formattedProjectDate: caseStudy.formattedProjectDate,
    projectValue: caseStudy.projectValue,
    formattedProjectValue: caseStudy.formattedProjectValue,
    mainImage: caseStudy.mainImage,
    isActive: caseStudy.isActive,
    isFeatured: caseStudy.isFeatured,
    readingTime: caseStudy.readingTime,
    productCount: caseStudy.productCount,
    createdAt: caseStudy.createdAt,
    publishedAt: caseStudy.publishedAt
  }
}

// Extract key metrics from case study
export function extractKeyMetrics(caseStudy: CaseStudy): CaseStudyMetrics {
  return {
    projectValue: caseStudy.projectValue,
    formattedProjectValue: caseStudy.formattedProjectValue,
    projectDate: caseStudy.projectDate,
    formattedProjectDate: caseStudy.formattedProjectDate,
    industry: caseStudy.industry,
    industryInfo: caseStudy.industryInfo || getIndustryInfo(caseStudy.industry),
    location: caseStudy.location,
    client: caseStudy.client,
    productCount: caseStudy.productCount || (caseStudy.products?.length || 0),
    imageCount: caseStudy.imageCount || (caseStudy.images?.length || 0),
    videoCount: caseStudy.videoCount || (caseStudy.videos?.length || 0),
    readingTime: caseStudy.readingTime || calculateReadingTime(caseStudy.challenge, caseStudy.solution, caseStudy.results)
  }
}