import Head from 'next/head'
import { useLocale } from 'next-intl'
import { seoConfig, generatePageSeo } from '@/lib/seo-config'
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateProductSchema,
  generateArticleSchema,
  generateCaseStudySchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateMultipleSchemas,
  type StructuredData
} from '@/lib/structured-data'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'case-study'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
  canonical?: string
  pageType?: 'home' | 'products' | 'cases' | 'news' | 'about' | 'contact'
  structuredData?: StructuredData[]
  breadcrumbs?: Array<{name: string, url: string}>
  faqs?: Array<{question: string, answer: string}>
  productData?: any
  articleData?: any
  caseStudyData?: any
  alternateUrls?: Record<string, string>
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false,
  canonical,
  pageType,
  structuredData = [],
  breadcrumbs,
  faqs,
  productData,
  articleData,
  caseStudyData,
  alternateUrls
}: SEOHeadProps) {
  const locale = useLocale() as 'zh' | 'en'
  
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

  const fullTitle = pageSeo.title.includes(pageSeo.siteName) ? pageSeo.title : `${pageSeo.title} - ${pageSeo.siteName}`
  const fullImageUrl = pageSeo.image.startsWith('http') ? pageSeo.image : `${pageSeo.siteUrl}${pageSeo.image}`
  const fullUrl = url ? `${pageSeo.siteUrl}${url}` : `${pageSeo.siteUrl}/${locale}`
  const canonicalUrl = canonical || fullUrl

  // 生成结构化数据
  const schemas: StructuredData[] = [
    generateOrganizationSchema(locale),
    generateWebsiteSchema(locale),
    ...structuredData
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
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={pageSeo.description} />
      <meta name="keywords" content={pageSeo.keywords} />
      {author && <meta name="author" content={author} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#1f2937" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Language URLs */}
      {alternateUrls && Object.entries(alternateUrls).map(([lang, langUrl]) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang === 'zh' ? 'zh-CN' : lang} 
          href={langUrl} 
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={alternateUrls?.zh || fullUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={locale} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageSeo.description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageSeo.title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={pageSeo.siteName} />
      <meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'zh' ? 'en_US' : 'zh_CN'} />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Product specific Open Graph tags */}
      {type === 'product' && (
        <>
          <meta property="product:brand" content={pageSeo.siteName} />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.social.twitter} />
      <meta name="twitter:creator" content={seoConfig.social.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageSeo.description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={pageSeo.title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={pageSeo.siteName} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Enhanced Structured Data */}
      {schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateMultipleSchemas(schemas)
          }}
        />
      )}
    </Head>
  )
}