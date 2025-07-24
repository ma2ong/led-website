/**
 * 支持的语言列表
 */
export const locales = ['zh-Hans', 'en'] as const;

/**
 * 语言类型
 */
export type Locale = typeof locales[number];

/**
 * 默认语言
 */
export const defaultLocale: Locale = 'zh-Hans';

/**
 * 检查是否为有效的语言代码
 * @param locale 要检查的语言代码
 * @returns 是否为有效的语言代码
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * 字典类型
 */
export interface Dictionary {
  common: {
    navigation: {
      home: string;
      products: string;
      cases: string;
      news: string;
      about: string;
      contact: string;
    };
    buttons: {
      readMore: string;
      viewAll: string;
      submit: string;
      send: string;
      download: string;
      learnMore: string;
      contactUs: string;
      getQuote: string;
      viewDetails: string;
      back: string;
      next: string;
      previous: string;
    };
    footer: {
      allRightsReserved: string;
      privacyPolicy: string;
      termsOfService: string;
      contactUs: string;
      followUs: string;
    };
    search: {
      placeholder: string;
      noResults: string;
      searchResults: string;
      search: string;
    };
    pagination: {
      previous: string;
      next: string;
      page: string;
      of: string;
    };
    notFound: {
      title: string;
      description: string;
      backToHome: string;
    };
    error: {
      title: string;
      description: string;
      retry: string;
      backToHome: string;
    };
    loading: string;
  };
  [key: string]: any;
}