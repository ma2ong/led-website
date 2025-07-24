'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Locale } from '@/types/i18n';

/**
 * 客户端翻译钩子
 * 用于在客户端组件中获取翻译
 * 
 * @example
 * const { t } = useTranslations();
 * return <button>{t('common.buttons.submit')}</button>;
 */
export function useTranslations() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'zh-Hans';
  const [dictionary, setDictionary] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true);
      try {
        // 动态导入对应语言的字典
        const dict = await import(`@/dictionaries/${locale}.json`).then(
          (module) => module.default
        );
        setDictionary(dict);
      } catch (error) {
        console.error(`Failed to load dictionary for locale: ${locale}`, error);
        // 如果加载失败，尝试加载默认语言
        const defaultDict = await import('@/dictionaries/zh-Hans.json').then(
          (module) => module.default
        );
        setDictionary(defaultDict);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, [locale]);

  /**
   * 获取翻译文本
   * @param path 点分隔的路径，如 'common.buttons.submit'
   * @param fallback 如果找不到对应键值时的回退值
   * @returns 翻译文本
   */
  const t = (path: string, fallback: string = path): string => {
    if (isLoading || !dictionary) return fallback;

    const keys = path.split('.');
    let value = dictionary;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return fallback;
      }
    }

    return typeof value === 'string' ? value : fallback;
  };

  return {
    t,
    locale,
    isLoading,
    dictionary,
  };
}