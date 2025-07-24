export const seoConfig = {
  // 网站基本信息
  siteName: {
    zh: '联锦光电',
    en: 'Lianjin LED'
  },
  siteDescription: {
    zh: '联锦光电专业生产LED显示屏，提供户外、室内、租赁、创意等全系列LED显示解决方案。',
    en: 'Lianjin LED specializes in manufacturing LED displays, offering a full range of LED display solutions for outdoor, indoor, rental, and creative applications.'
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://lianjin-led.com',
  
  // 默认SEO设置
  defaultSeo: {
    zh: {
      title: '联锦光电 - 专业LED显示屏制造商',
      description: '联锦光电专业生产LED显示屏，提供户外、室内、租赁、创意等全系列LED显示解决方案。',
      keywords: 'LED显示屏,户外LED,室内LED,租赁LED,创意LED,小间距LED,透明LED,LED大屏幕'
    },
    en: {
      title: 'Lianjin LED - Professional LED Display Manufacturer',
      description: 'Lianjin LED specializes in manufacturing LED displays, offering a full range of LED display solutions for outdoor, indoor, rental, and creative applications.',
      keywords: 'LED display,outdoor LED,indoor LED,rental LED,creative LED,fine pitch LED,transparent LED,LED screen'
    }
  },
  
  // 页面特定SEO模板
  pageTemplates: {
    home: {
      zh: {
        title: '联锦光电 - 专业LED显示屏制造商',
        description: '联锦光电专业生产LED显示屏，提供户外、室内、租赁、创意等全系列LED显示解决方案。品质保证，服务专业。',
        keywords: 'LED显示屏制造商,LED大屏幕,户外LED显示屏,室内LED显示屏'
      },
      en: {
        title: 'Lianjin LED - Professional LED Display Manufacturer',
        description: 'Lianjin LED specializes in manufacturing LED displays, offering a full range of LED display solutions. Quality guaranteed, professional service.',
        keywords: 'LED display manufacturer,LED screen,outdoor LED display,indoor LED display'
      }
    },
    products: {
      zh: {
        title: 'LED显示屏产品中心 - 联锦光电',
        description: '联锦光电LED显示屏产品中心，提供户外、室内、租赁、创意、透明、小间距等全系列LED显示屏产品。',
        keywords: 'LED显示屏产品,户外LED,室内LED,租赁LED,创意LED'
      },
      en: {
        title: 'LED Display Products - Lianjin LED',
        description: 'Lianjin LED product center, offering outdoor, indoor, rental, creative, transparent, fine pitch LED display products.',
        keywords: 'LED display products,outdoor LED,indoor LED,rental LED,creative LED'
      }
    },
    cases: {
      zh: {
        title: 'LED显示屏案例展示 - 联锦光电',
        description: '联锦光电LED显示屏成功案例展示，涵盖商业、体育、广告、舞台等多个应用领域。',
        keywords: 'LED显示屏案例,LED项目案例,LED应用案例'
      },
      en: {
        title: 'LED Display Case Studies - Lianjin LED',
        description: 'Lianjin LED successful case studies, covering commercial, sports, advertising, stage and other application areas.',
        keywords: 'LED display cases,LED project cases,LED application cases'
      }
    },
    news: {
      zh: {
        title: 'LED行业新闻资讯 - 联锦光电',
        description: '联锦光电LED行业新闻资讯，了解最新LED显示屏技术动态、行业趋势和产品资讯。',
        keywords: 'LED新闻,LED资讯,LED行业动态,LED技术'
      },
      en: {
        title: 'LED Industry News - Lianjin LED',
        description: 'Lianjin LED industry news and information, learn about the latest LED display technology trends and product information.',
        keywords: 'LED news,LED information,LED industry trends,LED technology'
      }
    },
    about: {
      zh: {
        title: '关于联锦光电 - 专业LED显示屏制造商',
        description: '联锦光电是专业的LED显示屏制造商，拥有先进的生产设备和专业的技术团队，致力于为客户提供优质的LED显示解决方案。',
        keywords: '联锦光电,LED制造商,LED公司,LED厂家'
      },
      en: {
        title: 'About Lianjin LED - Professional LED Display Manufacturer',
        description: 'Lianjin LED is a professional LED display manufacturer with advanced production equipment and professional technical team.',
        keywords: 'Lianjin LED,LED manufacturer,LED company,LED factory'
      }
    },
    contact: {
      zh: {
        title: '联系我们 - 联锦光电',
        description: '联系联锦光电，获取专业的LED显示屏解决方案。我们提供全方位的技术支持和售后服务。',
        keywords: '联系联锦光电,LED咨询,LED服务'
      },
      en: {
        title: 'Contact Us - Lianjin LED',
        description: 'Contact Lianjin LED for professional LED display solutions. We provide comprehensive technical support and after-sales service.',
        keywords: 'contact Lianjin LED,LED consultation,LED service'
      }
    }
  },
  
  // 社交媒体配置
  social: {
    twitter: '@lianjinled',
    facebook: 'lianjinled',
    linkedin: 'company/lianjin-led',
    youtube: '@lianjinled'
  },
  
  // 公司信息
  organization: {
    name: {
      zh: '联锦光电科技有限公司',
      en: 'Lianjin LED Technology Co., Ltd.'
    },
    logo: '/images/logo.png',
    address: {
      zh: '中国深圳市宝安区',
      en: 'Bao\'an District, Shenzhen, China'
    },
    phone: '+86-755-12345678',
    email: 'info@lianjin-led.com',
    foundingDate: '2010-01-01',
    employees: '200-500'
  }
}

// 生成页面SEO数据
export function generatePageSeo(
  pageType: keyof typeof seoConfig.pageTemplates,
  locale: 'zh' | 'en',
  customData?: {
    title?: string
    description?: string
    keywords?: string
    image?: string
  }
) {
  const template = seoConfig.pageTemplates[pageType]?.[locale] || seoConfig.defaultSeo[locale]
  
  return {
    title: customData?.title || template.title,
    description: customData?.description || template.description,
    keywords: customData?.keywords || template.keywords,
    image: customData?.image || '/images/og-default.jpg',
    siteName: seoConfig.siteName[locale],
    siteUrl: seoConfig.siteUrl
  }
}