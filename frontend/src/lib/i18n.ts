// 国际化工具函数

export type Language = 'zh' | 'en';

// 语言配置
export const LANGUAGES = {
  zh: {
    code: 'zh',
    name: '中文',
    nativeName: '中文',
    flag: '🇨🇳',
    dir: 'ltr',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
} as const;

// 默认语言
export const DEFAULT_LANGUAGE: Language = 'zh';

// 支持的语言列表
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES) as Language[];

// 检测浏览器语言
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.toLowerCase();
  
  // 精确匹配
  if (browserLang === 'zh-cn' || browserLang === 'zh') return 'zh';
  if (browserLang === 'en' || browserLang.startsWith('en-')) return 'en';
  
  // 部分匹配
  if (browserLang.startsWith('zh')) return 'zh';
  
  return DEFAULT_LANGUAGE;
}

// 获取保存的语言设置
export function getSavedLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const saved = localStorage.getItem('language') as Language;
  return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
}

// 保存语言设置
export function saveLanguage(language: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', language);
}

// 格式化日期
export function formatDate(date: Date | string, language: Language = 'zh'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (language === 'en') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return dateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 格式化数字
export function formatNumber(number: number, language: Language = 'zh'): string {
  if (language === 'en') {
    return number.toLocaleString('en-US');
  }
  
  return number.toLocaleString('zh-CN');
}

// 格式化货币
export function formatCurrency(
  amount: number, 
  currency: 'CNY' | 'USD' = 'CNY',
  language: Language = 'zh'
): string {
  const locale = language === 'en' ? 'en-US' : 'zh-CN';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

// 获取本地化内容
export function getLocalizedContent<T extends Record<string, any>>(
  content: T,
  field: keyof T,
  language: Language = 'zh'
): string {
  const enField = `${String(field)}_en` as keyof T;
  const zhField = field;
  
  if (language === 'en' && content[enField]) {
    return String(content[enField]);
  }
  
  return String(content[zhField] || '');
}

// 获取本地化数组内容
export function getLocalizedArray<T extends Record<string, any>>(
  content: T,
  field: keyof T,
  language: Language = 'zh'
): string[] {
  const enField = `${String(field)}_en` as keyof T;
  const zhField = field;
  
  if (language === 'en' && content[enField]) {
    return Array.isArray(content[enField]) ? content[enField] : [];
  }
  
  return Array.isArray(content[zhField]) ? content[zhField] : [];
}

// 生成多语言URL
export function generateLocalizedUrl(path: string, language: Language): string {
  if (language === DEFAULT_LANGUAGE) {
    return path;
  }
  
  return `/${language}${path === '/' ? '' : path}`;
}

// 从URL中提取语言
export function extractLanguageFromUrl(url: string): { language: Language; path: string } {
  const segments = url.split('/').filter(Boolean);
  
  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0] as Language)) {
    return {
      language: segments[0] as Language,
      path: '/' + segments.slice(1).join('/'),
    };
  }
  
  return {
    language: DEFAULT_LANGUAGE,
    path: url,
  };
}

// 翻译键值对类型
export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}

// 深度获取翻译
export function getNestedTranslation(
  translations: TranslationKeys,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.');
  let current: any = translations;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof current === 'string' ? current : fallback || key;
}

// 插值翻译
export function interpolateTranslation(
  template: string,
  variables: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

// 复数形式处理
export function pluralize(
  count: number,
  translations: {
    zero?: string;
    one: string;
    other: string;
  },
  language: Language = 'zh'
): string {
  if (count === 0 && translations.zero) {
    return translations.zero;
  }
  
  if (language === 'en') {
    return count === 1 ? translations.one : translations.other;
  }
  
  // 中文通常不区分单复数
  return translations.other;
}

// SEO相关的多语言工具
export function generateHreflangTags(currentPath: string): Array<{
  hreflang: string;
  href: string;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lianjinled.com';
  
  return SUPPORTED_LANGUAGES.map(lang => ({
    hreflang: lang === 'zh' ? 'zh-CN' : lang,
    href: `${baseUrl}${generateLocalizedUrl(currentPath, lang)}`,
  }));
}

// 生成多语言sitemap条目
export function generateSitemapEntries(paths: string[]): Array<{
  url: string;
  language: Language;
  alternates: Array<{ language: Language; url: string }>;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lianjinled.com';
  
  return paths.flatMap(path => 
    SUPPORTED_LANGUAGES.map(lang => ({
      url: `${baseUrl}${generateLocalizedUrl(path, lang)}`,
      language: lang,
      alternates: SUPPORTED_LANGUAGES.map(altLang => ({
        language: altLang,
        url: `${baseUrl}${generateLocalizedUrl(path, altLang)}`,
      })),
    }))
  );
}

// 语言方向
export function getLanguageDirection(language: Language): 'ltr' | 'rtl' {
  return LANGUAGES[language].dir;
}

// 获取语言的本地化名称
export function getLanguageNativeName(language: Language): string {
  return LANGUAGES[language].nativeName;
}

// 获取语言标志
export function getLanguageFlag(language: Language): string {
  return LANGUAGES[language].flag;
}