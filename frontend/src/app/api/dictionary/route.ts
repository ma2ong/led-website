import { NextRequest, NextResponse } from 'next/server';
import { getDictionary } from '@/lib/dictionary';
import { i18n, Locale } from '@/lib/i18n-config';

/**
 * 字典API路由处理程序
 * 根据请求的locale参数返回对应的字典数据
 */
export async function GET(request: NextRequest) {
  try {
    // 从URL参数中获取语言
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') as Locale | null;
    
    // 验证语言参数
    if (!locale || !i18n.locales.includes(locale)) {
      return NextResponse.json(
        { error: 'Invalid or missing locale parameter' },
        { status: 400 }
      );
    }
    
    // 获取字典数据
    const dictionary = await getDictionary(locale);
    
    // 设置缓存控制头，允许客户端缓存字典数据1小时
    return NextResponse.json(dictionary, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Dictionary API error:', error);
    return NextResponse.json(
      { error: 'Failed to load dictionary' },
      { status: 500 }
    );
  }
}