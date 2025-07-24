export const i18n = {
  defaultLocale: 'zh-Hans',
  locales: ['zh-Hans', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// 获取URL路径中的语言部分
export function getLocaleFromPath(path: string): Locale | undefined {
  const pathSegments = path.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (i18n.locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return undefined;
}

// 从URL路径中移除语言部分
export function removeLocaleFromPath(path: string): string {
  const locale = getLocaleFromPath(path);
  
  if (locale) {
    // 移除开头的语言部分
    return path.replace(new RegExp(`^/${locale}`), '') || '/';
  }
  
  return path;
}

// 为路径添加语言前缀
export function addLocaleToPath(path: string, locale: Locale): string {
  // 首先移除可能已存在的语言前缀
  const pathWithoutLocale = removeLocaleFromPath(path);
  
  // 确保路径以斜杠开头
  const normalizedPath = pathWithoutLocale.startsWith('/') 
    ? pathWithoutLocale 
    : `/${pathWithoutLocale}`;
  
  // 添加语言前缀
  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
}

// 获取备用语言
export function getAlternateLocales(currentLocale: Locale): Locale[] {
  return i18n.locales.filter(locale => locale !== currentLocale);
}

// 生成hreflang链接
export function generateHrefLangLinks(path: string, currentLocale: Locale): { locale: Locale; href: string }[] {
  const pathWithoutLocale = removeLocaleFromPath(path);
  
  return i18n.locales.map(locale => ({
    locale,
    href: addLocaleToPath(pathWithoutLocale, locale)
  }));
}