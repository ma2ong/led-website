import { NextResponse } from 'next/server'
import { generateSitemapIndexXML } from '@/lib/sitemap'

export async function GET() {
  try {
    // 定义所有站点地图文件
    const sitemaps = [
      { name: 'sitemap-static.xml', lastModified: new Date() },
      { name: 'sitemap-products.xml', lastModified: new Date() },
      { name: 'sitemap-cases.xml', lastModified: new Date() },
      { name: 'sitemap-news.xml', lastModified: new Date() }
    ]
    
    // 生成站点地图索引XML
    const sitemapIndexXml = generateSitemapIndexXML(sitemaps)
    
    // 返回XML响应
    return new NextResponse(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 缓存24小时
      },
    })
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new NextResponse('Error generating sitemap index', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'