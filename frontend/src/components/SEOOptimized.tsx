// SEO优化组件
import Head from 'next/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations, Language } from '@/lib/translations';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

export default function SEOOptimized({
  title,
  description,
  keywords,
  image = '/images/og-default.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  noindex = false,
  canonical,
}: SEOProps) {
  const { language } = useLanguage();
  
  // 默认SEO信息
  const defaultTitle = language === 'zh' 
    ? '深圳联锦光电 - 专业LED显示屏制造商 | RGBSHARE'
    : 'Shenzhen Lianjin Photoelectricity - Professional LED Display Manufacturer | RGBSHARE';
    
  const defaultDescription = language === 'zh'
    ? '深圳联锦光电有限公司是全球领先的LED显示屏产品和系统解决方案提供商，专注于LED小间距屏、租赁屏、广告屏、创意屏等。17年专业制造经验，服务全球160+国家。'
    : 'Shenzhen Lianjin Photoelectricity Co., Ltd. is a leading global provider of LED display products and system solutions, specializing in fine pitch LED, rental LED, advertising LED, creative LED, etc. 17 years of professional manufacturing experience, serving 160+ countries worldwide.';
    
  const defaultKeywords = language === 'zh'
    ? 'LED显示屏, 深圳联锦光电, RGBSHARE, 小间距LED, LED租赁屏, 户外LED广告屏, 创意LED, 透明LED, LED解决方案'
    : 'LED display, Shenzhen Lianjin Photoelectricity, RGBSHARE, fine pitch LED, LED rental screen, outdoor LED advertising screen, creative LED, transparent LED, LED solutions';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const imageUrl = image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rgbshare.com'}${image}`;

  // 生成结构化数据
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": language === 'zh' ? "深圳联锦光电有限公司" : "Shenzhen Lianjin Photoelectricity Co., Ltd.",
      "alternateName": "RGBSHARE",
      "url": "https://www.rgbshare.com",
      "logo": "https://www.rgbshare.com/images/logo.png",
      "description": finalDescription,
      "foundingDate": "2007",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": language === 'zh' ? "深圳市宝安区石岩街道塘头第一工业区C栋" : "Building C, Tangtou First Industrial Zone, Shiyan Street, Bao'an District",
        "addressLocality": "Shenzhen",
        "addressRegion": "Guangdong",
        "postalCode": "518108",
        "addressCountry": "CN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+86-755-8259-5016",
        "contactType": "customer service",
        "email": "bruce@lianjinled.com",
        "availableLanguage": ["Chinese", "English"]
      },
      "sameAs": [
        "https://www.linkedin.com/company/rgbshare",
        "https://www.youtube.com/channel/rgbshare"
      ]
    };

    if (type === 'product') {
      return {
        ...baseData,
        "@type": "Product",
        "name": finalTitle,
        "description": finalDescription,
        "image": imageUrl,
        "brand": {
          "@type": "Brand",
          "name": "RGBSHARE"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": language === 'zh' ? "深圳联锦光电有限公司" : "Shenzhen Lianjin Photoelectricity Co., Ltd."
        }
      };
    }

    if (type === 'article') {
      return {
        ...baseData,
        "@type": "Article",
        "headline": finalTitle,
        "description": finalDescription,
        "image": imageUrl,
        "author": {
          "@type": "Person",
          "name": author || "RGBSHARE"
        },
        "publisher": {
          "@type": "Organization",
          "name": language === 'zh' ? "深圳联锦光电有限公司" : "Shenzhen Lianjin Photoelectricity Co., Ltd.",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.rgbshare.com/images/logo.png"
          }
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime
      };
    }

    return baseData;
  };

  return (
    <Head>
      {/* 基本SEO标签 */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author || "RGBSHARE"} />
      
      {/* 语言和地区 */}
      <meta httpEquiv="content-language" content={language === 'zh' ? 'zh-CN' : 'en-US'} />
      <link rel="alternate" hrefLang="zh-CN" href={currentUrl.replace('/en/', '/').replace('/en', '/')} />
      <link rel="alternate" hrefLang="en" href={currentUrl.includes('/en') ? currentUrl : currentUrl.replace('/', '/en/')} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl.replace('/en/', '/').replace('/en', '/')} />
      
      {/* 规范链接 */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* 机器人指令 */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph标签 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="RGBSHARE" />
      <meta property="og:locale" content={language === 'zh' ? 'zh_CN' : 'en_US'} />
      
      {/* 文章特定的Open Graph标签 */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@rgbshare" />
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* 图标 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS预解析 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
      
      {/* 百度站长验证（如果需要） */}
      <meta name="baidu-site-verification" content="your-baidu-verification-code" />
      
      {/* Google站长验证（如果需要） */}
      <meta name="google-site-verification" content="your-google-verification-code" />
    </Head>
  );
}

