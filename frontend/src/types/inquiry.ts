import { MediaFile } from '@/lib/media'

export interface Inquiry {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  subject: string
  message: string
  
  // Product and Project Info
  productInterest?: ProductInterest
  projectBudget?: ProjectBudget
  projectTimeline?: ProjectTimeline
  
  // Management Fields
  status: InquiryStatus
  priority: InquiryPriority
  assignedTo?: string
  notes?: string
  followUpDate?: string
  
  // Source and Tracking
  source: InquirySource
  ipAddress?: string
  userAgent?: string
  
  // Attachments
  attachments?: MediaFile[]
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

export type ProductInterest = 
  | 'outdoor'
  | 'indoor' 
  | 'rental'
  | 'creative'
  | 'transparent'
  | 'fine-pitch'
  | 'poster'
  | 'all-in-one'
  | 'other'

export type ProjectBudget = 
  | 'under-10k'
  | '10k-50k'
  | '50k-100k'
  | '100k-500k'
  | 'over-500k'
  | 'not-specified'

export type ProjectTimeline = 
  | 'immediate'
  | '1-3-months'
  | '3-6-months'
  | '6-12-months'
  | 'over-1-year'
  | 'not-specified'

export type InquiryStatus = 
  | 'new'
  | 'contacted'
  | 'in-progress'
  | 'quoted'
  | 'closed-won'
  | 'closed-lost'
  | 'spam'

export type InquiryPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent'

export type InquirySource = 
  | 'website'
  | 'email'
  | 'phone'
  | 'exhibition'
  | 'referral'
  | 'social-media'
  | 'other'

export interface InquiryStats {
  total: number
  byStatus: Record<string, number>
  byPriority: Record<string, number>
  byProductInterest: Record<string, number>
  bySource: Record<string, number>
  thisMonth: number
  thisWeek: number
  conversionRate: number
}

export interface InquiryFormData {
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  subject: string
  message: string
  productInterest?: ProductInterest
  projectBudget?: ProjectBudget
  projectTimeline?: ProjectTimeline
  attachments?: File[]
}

export interface InquiryValidationResult {
  isValid: boolean
  errors: string[]
}

// Product interest options
export const PRODUCT_INTEREST_OPTIONS = [
  { value: 'outdoor', label: '户外显示屏', icon: '🌞' },
  { value: 'indoor', label: '室内显示屏', icon: '🏢' },
  { value: 'rental', label: '租赁显示屏', icon: '🎪' },
  { value: 'creative', label: '创意显示屏', icon: '🎨' },
  { value: 'transparent', label: '透明显示屏', icon: '💎' },
  { value: 'fine-pitch', label: '小间距显示屏', icon: '🔍' },
  { value: 'poster', label: '海报屏', icon: '📋' },
  { value: 'all-in-one', label: '一体机', icon: '📺' },
  { value: 'other', label: '其他', icon: '❓' }
]

// Project budget options
export const PROJECT_BUDGET_OPTIONS = [
  { value: 'under-10k', label: '1万以下', range: '< ¥10,000' },
  { value: '10k-50k', label: '1-5万', range: '¥10,000 - ¥50,000' },
  { value: '50k-100k', label: '5-10万', range: '¥50,000 - ¥100,000' },
  { value: '100k-500k', label: '10-50万', range: '¥100,000 - ¥500,000' },
  { value: 'over-500k', label: '50万以上', range: '> ¥500,000' },
  { value: 'not-specified', label: '待定', range: 'To be determined' }
]

// Project timeline options
export const PROJECT_TIMELINE_OPTIONS = [
  { value: 'immediate', label: '立即', description: '需要立即开始' },
  { value: '1-3-months', label: '1-3个月', description: '1-3个月内开始' },
  { value: '3-6-months', label: '3-6个月', description: '3-6个月内开始' },
  { value: '6-12-months', label: '6-12个月', description: '6-12个月内开始' },
  { value: 'over-1-year', label: '1年以上', description: '1年以上开始' },
  { value: 'not-specified', label: '待定', description: '时间待定' }
]

// Inquiry status options
export const INQUIRY_STATUS_OPTIONS = [
  { value: 'new', label: '新询盘', color: 'blue', icon: '🆕' },
  { value: 'contacted', label: '已联系', color: 'yellow', icon: '📞' },
  { value: 'in-progress', label: '进行中', color: 'orange', icon: '⏳' },
  { value: 'quoted', label: '已报价', color: 'purple', icon: '💰' },
  { value: 'closed-won', label: '成交', color: 'green', icon: '✅' },
  { value: 'closed-lost', label: '失单', color: 'red', icon: '❌' },
  { value: 'spam', label: '垃圾信息', color: 'gray', icon: '🚫' }
]

// Inquiry priority options
export const INQUIRY_PRIORITY_OPTIONS = [
  { value: 'low', label: '低', color: 'gray', icon: '⬇️' },
  { value: 'medium', label: '中', color: 'blue', icon: '➡️' },
  { value: 'high', label: '高', color: 'orange', icon: '⬆️' },
  { value: 'urgent', label: '紧急', color: 'red', icon: '🚨' }
]

// Inquiry source options
export const INQUIRY_SOURCE_OPTIONS = [
  { value: 'website', label: '官网', icon: '🌐' },
  { value: 'email', label: '邮件', icon: '📧' },
  { value: 'phone', label: '电话', icon: '📞' },
  { value: 'exhibition', label: '展会', icon: '🏢' },
  { value: 'referral', label: '推荐', icon: '👥' },
  { value: 'social-media', label: '社交媒体', icon: '📱' },
  { value: 'other', label: '其他', icon: '❓' }
]

// Helper functions
export function getProductInterestInfo(value: ProductInterest) {
  return PRODUCT_INTEREST_OPTIONS.find(option => option.value === value)
}

export function getProjectBudgetInfo(value: ProjectBudget) {
  return PROJECT_BUDGET_OPTIONS.find(option => option.value === value)
}

export function getProjectTimelineInfo(value: ProjectTimeline) {
  return PROJECT_TIMELINE_OPTIONS.find(option => option.value === value)
}

export function getInquiryStatusInfo(value: InquiryStatus) {
  return INQUIRY_STATUS_OPTIONS.find(option => option.value === value)
}

export function getInquiryPriorityInfo(value: InquiryPriority) {
  return INQUIRY_PRIORITY_OPTIONS.find(option => option.value === value)
}

export function getInquirySourceInfo(value: InquirySource) {
  return INQUIRY_SOURCE_OPTIONS.find(option => option.value === value)
}

// Validation function
export function validateInquiryForm(data: InquiryFormData): InquiryValidationResult {
  const errors: string[] = []

  // Required fields
  if (!data.name?.trim()) {
    errors.push('姓名是必填项')
  }

  if (!data.email?.trim()) {
    errors.push('邮箱是必填项')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('邮箱格式不正确')
  }

  if (!data.subject?.trim()) {
    errors.push('主题是必填项')
  }

  if (!data.message?.trim()) {
    errors.push('消息内容是必填项')
  }

  // Length validation
  if (data.name && data.name.length > 100) {
    errors.push('姓名不能超过100个字符')
  }

  if (data.subject && data.subject.length > 200) {
    errors.push('主题不能超过200个字符')
  }

  if (data.message && data.message.length > 2000) {
    errors.push('消息内容不能超过2000个字符')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}