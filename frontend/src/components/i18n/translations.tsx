import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/types/i18n';

interface TranslationsProps {
  locale: Locale;
  namespace: string;
  keyPath: string;
  fallback?: string;
}

/**
 * 服务器组件，用于在服务器组件中获取翻译
 * 
 * @example
 * <Translations locale={locale} namespace="common" keyPath="buttons.submit" />
 */
export async function Translations({
  locale,
  namespace,
  keyPath,
  fallback = '',
}: TranslationsProps) {
  const dictionary = await getDictionary(locale);
  
  // 获取命名空间
  const namespacedDict = dictionary[namespace];
  if (!namespacedDict) return <>{fallback}</>;
  
  // 获取键路径
  const keys = keyPath.split('.');
  let value = namespacedDict;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return <>{fallback}</>;
    }
  }
  
  return <>{typeof value === 'string' ? value : fallback}</>;
}

/**
 * 服务器组件，用于在服务器组件中获取整个字典
 * 
 * @example
 * const dict = await getDictionaryProps(locale);
 * return <Component dict={dict} />;
 */
export async function getDictionaryProps(locale: Locale) {
  const dictionary = await getDictionary(locale);
  return dictionary;
}