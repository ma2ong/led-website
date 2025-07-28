import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 支持的语言
const locales = ['zh', 'en'];
const defaultLocale = 'zh';

// 获取首选语言
function getLocale(request: NextRequest): string {
  // 1. 检查URL路径中的语言
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return pathname.split('/')[1];
  }

  // 2. 检查cookie中的语言设置
  const cookieLocale = request.cookies.get('language')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 3. 检查Accept-Language头
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
      .find(lang => {
        return locales.some(locale => 
          lang === locale || lang.startsWith(`${locale}-`)
        );
      });

    if (preferredLocale) {
      const matchedLocale = locales.find(locale => 
        preferredLocale === locale || preferredLocale.startsWith(`${locale}-`)
      );
      if (matchedLocale) {
        return matchedLocale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 跳过静态文件和API路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 如果没有语言前缀，重定向到带语言前缀的URL
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    
    // 如果是默认语言，不添加前缀（可选）
    if (locale === defaultLocale) {
      return NextResponse.next();
    }

    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 匹配所有路径，除了以下路径：
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};