import { locales } from './i18n-utils'

// 站点地图条目接口
export interface SitemapEntry {
  url: string
  lastModified?: Date | string
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternateUrls?: Record<string, string>
}

// 站点地图配置
export const sitemapConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://lianjin-led.com',
  defaultChangeFreq: 'weekly' as const,
  defaultPriority: 0.7,
  
  // 静态页面配置
  staticPages: [
    {
      path: '',
      priority: 1.0,
      changeFreq: 'daily' as const
    },
    {
      path: '/products',
      priority: 0.9,
      changeFreq: 'weekly' as const
    },
    {
      path: '/cases',
      priority: 0.8,
      changeFreq: 'weekly' as const
    },
    {
      path: '/news',
      priority: 0.8,
      changeFreq: 'daily' as const
    },
    {
      path: '/about',
      priority: 0.6,
      changeFreq: 'monthly' as const
    },
    {
      path: '/contact',
      priority: 0.7,
      changeFreq: 'monthly' as const
    }
  ]
}

// 生成静态页面的站点地图条目
export function generateStaticSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = []
  
  sitemapConfig.staticPages.forEach(page => {
    locales.forEach(locale => {
      const url = `${sitemapConfig.baseUrl}/${locale}${page.path}`
      const alternateUrls: Record<string, string> = {}
      
      // 生成替代语言URL
      locales.forEach(altLocale => {
        alternateUrls[altLocale] = `${sitemapConfig.baseUrl}/${altLocale}${page.path}`
      })
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternateUrls
      })
    })
  })
  
  return entries
}

// 生成产品页面的站点地图条目
export async function generateProductSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = []
  
  try {
    // 这里应该从API获取产品数据
    // const products = await fetchProducts()
    
    // 模拟产品数据
    const products = [
      { slug: 'outdoor-led-display', updatedAt: '2024-01-15' },
      { slug: 'indoor-led-display', updatedAt: '2024-01-10' },
      { slug: 'rental-led-display', updatedAt: '2024-01-12' },
      { slug: 'creative-led-display', updatedAt: '2024-01-08' },
      { slug: 'transparent-led-display', updatedAt: '2024-01-05' },
      { slug: 'fine-pitch-led-display', updatedAt: '2024-01-03' }
    ]
    
    products.forEach(product => {
      locales.forEach(locale => {
        const url = `${sitemapConfig.baseUrl}/${locale}/products/${product.slug}`
        const alternateUrls: Record<string, string> = {}
        
        locales.forEach(altLocale => {
          alternateUrls[altLocale] = `${sitemapConfig.baseUrl}/${altLocale}/products/${product.slug}`
        })
        
        entries.push({
          url,
          lastModified: new Date(product.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.8,
          alternateUrls
        })
      })
    })
  } catch (error) {
    console.error('Error generating product sitemap entries:', error)
  }
  
  return entries
}

// 生成案例页面的站点地图条目
export async function generateCaseSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = []
  
  try {
    // 这里应该从API获取案例数据
    // const cases = await fetchCases()
    
    // 模拟案例数据
    const cases = [
      { slug: 'shopping-mall-led-project', updatedAt: '2024-01-20' },
      { slug: 'stadium-led-display-project', updatedAt: '2024-01-18' },
      { slug: 'conference-room-led-project', updatedAt: '2024-01-15' },
      { slug: 'retail-store-led-project', updatedAt: '2024-01-12' }
    ]
    
    cases.forEach(caseItem => {
      locales.forEach(locale => {
        const url = `${sitemapConfig.baseUrl}/${locale}/cases/${caseItem.slug}`
        const alternateUrls: Record<string, string> = {}
        
        locales.forEach(altLocale => {
          alternateUrls[altLocale] = `${sitemapConfig.baseUrl}/${altLocale}/cases/${caseItem.slug}`
        })
        
        entries.push({
          url,
          lastModified: new Date(caseItem.updatedAt),
          changeFrequency: 'yearly',
          priority: 0.7,
          alternateUrls
        })
      })
    })
  } catch (error) {
    console.error('Error generating case sitemap entries:', error)
  }
  
  return entries
}

