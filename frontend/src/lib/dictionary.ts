'use server';

import 'server-only';
import type { Locale } from './i18n-config';

// 定义字典类型
export type Dictionary = {
  common: {
    navigation: Record<string, string>;
    buttons: Record<string, string>;
    footer: Record<string, string>;
    search: Record<string, string>;
    pagination: Record<string, string>;
    notFound: Record<string, string>;
    error: Record<string, string>;
    loading: string;
  };
  home: {
    hero: Record<string, string>;
    products: Record<string, string>;
    cases: Record<string, string>;
    about: Record<string, string>;
    features: {
      title: string;
      subtitle: string;
      quality: Record<string, string>;
      innovation: Record<string, string>;
      service: Record<string, string>;
      experience: Record<string, string>;
    };
    testimonials: Record<string, string>;
    contact: {
      title: string;
      subtitle: string;
      form: Record<string, string>;
    };
  };
  products: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    filter: Record<string, string>;
    sort: Record<string, string>;
    detail: Record<string, string>;
  };
  cases: {
    title: string;
    subtitle: string;
    filter: Record<string, string>;
    industries: Record<string, string>;
    regions: Record<string, string>;
    detail: Record<string, string>;
  };
  news: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
    readMore: string;
    publishedOn: string;
    author: string;
    relatedNews: string;
    relatedProducts: string;
  };
  about: {
    title: string;
    subtitle: string;
    company: Record<string, string>;
    values: Record<string, string>;
    mission: Record<string, string>;
    vision: Record<string, string>;
  };
  contact: {
    title: string;
    subtitle: string;
    info: Record<string, string>;
    form: Record<string, string>;
    locations: Record<string, string>;
    faq: Record<string, string>;
  };
};

// 获取字典函数
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    // 动态导入对应语言的字典文件
    return (await import(`../dictionaries/${locale}.json`)).default as Dictionary;
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // 如果加载失败，尝试加载默认语言
    try {
      return (await import(`../dictionaries/zh-Hans.json`)).default as Dictionary;
    } catch (fallbackError) {
      console.error('Failed to load fallback dictionary', fallbackError);
      throw new Error(`Failed to load dictionary for ${locale}`);
    }
  }
}