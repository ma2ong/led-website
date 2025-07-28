// 动态内容翻译系统
import { Language } from './translations';
import { enhancedApi } from '../services/apiEnhanced';

// 翻译内容类型定义
export interface TranslatableContent {
  id: string;
  type: 'product' | 'news' | 'case_study' | 'page' | 'general';
  fields: Record<string, TranslatableField>;
  metadata?: {
    lastUpdated: string;
    version: number;
    status: 'draft' | 'published' | 'archived';
  };
}

export interface TranslatableField {
  zh: string;
  en?: string;
  type: 'text' | 'html' | 'markdown';
  required: boolean;
  maxLength?: number;
  fallback?: string;
}

// 翻译缓存管理
class TranslationCache {
  private cache = new Map<string, { 
    content: any; 
    timestamp: number; 
    ttl: number;
    language: Language;
  }>();
  
  private readonly DEFAULT_TTL = 30 * 60 * 1000; // 30分钟

  set(key: string, content: any, language: Language, ttl: number = this.DEFAULT_TTL) {
    this.cache.set(`${key}:${language}`, {
      content,
      timestamp: Date.now(),
      ttl,
      language
    });
  }

  get(key: string, language: Language): any | null {
    const item = this.cache.get(`${key}:${language}`);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(`${key}:${language}`);
      return null;
    }

    return item.content;
  }

  invalidate(key?: string, language?: Language) {
    if (!key) {
      this.cache.clear();
      return;
    }

    if (language) {
      this.cache.delete(`${key}:${language}`);
    } else {
      // 删除所有语言版本
      for (const cacheKey of this.cache.keys()) {
        if (cacheKey.startsWith(`${key}:`)) {
          this.cache.delete(cacheKey);
        }
      }
    }
  }

  getStats() {
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;

    for (const item of this.cache.values()) {
      if (now - item.timestamp > item.ttl) {
        expiredCount++;
      } else {
        validCount++;
      }
    }

    return {
      total: this.cache.size,
      valid: validCount,
      expired: expiredCount
    };
  }
}

const translationCache = new TranslationCache();

// 翻译服务类
export class ContentTranslationService {
  private fallbackLanguage: Language = 'zh';
  private autoTranslateEnabled = false;
  private translationQueue: Array<{
    contentId: string;
    field: string;
    sourceLanguage: Language;
    targetLanguage: Language;
    priority: 'high' | 'normal' | 'low';
  }> = [];

  constructor(options?: {
    fallbackLanguage?: Language;
    autoTranslateEnabled?: boolean;
  }) {
    if (options?.fallbackLanguage) {
      this.fallbackLanguage = options.fallbackLanguage;
    }
    if (options?.autoTranslateEnabled !== undefined) {
      this.autoTranslateEnabled = options.autoTranslateEnabled;
    }
  }

  // 获取翻译内容
  async getTranslatedContent<T = any>(
    contentId: string,
    language: Language,
    options?: {
      useCache?: boolean;
      fallbackToDefault?: boolean;
      fields?: string[];
    }
  ): Promise<T | null> {
    const {
      useCache = true,
      fallbackToDefault = true,
      fields
    } = options || {};

    // 检查缓存
    if (useCache) {
      const cached = translationCache.get(contentId, language);
      if (cached) {
        return this.filterFields(cached, fields);
      }
    }

    try {
      // 从API获取内容
      const response = await enhancedApi.get<{ data: TranslatableContent }>(
        `/translations/${contentId}?lang=${language}`,
        {
          cache: useCache,
          cacheTTL: 30 * 60 * 1000,
          cacheTags: ['translations', contentId]
        }
      );

      if (!response.data) {
        if (fallbackToDefault && language !== this.fallbackLanguage) {
          return this.getTranslatedContent(contentId, this.fallbackLanguage, {
            ...options,
            fallbackToDefault: false
          });
        }
        return null;
      }

      const translatedContent = this.processTranslatableContent(
        response.data,
        language,
        fallbackToDefault
      );

      // 缓存结果
      if (useCache) {
        translationCache.set(contentId, translatedContent, language);
      }

      return this.filterFields(translatedContent, fields);
    } catch (error) {
      console.error('获取翻译内容失败:', error);
      
      // 如果获取失败且允许回退，尝试获取默认语言内容
      if (fallbackToDefault && language !== this.fallbackLanguage) {
        return this.getTranslatedContent(contentId, this.fallbackLanguage, {
          ...options,
          fallbackToDefault: false
        });
      }
      
      return null;
    }
  }

