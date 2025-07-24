import { seoConfig, generatePageSeo } from './seo-config'
import { getAlternateLanguageUrls } from './i18n-utils'
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateProductSchema,
  generateArticleSchema,
  generateCaseStudySchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  type StructuredData
} from './structured-data'

export interface SEOData {
  title: string
  description: string
  keywords: string
  image: string
  url: string
  canonical: string
  alternateUrls: Record<string, string>
  structuredData: StructuredData[]
  openGraph: {
    type: 'website' | 'article' | 'product'
    title: string
    description: string
    image: string
    url: string
    siteName: string
    locale: string
  }
  twitter: {
    card: 'summary_large_image'
    title: string
    description: string
    image: string
    site: string
  }
}

export interface SEOOptions {
  pageType?: 'home' | 'products' | 'cases' | 'news' | 'about' | 'contact'
  title?: string
  description?: string
  keywords?: string
  image?: string
  path?: string
  locale?: 'zh' | 'en'
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  breadcrumbs?: Array<{name: string, url: string}>
  faqs?: Array<{question: string, answer: string}>
  productData?: any
  articleData?: any
  caseStudyData?: any
}

// 生成完整的SEO数据
export function generateSEOData(options: SEOOptions): SEOData {
  const {
    pageType,
    title,
    description,
    keywords,
    image,
    path = '',
    locale = 'zh',
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    breadcrumbs,
    faqs,
    productData,
    articleData,
    caseStudyData
  } = options

  // 生成页面SEO数据
  const pageSeo = pageType 
    ? generatePageSeo(pageType, locale, { title, description, keywords, image })
    : {
        title: title || seoConfig.defaultSeo[locale].title,
        description: description || seoConfig.defaultSeo[locale].description,
        keywords: keywords || seoConfig.defaultSeo[locale].keywords,
        image: image || '/images/og-default.jpg',
        siteName: seoConfig.siteName[locale],
        siteUrl: seoConfig.siteUrl
      }

  // 生成URL
  const fullUrl = `${seoConfig.siteUrl}/${locale}${path}`
  const alternateUrls = getAlternateLanguageUrls(path, seoConfig.siteUrl)
  const fullImageUrl = pageSeo.image.startsWith('http') ? pageSeo.image : `${seoConfig.siteUrl}${pageSeo.image}`
  const fullTitle = pageSeo.title.includes(pageSeo.siteName) ? pageSeo.title : `${pageSeo.title} - ${pageSeo.siteName}`

  // 生成结构化数据
  const schemas: StructuredData[] = [
    generateOrganizationSchema(locale),
    generateWebsiteSchema(locale)
  ]

  // 根据内容类型添加特定的结构化数据
  if (productData) {
    schemas.push(generateProductSchema(productData, locale))
  }
  
  if (articleData) {
    schemas.push(generateArticleSchema(articleData, locale))
  }
  
  if (caseStudyData) {
    schemas.push(generateCaseStudySchema(caseStudyData, locale))
  }
  
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs, locale))
  }
  
  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs, locale))
  }

  return {
    title: fullTitle,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    image: fullImageUrl,
    url: fullUrl,
    canonical: fullUrl,
    alternateUrls,
    structuredData: schemas,
    openGraph: {
      type,
      title: fullTitle,
      description: pageSeo.description,
      image: fullImageUrl,
      url: fullUrl,
      siteName: pageSeo.siteName,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageSeo.description,
      image: fullImageUrl,
      site: seoConfig.social.twitter
    }
  }
}

