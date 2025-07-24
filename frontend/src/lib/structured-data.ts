import { seoConfig } from './seo-config'

// 基础结构化数据类型
export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

// 组织结构化数据
export function generateOrganizationSchema(locale: 'zh' | 'en'): StructuredData {
  const org = seoConfig.organization
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name[locale],
    alternateName: locale === 'zh' ? org.name.en : org.name.zh,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}${org.logo}`,
    image: `${seoConfig.siteUrl}${org.logo}`,
    description: seoConfig.siteDescription[locale],
    foundingDate: org.foundingDate,
    numberOfEmployees: org.employees,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'zh' ? '深圳市' : 'Shenzhen',
      addressRegion: locale === 'zh' ? '广东省' : 'Guangdong',
      addressCountry: locale === 'zh' ? '中国' : 'China',
      streetAddress: org.address[locale]
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: org.phone,
      email: org.email,
      contactType: locale === 'zh' ? '客户服务' : 'customer service',
      availableLanguage: ['zh-CN', 'en-US']
    },
    sameAs: [
      `https://twitter.com/${seoConfig.social.twitter.replace('@', '')}`,
      `https://facebook.com/${seoConfig.social.facebook}`,
      `https://linkedin.com/${seoConfig.social.linkedin}`,
      `https://youtube.com/${seoConfig.social.youtube.replace('@', '')}`
    ]
  }
}

// 网站结构化数据
export function generateWebsiteSchema(locale: 'zh' | 'en'): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName[locale],
    alternateName: locale === 'zh' ? seoConfig.siteName.en : seoConfig.siteName.zh,
    url: seoConfig.siteUrl,
    description: seoConfig.siteDescription[locale],
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name[locale],
      logo: `${seoConfig.siteUrl}${seoConfig.organization.logo}`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US'
  }
}

// 产品结构化数据
export function generateProductSchema(product: any, locale: 'zh' | 'en'): StructuredData {
  const baseUrl = seoConfig.siteUrl
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title || product.name,
    description: product.description || product.summary,
    image: product.image ? `${baseUrl}${product.image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: seoConfig.siteName[locale]
    },
    manufacturer: {
      '@type': 'Organization',
      name: seoConfig.organization.name[locale],
      url: baseUrl
    },
    category: product.category || 'LED Display',
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: seoConfig.organization.name[locale]
      }
    } : undefined,
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
      bestRating: 5,
      worstRating: 1
    } : undefined
  }
}

// 文章结构化数据
export function generateArticleSchema(article: any, locale: 'zh' | 'en'): StructuredData {
  const baseUrl = seoConfig.siteUrl
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || article.summary,
    image: article.image ? `${baseUrl}${article.image}` : undefined,
    author: {
      '@type': 'Person',
      name: article.author || seoConfig.organization.name[locale]
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name[locale],
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${seoConfig.organization.logo}`
      }
    },
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/news/${article.slug || article.id}`
    },
    articleSection: article.category,
    keywords: article.tags?.join(', '),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US'
  }
}

// 案例研究结构化数据
export function generateCaseStudySchema(caseStudy: any, locale: 'zh' | 'en'): StructuredData {
  const baseUrl = seoConfig.siteUrl
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/${locale}/cases/${caseStudy.slug || caseStudy.id}`,
    headline: caseStudy.title,
    description: caseStudy.description || caseStudy.summary,
    image: caseStudy.image ? `${baseUrl}${caseStudy.image}` : undefined,
    author: {
      '@type': 'Organization',
      name: seoConfig.organization.name[locale]
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.organization.name[locale],
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${seoConfig.organization.logo}`
      }
    },
    datePublished: caseStudy.publishedAt || caseStudy.createdAt,
    dateModified: caseStudy.updatedAt || caseStudy.publishedAt || caseStudy.createdAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/cases/${caseStudy.slug || caseStudy.id}`
    },
    about: {
      '@type': 'Thing',
      name: caseStudy.industry || 'LED Display Project'
    },
    mentions: caseStudy.products?.map((product: any) => ({
      '@type': 'Product',
      name: product.name || product.title
    })),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US'
  }
}

// 面包屑导航结构化数据
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>, locale: 'zh' | 'en'): StructuredData {
  const baseUrl = seoConfig.siteUrl
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }
}

// FAQ结构化数据
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>, locale: 'zh' | 'en'): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// 生成多个结构化数据
export function generateMultipleSchemas(schemas: StructuredData[]): string {
  return JSON.stringify(schemas.filter(Boolean))
}

// 生成单个结构化数据
export function generateSingleSchema(schema: StructuredData): string {
  return JSON.stringify(schema)
}