  // 批量获取翻译内容
  async getBatchTranslatedContent<T = any>(
    contentIds: string[],
    language: Language,
    options?: {
      useCache?: boolean;
      fallbackToDefault?: boolean;
      fields?: string[];
    }
  ): Promise<Record<string, T | null>> {
    const results: Record<string, T | null> = {};
    
    // 并发获取所有内容
    const promises = contentIds.map(async (id) => {
      const content = await this.getTranslatedContent<T>(id, language, options);
      return { id, content };
    });

    const responses = await Promise.all(promises);
    
    responses.forEach(({ id, content }) => {
      results[id] = content;
    });

    return results;
  }

  // 更新翻译内容
  async updateTranslatedContent(
    contentId: string,
    language: Language,
    updates: Record<string, any>
  ): Promise<boolean> {
    try {
      await enhancedApi.put(
        `/translations/${contentId}`,
        {
          language,
          updates
        },
        {
          cacheTags: ['translations', contentId]
        }
      );

      // 清除相关缓存
      translationCache.invalidate(contentId, language);
      
      // 清除API缓存
      enhancedApi.cache.clearByTag(contentId);

      return true;
    } catch (error) {
      console.error('更新翻译内容失败:', error);
      return false;
    }
  }

  // 自动翻译
  async autoTranslate(
    contentId: string,
    sourceLanguage: Language,
    targetLanguage: Language,
    fields?: string[]
  ): Promise<boolean> {
    if (!this.autoTranslateEnabled) {
      console.warn('自动翻译功能未启用');
      return false;
    }

    try {
      const response = await enhancedApi.post('/translations/auto-translate', {
        contentId,
        sourceLanguage,
        targetLanguage,
        fields
      });

      if (response.success) {
        // 清除缓存以获取最新翻译
        translationCache.invalidate(contentId, targetLanguage);
        return true;
      }

      return false;
    } catch (error) {
      console.error('自动翻译失败:', error);
      return false;
    }
  }