// 生成新闻页面的站点地图条目
export async function generateNewsSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = []
  
  try {
    // 这里应该从API获取新闻数据
    // const news = await fetchNews()
    
    // 模拟新闻数据
    const news = [
      { slug: 'led-technology-trends-2024', publishedAt: '2024-01-25' },
      { slug: 'new-product-launch-announcement', publishedAt: '2024-01-22' },
      { slug: 'industry-exhibition-participation', publishedAt: '2024-01-20' },
      { slug: 'company-milestone-achievement', publishedAt: '2024-01-18' }
    ]
    
    news.forEach(article => {
      locales.forEach(locale => {
        const url = `${sitemapConfig.baseUrl}/${locale}/news/${article.slug}`
        const alternateUrls: Record<string, string> = {}
        
        locales.forEach(altLocale => {
          alternateUrls[altLocale] = `${sitemapConfig.baseUrl}/${altLocale}/news/${article.slug}`
        })
        
        entries.push({
          url,
          lastModified: new Date(article.publishedAt),
          changeFrequency: 'never',
          priority: 0.6,
          alternateUrls
        })
      })
    })
  } catch (error) {
    console.error('Error generating news sitemap entries:', error)
  }
  
  return entries
}

// 生成完整的站点地图条目
export async function generateAllSitemapEntries(): Promise<SitemapEntry[]> {
  const [staticEntries, productEntries, caseEntries, newsEntries] = await Promise.all([
    generateStaticSitemapEntries(),
    generateProductSitemapEntries(),
    generateCaseSitemapEntries(),
    generateNewsSitemapEntries()
  ])
  
  return [
    ...staticEntries,
    ...productEntries,
    ...caseEntries,
    ...newsEntries
  ]
}

// 生成XML站点地图
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const sitemapStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
  const sitemapEnd = '</urlset>'
  
  const urlEntries = entries.map(entry => {
    const lastmod = entry.lastModified 
      ? (entry.lastModified instanceof Date 
          ? entry.lastModified.toISOString().split('T')[0]
          : new Date(entry.lastModified).toISOString().split('T')[0])
      : new Date().toISOString().split('T')[0]
    
    let urlXml = `
  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency || sitemapConfig.defaultChangeFreq}</changefreq>
    <priority>${entry.priority || sitemapConfig.defaultPriority}</priority>`
    
    // 添加替代语言链接
    if (entry.alternateUrls) {
      Object.entries(entry.alternateUrls).forEach(([lang, url]) => {
        const hreflang = lang === 'zh' ? 'zh-CN' : lang
        urlXml += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(url)}" />`
      })
    }
    
    urlXml += `
  </url>`
    
    return urlXml
  }).join('')
  
  return `${xmlHeader}
${sitemapStart}${urlEntries}
${sitemapEnd}`
}

// 生成站点地图索引XML
export function generateSitemapIndexXML(sitemaps: Array<{name: string, lastModified: Date}>): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const indexStart = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  const indexEnd = '</sitemapindex>'
  
  const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemapConfig.baseUrl}/${sitemap.name}</loc>
    <lastmod>${sitemap.lastModified.toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('')
  
  return `${xmlHeader}
${indexStart}${sitemapEntries}
${indexEnd}`
}

// 转义XML特殊字符
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

// 生成robots.txt内容
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${sitemapConfig.baseUrl}/sitemap.xml
Sitemap: ${sitemapConfig.baseUrl}/sitemap-static.xml
Sitemap: ${sitemapConfig.baseUrl}/sitemap-products.xml
Sitemap: ${sitemapConfig.baseUrl}/sitemap-cases.xml
Sitemap: ${sitemapConfig.baseUrl}/sitemap-news.xml

# Crawl-delay for specific bots
User-agent: Bingbot
Crawl-delay: 1

User-agent: Slurp
Crawl-delay: 1

# Block access to admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /images/temp/
Disallow: /uploads/temp/

# Allow access to important files
Allow: /favicon.ico
Allow: /robots.txt
Allow: /sitemap.xml`
}