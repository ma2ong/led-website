'use client';

import { useCallback, useEffect, useState } from 'react';
import { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/dictionary';

/**
 * 客户端字典钩子，用于获取和缓存翻译字典
 */
export function useDictionary(locale: Locale) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 加载字典函数
  const loadDictionary = useCallback(async (localeToLoad: Locale) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 从API获取字典数据
      const response = await fetch(`/api/dictionary?locale=${localeToLoad}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.statusText}`);
      }
      
      const data = await response.json();
      setDictionary(data);
    } catch (err) {
      console.error('Error loading dictionary:', err);
      setError(err instanceof Error ? err : new Error('Failed to load dictionary'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初始加载字典
  useEffect(() => {
    loadDictionary(locale);
  }, [locale, loadDictionary]);

  // 翻译函数
  const t = useCallback((key: string, params?: Record<string, string>) => {
    if (!dictionary) return key;
    
    // 支持嵌套键路径，如 'common.buttons.submit'
    const keys = key.split('.');
    let value: any = dictionary;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 如果找不到键，返回原始键
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // 处理参数替换，如 'Hello, {name}!'
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(new RegExp(`{${paramKey}}`, 'g'), paramValue),
        value
      );
    }
    
    return value;
  }, [dictionary]);

  return {
    dictionary,
    isLoading,
    error,
    t,
    loadDictionary,
  };
}