// 页面特定的SEO组件
export function HomePageSEO() {
  const { language } = useLanguage();
  
  return (
    <SEOOptimized
      title={language === 'zh' 
        ? '深圳联锦光电 - 专业LED显示屏制造商 | RGBSHARE联锦'
        : 'Shenzhen Lianjin Photoelectricity - Professional LED Display Manufacturer | RGBSHARE'
      }
      description={language === 'zh'
        ? '深圳联锦光电有限公司，17年专业LED显示屏制造经验，产品包括小间距、租赁、户外、创意显示屏等。服务全球160+国家，50000㎡现代化工厂，ISO认证企业。'
        : 'Shenzhen Lianjin Photoelectricity Co., Ltd., 17 years of professional LED display manufacturing experience, products include fine pitch, rental, outdoor, creative displays, etc. Serving 160+ countries worldwide, 50,000㎡ modern factory, ISO certified enterprise.'
      }
      keywords={language === 'zh'
        ? 'LED显示屏制造商, 深圳联锦光电, RGBSHARE, 小间距LED屏, LED租赁屏, 户外LED大屏, 创意LED显示, 透明LED屏, LED显示解决方案, 深圳LED工厂'
        : 'LED display manufacturer, Shenzhen Lianjin Photoelectricity, RGBSHARE, fine pitch LED screen, LED rental screen, outdoor LED display, creative LED display, transparent LED screen, LED display solutions, Shenzhen LED factory'
      }
      type="website"
    />
  );
}

export function ProductPageSEO({ productName, category }: { productName?: string; category?: string }) {
  const { language } = useLanguage();
  
  const title = productName 
    ? `${productName} - ${language === 'zh' ? 'LED显示屏产品' : 'LED Display Products'} | RGBSHARE`
    : `${language === 'zh' ? 'LED显示屏产品中心' : 'LED Display Product Center'} | RGBSHARE`;
    
  return (
    <SEOOptimized
      title={title}
      description={language === 'zh'
        ? `探索深圳联锦光电全系列LED显示屏产品，包括小间距、租赁、户外、创意显示屏、会议一体机、广告机等专业解决方案。17年制造经验，品质保证。`
        : `Explore the full range of LED display products from Shenzhen Lianjin Photoelectricity, including fine pitch, rental, outdoor, creative displays, all-in-one conference units, and poster LEDs. 17 years of manufacturing experience, quality guaranteed.`
      }
      type="product"
    />
  );
}

export function CasePageSEO({ caseTitle }: { caseTitle?: string }) {
  const { language } = useLanguage();
  
  const title = caseTitle 
    ? `${caseTitle} - ${language === 'zh' ? 'LED显示屏成功案例' : 'LED Display Success Cases'} | RGBSHARE`
    : `${language === 'zh' ? 'LED显示屏成功案例' : 'LED Display Success Cases'} | RGBSHARE`;
    
  return (
    <SEOOptimized
      title={title}
      description={language === 'zh'
        ? `查看深圳联锦光电在全球160+国家的成功LED显示屏项目案例，涵盖政府、体育、商业、会议、娱乐等多个行业。专业解决方案，值得信赖。`
        : `View successful LED display project cases from Shenzhen Lianjin Photoelectricity in 160+ countries worldwide, covering government, sports, commercial, conference, entertainment and other industries. Professional solutions, trustworthy.`
      }
      type="article"
    />
  );
}

export function NewsPageSEO({ newsTitle, publishedTime }: { newsTitle?: string; publishedTime?: string }) {
  const { language } = useLanguage();
  
  const title = newsTitle 
    ? `${newsTitle} - ${language === 'zh' ? 'LED显示屏行业资讯' : 'LED Display Industry News'} | RGBSHARE`
    : `${language === 'zh' ? 'LED显示屏行业资讯' : 'LED Display Industry News'} | RGBSHARE`;
    
  return (
    <SEOOptimized
      title={title}
      description={language === 'zh'
        ? `获取LED显示屏行业最新资讯、技术动态、产品发布和深圳联锦光电公司新闻。了解LED显示技术发展趋势和市场动向。`
        : `Get the latest news about LED display industry, technical updates, product releases and Shenzhen Lianjin Photoelectricity company news. Learn about LED display technology development trends and market dynamics.`
      }
      type="article"
      publishedTime={publishedTime}
    />
  );
}

export function ContactPageSEO() {
  const { language } = useLanguage();
  
  return (
    <SEOOptimized
      title={language === 'zh' 
        ? '联系我们 - 深圳联锦光电LED显示屏解决方案 | RGBSHARE'
        : 'Contact Us - Shenzhen Lianjin Photoelectricity LED Display Solutions | RGBSHARE'
      }
      description={language === 'zh'
        ? '联系深圳联锦光电获取专业LED显示屏解决方案。电话：+86 755-8259-5016，邮箱：bruce@lianjinled.com。7×24小时技术支持，全球服务。'
        : 'Contact Shenzhen Lianjin Photoelectricity for professional LED display solutions. Phone: +86 755-8259-5016, Email: bruce@lianjinled.com. 7×24 hours technical support, global service.'
      }
      type="website"
    />
  );
}