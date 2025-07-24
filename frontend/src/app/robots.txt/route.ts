import { NextResponse } from 'next/server'
import { generateRobotsTxt } from '@/lib/sitemap'

export async function GET() {
  try {
    // 生成robots.txt内容
    const robotsTxt = generateRobotsTxt()
    
    // 返回文本响应
    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 缓存24小时
      },
    })
  } catch (error) {
    console.error('Error generating robots.txt:', error)
    return new NextResponse('Error generating robots.txt', { status: 500 })
  }
}

export const dynamic = 'force-dynamic'