  // 添加到翻译队列
  addToTranslationQueue(
    contentId: string,
    field: string,
    sourceLanguage: Language,
    targetLanguage: Language,
    priority: 'high' | 'normal' | 'low' = 'normal'
  ) {
    this.translationQueue.push({
      contentId,
      field,
      sourceLanguage,
      targetLanguage,
      priority
    });

    // 按优先级排序
    this.translationQueue.sort((a, b) => {
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // 处理翻译队列
  async processTranslationQueue(): Promise<void> {
    if (this.translationQueue.length === 0) return;

    const batch = this.translationQueue.splice(0, 5); // 每次处理5个
    
    const promises = batch.map(async (item) => {
      try {
        await this.autoTranslate(
          item.contentId,
          item.sourceLanguage,
          item.targetLanguage,
          [item.field]
        );
      } catch (error) {
        console.error('处理翻译队列项失败:', error);
      }
    });

    await Promise.all(promises);

    // 如果还有待处理项，继续处理
    if (this.translationQueue.length > 0) {
      setTimeout(() => this.processTranslationQueue(), 1000);
    }
  }

  // 获取翻译状态
  async getTranslationStatus(contentId: string): Promise<{
    languages: Language[];
    completeness: Record<Language, number>;
    lastUpdated: Record<Language, string>;
  }> {
    try {
      const response = await enhancedApi.get(`/translations/${contentId}/status`);
      return response.data;
    } catch (error) {
      console.error('获取翻译状态失败:', error);
      return {
        languages: ['zh'],
        completeness: { zh: 100 },
        lastUpdated: { zh: new Date().toISOString() }
      };
    }
  }

  // 验证翻译完整性
  async validateTranslations(contentId: string): Promise<{
    isValid: boolean;
    missingTranslations: Array<{
      language: Language;
      field: string;
      reason: string;
    }>;
    suggestions: string[];
  }> {
    try {
      const response = await enhancedApi.get(`/translations/${contentId}/validate`);
      return response.data;
    } catch (error) {
      console.error('验证翻译失败:', error);
      return {
        isValid: false,
        missingTranslations: [],
        suggestions: []
      };
    }
  }

  // 导出翻译
  async exportTranslations(
    contentIds: string[],
    language: Language,
    format: 'json' | 'csv' | 'xlsx' = 'json'
  ): Promise<Blob | null> {
    try {
      const response = await fetch(`/api/translations/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentIds,
          language,
          format
        })
      });

      if (!response.ok) {
        throw new Error('导出失败');
      }

      return response.blob();
    } catch (error) {
      console.error('导出翻译失败:', error);
      return null;
    }
  }

  // 导入翻译
  async importTranslations(
    file: File,
    language: Language,
    options?: {
      overwrite?: boolean;
      validate?: boolean;
    }
  ): Promise<{
    success: boolean;
    imported: number;
    errors: string[];
  }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);
      formData.append('options', JSON.stringify(options || {}));

      const response = await fetch('/api/translations/import', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        // 清除所有翻译缓存
        translationCache.invalidate();
      }

      return result;
    } catch (error) {
      console.error('导入翻译失败:', error);
      return {
        success: false,
        imported: 0,
        errors: ['导入过程中发生错误']
      };
    }
  }

  // 私有方法：处理可翻译内容
  private processTranslatableContent(
    content: TranslatableContent,
    language: Language,
    fallbackToDefault: boolean
  ): any {
    const result: any = {
      id: content.id,
      type: content.type,
      metadata: content.metadata
    };

    Object.entries(content.fields).forEach(([fieldName, field]) => {
      let value = field[language];
      
      // 如果目标语言没有内容，尝试回退
      if (!value && fallbackToDefault) {
        value = field[this.fallbackLanguage] || field.fallback || '';
      }

      result[fieldName] = value || '';
    });

    return result;
  }

  // 私有方法：过滤字段
  private filterFields<T>(content: T, fields?: string[]): T {
    if (!fields || !content || typeof content !== 'object') {
      return content;
    }

    const filtered: any = {};
    fields.forEach(field => {
      if (field in content) {
        filtered[field] = (content as any)[field];
      }
    });

    return filtered as T;
  }

  // 缓存管理
  clearCache(contentId?: string, language?: Language) {
    translationCache.invalidate(contentId, language);
  }

  getCacheStats() {
    return translationCache.getStats();
  }
}

// 创建默认翻译服务实例
export const contentTranslationService = new ContentTranslationService({
  fallbackLanguage: 'zh',
  autoTranslateEnabled: false
});

// 便捷函数
export const getTranslatedContent = <T = any>(
  contentId: string,
  language: Language,
  options?: any
) => contentTranslationService.getTranslatedContent<T>(contentId, language, options);

export const getBatchTranslatedContent = <T = any>(
  contentIds: string[],
  language: Language,
  options?: any
) => contentTranslationService.getBatchTranslatedContent<T>(contentIds, language, options);

// React Hook 支持
export function useTranslatedContent<T = any>(
  contentId: string,
  language: Language,
  options?: {
    useCache?: boolean;
    fallbackToDefault?: boolean;
    fields?: string[];
  }
) {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await getTranslatedContent<T>(contentId, language, options);
        
        if (isMounted) {
          setContent(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : '加载失败');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [contentId, language, JSON.stringify(options)]);

  return { content, loading, error };
}

// 翻译质量检查
export class TranslationQualityChecker {
  // 检查翻译质量
  static checkQuality(
    original: string,
    translated: string,
    sourceLanguage: Language,
    targetLanguage: Language
  ): {
    score: number;
    issues: Array<{
      type: 'length' | 'format' | 'terminology' | 'grammar';
      severity: 'low' | 'medium' | 'high';
      message: string;
    }>;
  } {
    const issues: any[] = [];
    let score = 100;

    // 长度检查
    const lengthRatio = translated.length / original.length;
    if (lengthRatio < 0.3 || lengthRatio > 3) {
      issues.push({
        type: 'length',
        severity: 'medium',
        message: '翻译长度与原文差异较大'
      });
      score -= 20;
    }

    // 格式检查
    const originalHasTags = /<[^>]+>/.test(original);
    const translatedHasTags = /<[^>]+>/.test(translated);
    if (originalHasTags !== translatedHasTags) {
      issues.push({
        type: 'format',
        severity: 'high',
        message: 'HTML标签格式不一致'
      });
      score -= 30;
    }

    // 术语一致性检查（简单实现）
    const technicalTerms = ['LED', 'LCD', 'OLED', 'RGB', '4K', '8K'];
    technicalTerms.forEach(term => {
      const originalCount = (original.match(new RegExp(term, 'gi')) || []).length;
      const translatedCount = (translated.match(new RegExp(term, 'gi')) || []).length;
      
      if (originalCount !== translatedCount) {
        issues.push({
          type: 'terminology',
          severity: 'medium',
          message: `术语"${term}"使用不一致`
        });
        score -= 10;
      }
    });

    return {
      score: Math.max(0, score),
      issues
    };
  }
}

// 自动清理过期缓存
if (typeof window !== 'undefined') {
  setInterval(() => {
    const stats = translationCache.getStats();
    if (stats.expired > 0) {
      console.log(`清理了 ${stats.expired} 个过期的翻译缓存`);
    }
  }, 5 * 60 * 1000); // 每5分钟检查一次
}

export default contentTranslationService;