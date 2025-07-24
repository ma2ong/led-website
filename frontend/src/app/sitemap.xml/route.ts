import { NextResponse } from 'next/server'
import { generateAllSitemapEntries, generateSitemapXML } from '@/lib/sitemap'

export async function GET() {
  try {
    // 生成所有站点地图条目
    const entries = await generateAllSitemapEntries()
    
    // 生成XML站点地图
    const sitemapXml = generateSitemapXML(entries)
    
    // 返回XML响应
    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 缓存1小时
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'