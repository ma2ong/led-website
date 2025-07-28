import Head from 'next/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateHreflangTags } from '@/lib/i18n';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
}: SEOHeadProps) {
  const { language } = useLanguage();
  
  const siteConfig = {
    zh: {
      siteName: '深圳联锦光电 - RGBSHARE',
      defaultTitle: '深圳联锦光电 - 专业LED显示屏制造商 | RGBSHARE',
      defaultDescription: '深圳联锦光电有限公司是全球领先的LED显示屏产品和系统解决方案提供商，专注于LED小间距屏、租赁屏、广告屏、创意屏等。17年专业制造经验，服务全球160+国家。',
      defaultKeywords: 'LED显示屏, 深圳联锦光电, RGBSHARE, 小间距LED, LED租赁屏, 户外LED广告屏, 创意LED, 透明LED, LED解决方案',
    },
    en: {
      siteName: 'Shenzhen Lianjin Photoelectricity - RGBSHARE',
      defaultTitle: 'Shenzhen Lianjin Photoelectricity - Professional LED Display Manufacturer | RGBSHARE',
      defaultDescription: 'Shenzhen Lianjin Photoelectricity Co., Ltd. is a leading global provider of LED display products and system solutions, specializing in fine pitch LED, rental LED, outdoor LED advertising displays, creative LED, and more. 17 years of professional manufacturing experience, serving 160+ countries worldwide.',
      defaultKeywords: 'LED Display, Shenzhen Lianjin Photoelectricity, RGBSHARE, Fine Pitch LED, LED Rental Display, Outdoor LED Advertising Display, Creative LED, Transparent LED, LED Solutions',
    },
  };

  const config = siteConfig[language];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lianjinled.com';
  const currentUrl = url || baseUrl;
  const fullTitle = title ? `${title} - ${config.siteName}` : config.defaultTitle;
  const metaDescription = description || config.defaultDescription;
  const metaKeywords = keywords || config.defaultKeywords;
  const ogImage = image || `${baseUrl}/images/og-image-${language}.jpg`;

  // 生成hreflang标签
  const hreflangTags = generateHreflangTags(currentUrl.replace(baseUrl, ''));

  return (
    <Head>
      {/* 基本meta标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author || config.siteName} />
      <meta name="language" content={language} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* 视口和字符编码 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Open Graph标签 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={config.siteName} />
      <meta property="og:locale" content={language === 'zh' ? 'zh_CN' : 'en_US'} />
      
      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 文章特定标签 */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* 规范URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang标签 */}
      {hreflangTags.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      
      {/* 网站图标 */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* 主题颜色 */}
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
      
      {/* DNS预取和预连接 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": config.siteName,
            "url": baseUrl,
            "logo": `${baseUrl}/images/logo.png`,
            "description": metaDescription,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CN",
              "addressRegion": "Guangdong",
              "addressLocality": "Shenzhen",
              "streetAddress": "Bao'an District"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+86-755-8259-5016",
              "contactType": "customer service",
              "email": "bruce@lianjinled.com"
            },
            "sameAs": [
              "https://www.linkedin.com/company/rgbshare",
              "https://www.youtube.com/channel/UCxxxxx"
            ]
          })
        }}
      />
    </Head>
  );
}

// 页面特定的SEO组件
export function ProductSEO({ product }: { product: any }) {
  const { language } = useLanguage();
  
  const title = language === 'en' && product.name_en ? product.name_en : product.name;
  const description = language === 'en' && product.description_en ? product.description_en : product.description;
  
  return (
    <SEOHead
      title={title}
      description={description}
      type="product"
      keywords={`${title}, LED显示屏, LED Display, RGBSHARE`}
    />
  );
}

export function NewsSEO({ article }: { article: any }) {
  const { language } = useLanguage();
  
  const title = language === 'en' && article.title_en ? article.title_en : article.title;
  const description = language === 'en' && article.excerpt_en ? article.excerpt_en : article.excerpt;
  
  return (
    <SEOHead
      title={title}
      description={description}
      type="article"
      publishedTime={article.publishedAt}
      modifiedTime={article.updatedAt}
      keywords={`${title}, LED新闻, LED News, RGBSHARE`}
    />
  );
}

export function CaseSEO({ caseStudy }: { caseStudy: any }) {
  const { language } = useLanguage();
  
  const title = language === 'en' && caseStudy.title_en ? caseStudy.title_en : caseStudy.title;
  const description = language === 'en' && caseStudy.description_en ? caseStudy.description_en : caseStudy.description;
  
  return (
    <SEOHead
      title={title}
      description={description}
      type="article"
      keywords={`${title}, LED案例, LED Case Study, RGBSHARE`}
    />
  );
}