// 生成产品页面SEO数据
export function generateProductSEO(product: any, locale: 'zh' | 'en' = 'zh'): SEOData {
  const title = product.title || product.name
  const description = product.description || product.summary
  const image = product.image || product.featuredImage
  const path = `/products/${product.slug || product.id}`
  
  return generateSEOData({
    pageType: 'products',
    title: `${title} - ${locale === 'zh' ? 'LED显示屏产品' : 'LED Display Products'}`,
    description,
    keywords: `${title}, LED显示屏, ${product.category || ''}`,
    image,
    path,
    locale,
    type: 'product',
    productData: product,
    breadcrumbs: [
      { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
      { name: locale === 'zh' ? '产品中心' : 'Products', url: `/${locale}/products` },
      { name: title, url: `/${locale}${path}` }
    ]
  })
}

// 生成案例页面SEO数据
export function generateCaseSEO(caseStudy: any, locale: 'zh' | 'en' = 'zh'): SEOData {
  const title = caseStudy.title || caseStudy.name
  const description = caseStudy.description || caseStudy.summary
  const image = caseStudy.image || caseStudy.featuredImage
  const path = `/cases/${caseStudy.slug || caseStudy.id}`
  
  return generateSEOData({
    pageType: 'cases',
    title: `${title} - ${locale === 'zh' ? 'LED显示屏案例' : 'LED Display Case Study'}`,
    description,
    keywords: `${title}, LED案例, ${caseStudy.industry || ''}`,
    image,
    path,
    locale,
    type: 'article',
    caseStudyData: caseStudy,
    breadcrumbs: [
      { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
      { name: locale === 'zh' ? '案例展示' : 'Case Studies', url: `/${locale}/cases` },
      { name: title, url: `/${locale}${path}` }
    ]
  })
}

// 生成新闻页面SEO数据
export function generateNewsSEO(article: any, locale: 'zh' | 'en' = 'zh'): SEOData {
  const title = article.title
  const description = article.description || article.summary
  const image = article.image || article.featuredImage
  const path = `/news/${article.slug || article.id}`
  
  return generateSEOData({
    pageType: 'news',
    title: `${title} - ${locale === 'zh' ? 'LED行业资讯' : 'LED Industry News'}`,
    description,
    keywords: `${title}, LED新闻, ${article.category || ''}`,
    image,
    path,
    locale,
    type: 'article',
    author: article.author,
    publishedTime: article.publishedAt || article.createdAt,
    modifiedTime: article.updatedAt,
    section: article.category,
    tags: article.tags,
    articleData: article,
    breadcrumbs: [
      { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
      { name: locale === 'zh' ? '新闻资讯' : 'News', url: `/${locale}/news` },
      { name: title, url: `/${locale}${path}` }
    ]
  })
}

// 生成首页SEO数据
export function generateHomeSEO(locale: 'zh' | 'en' = 'zh'): SEOData {
  return generateSEOData({
    pageType: 'home',
    path: '',
    locale,
    type: 'website'
  })
}

// 生成关于页面SEO数据
export function generateAboutSEO(locale: 'zh' | 'en' = 'zh'): SEOData {
  return generateSEOData({
    pageType: 'about',
    path: '/about',
    locale,
    type: 'website',
    breadcrumbs: [
      { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
      { name: locale === 'zh' ? '关于我们' : 'About Us', url: `/${locale}/about` }
    ]
  })
}

// 生成联系页面SEO数据
export function generateContactSEO(locale: 'zh' | 'en' = 'zh'): SEOData {
  return generateSEOData({
    pageType: 'contact',
    path: '/contact',
    locale,
    type: 'website',
    breadcrumbs: [
      { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
      { name: locale === 'zh' ? '联系我们' : 'Contact Us', url: `/${locale}/contact` }
    ]
  })
}

// 生成产品列表页面SEO数据
export function generateProductsListSEO(locale: 'zh' | 'en' = 'zh', category?: string): SEOData {
  const categoryTitle = category ? ` - ${category}` : ''
  const path = category ? `/products/${category}` : '/products'
  
  const breadcrumbs = [
    { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
    { name: locale === 'zh' ? '产品中心' : 'Products', url: `/${locale}/products` }
  ]
  
  if (category) {
    breadcrumbs.push({ name: category, url: `/${locale}${path}` })
  }
  
  return generateSEOData({
    pageType: 'products',
    title: `${locale === 'zh' ? 'LED显示屏产品' : 'LED Display Products'}${categoryTitle}`,
    path,
    locale,
    type: 'website',
    breadcrumbs
  })
}

// 生成案例列表页面SEO数据
export function generateCasesListSEO(locale: 'zh' | 'en' = 'zh', industry?: string): SEOData {
  const industryTitle = industry ? ` - ${industry}` : ''
  const path = industry ? `/cases/${industry}` : '/cases'
  
  const breadcrumbs = [
    { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
    { name: locale === 'zh' ? '案例展示' : 'Case Studies', url: `/${locale}/cases` }
  ]
  
  if (industry) {
    breadcrumbs.push({ name: industry, url: `/${locale}${path}` })
  }
  
  return generateSEOData({
    pageType: 'cases',
    title: `${locale === 'zh' ? 'LED显示屏案例' : 'LED Display Case Studies'}${industryTitle}`,
    path,
    locale,
    type: 'website',
    breadcrumbs
  })
}

// 生成新闻列表页面SEO数据
export function generateNewsListSEO(locale: 'zh' | 'en' = 'zh', category?: string): SEOData {
  const categoryTitle = category ? ` - ${category}` : ''
  const path = category ? `/news/${category}` : '/news'
  
  const breadcrumbs = [
    { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
    { name: locale === 'zh' ? '新闻资讯' : 'News', url: `/${locale}/news` }
  ]
  
  if (category) {
    breadcrumbs.push({ name: category, url: `/${locale}${path}` })
  }
  
  return generateSEOData({
    pageType: 'news',
    title: `${locale === 'zh' ? 'LED行业资讯' : 'LED Industry News'}${categoryTitle}`,
    path,
    locale,
    type: 'website',
    breadcrumbs
  })
}

// 生成搜索页面SEO数据
export function generateSearchSEO(query: string, locale: 'zh' | 'en' = 'zh'): SEOData {
  return generateSEOData({
    title: `${locale === 'zh' ? '搜索结果' : 'Search Results'}: ${query}`,
    description: `${locale === 'zh' ? '搜索' : 'Search for'} "${query}" ${locale === 'zh' ? '的相关结果' : 'related results'}`,
    keywords: `搜索, ${query}`,
    path: `/search?q=${encodeURIComponent(query)}`,
    locale,
    type: 'website',
    breadcrumbs: [
      { name: locale === 'zh' ? '首页' : 'Home', url: `/${locale}` },
      { name: locale === 'zh' ? '搜索结果' : 'Search Results', url: `/${locale}/search?q=${encodeURIComponent(query)}` }
    ]
  })
}

// 生成基础Meta标签 (兼容性函数)
export function generateMetaTags(data: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  locale?: string;
  alternateLocales?: string[];
}): any {
  const seoData = generateSEOData({
    title: data.title,
    description: data.description,
    keywords: data.keywords?.join(', '),
    image: data.image,
    path: data.url?.replace(seoConfig.siteUrl, '') || '',
    locale: (data.locale === 'zh' || data.locale === 'en') ? data.locale : 'zh',
    type: data.type || 'website'
  });

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: seoData.openGraph,
    twitter: seoData.twitter,
    alternates: {
      canonical: seoData.canonical,
      languages: seoData.alternateUrls
    }
  };
}

// 验证SEO数据
export function validateSEOData(seoData: SEOData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // 检查标题长度
  if (seoData.title.length > 60) {
    errors.push('Title is too long (should be under 60 characters)')
  }
  if (seoData.title.length < 10) {
    errors.push('Title is too short (should be at least 10 characters)')
  }
  
  // 检查描述长度
  if (seoData.description.length > 160) {
    errors.push('Description is too long (should be under 160 characters)')
  }
  if (seoData.description.length < 50) {
    errors.push('Description is too short (should be at least 50 characters)')
  }
  
  // 检查关键词
  if (!seoData.keywords || seoData.keywords.length === 0) {
    errors.push('Keywords are missing')
  }
  
  // 检查图片
  if (!seoData.image) {
    errors.push('Image is missing')
  }
  
  // 检查URL
  if (!seoData.url) {
    errors.push('URL is missing')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}