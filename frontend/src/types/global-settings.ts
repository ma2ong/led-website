import { MediaFile } from '@/lib/media'

export interface GlobalSettings {
  id: number
  siteName: string
  siteDescription?: string
  siteKeywords?: string
  
  // Media
  logo?: MediaFile
  favicon?: MediaFile
  
  // Contact Information
  contactInfo?: ContactInfo
  
  // Social Media
  socialMedia?: SocialMedia
  
  // Company Information
  companyInfo?: CompanyInfo
  
  // Navigation
  headerMenu?: MenuItem[]
  footerMenu?: MenuItem[]
  footerContent?: string
  
  // Analytics and Custom Code
  analyticsCode?: string
  customCSS?: string
  customJS?: string
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

export interface ContactInfo {
  phone?: string
  email?: string
  address?: string
  workingHours?: string
  fax?: string
  whatsapp?: string
  wechat?: string
  qq?: string
}

export interface SocialMedia {
  facebook?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  instagram?: string
  wechat?: string
  weibo?: string
  tiktok?: string
}

export interface CompanyInfo {
  fullName?: string
  shortName?: string
  establishedYear?: number
  registrationNumber?: string
  taxNumber?: string
  legalAddress?: string
  businessScope?: string
  certifications?: string[]
  awards?: string[]
}

export interface MenuItem {
  id: string
  label: string
  url: string
  target?: '_blank' | '_self'
  children?: MenuItem[]
  icon?: string
  description?: string
  order: number
  isActive: boolean
}

// Default contact info structure
export const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+86-755-12345678',
  email: 'info@lianjin-led.com',
  address: '深圳市宝安区某某工业园',
  workingHours: '周一至周五 9:00-18:00',
}

// Default social media structure
export const DEFAULT_SOCIAL_MEDIA: SocialMedia = {
  facebook: '',
  twitter: '',
  linkedin: '',
  youtube: '',
  instagram: '',
  wechat: '',
  weibo: '',
}

// Default company info structure
export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  fullName: '深圳市联进光电有限公司',
  shortName: '联进LED',
  establishedYear: 2010,
  businessScope: 'LED显示屏研发、生产、销售',
  certifications: ['ISO9001', 'CE', 'FCC', 'RoHS'],
}

// Helper functions
export function formatContactInfo(contactInfo?: ContactInfo): ContactInfo {
  return {
    ...DEFAULT_CONTACT_INFO,
    ...contactInfo
  }
}

export function formatSocialMedia(socialMedia?: SocialMedia): SocialMedia {
  return {
    ...DEFAULT_SOCIAL_MEDIA,
    ...socialMedia
  }
}

export function formatCompanyInfo(companyInfo?: CompanyInfo): CompanyInfo {
  return {
    ...DEFAULT_COMPANY_INFO,
    ...companyInfo
  }
}

// Menu item helpers
export function createMenuItem(
  label: string, 
  url: string, 
  options: Partial<MenuItem> = {}
): MenuItem {
  return {
    id: Math.random().toString(36).substr(2, 9),
    label,
    url,
    target: '_self',
    children: [],
    order: 0,
    isActive: true,
    ...options
  }
}

export function sortMenuItems(items: MenuItem[]): MenuItem[] {
  return items
    .filter(item => item.isActive)
    .sort((a, b) => a.order - b.order)
    .map(item => ({
      ...item,
      children: item.children ? sortMenuItems(item.children) : []
    }))
}

export function findMenuItem(items: MenuItem[], id: string): MenuItem | null {
  for (const item of items) {
    if (item.id === id) {
      return item
    }
    if (item.children) {
      const found = findMenuItem(item.children, id)
      if (found) return found
    }
  }
  return null
}