import { useQuery } from '@tanstack/react-query';
import { caseStudyService, type CaseStudy, getImageUrl, getLocalizedContent } from '@/services/api';

// 查询键工厂
const queryKeys = {
  caseStudies: {
    all: ['case-studies'] as const,
    lists: () => [...queryKeys.caseStudies.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.caseStudies.lists(), filters] as const,
    details: () => [...queryKeys.caseStudies.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.caseStudies.details(), id] as const,
  },
};

// 获取所有案例研究
export function useCaseStudies(params?: {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  industry?: string;
}) {
  return useQuery({
    queryKey: queryKeys.caseStudies.list(params || {}),
    queryFn: () => caseStudyService.getCaseStudies(params),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
}

// 获取单个案例研究
export function useCaseStudy(id: string) {
  return useQuery({
    queryKey: queryKeys.caseStudies.detail(id),
    queryFn: () => caseStudyService.getCaseStudy(parseInt(id)),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10分钟
  });
}

// 获取特色案例研究
export function useFeaturedCaseStudies(limit: number = 6) {
  return useQuery({
    queryKey: queryKeys.caseStudies.list({ pageSize: limit }),
    queryFn: () => caseStudyService.getCaseStudies({ pageSize: limit }),
    staleTime: 10 * 60 * 1000,
  });
}

// 案例研究工具函数
export const caseStudyUtils = {
  // 获取案例主图
  getMainImage: (caseStudy: CaseStudy) => {
    const images = caseStudy.attributes.images?.data;
    if (!images || images.length === 0) return null;
    return getImageUrl({ data: images[0] });
  },

  // 获取案例所有图片
  getAllImages: (caseStudy: CaseStudy) => {
    const images = caseStudy.attributes.images?.data;
    if (!images) return [];
    return images.map(img => ({
      url: getImageUrl({ data: img }),
      alt: img.attributes.alternativeText || caseStudy.attributes.title,
    }));
  },

  // 获取本地化标题
  getLocalizedTitle: (caseStudy: CaseStudy, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(caseStudy.attributes, 'title', language);
  },

  // 获取本地化描述
  getLocalizedDescription: (caseStudy: CaseStudy, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(caseStudy.attributes, 'description', language);
  },

  // 获取本地化挑战
  getLocalizedChallenge: (caseStudy: CaseStudy, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(caseStudy.attributes, 'challenge', language);
  },

  // 获取本地化解决方案
  getLocalizedSolution: (caseStudy: CaseStudy, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(caseStudy.attributes, 'solution', language);
  },

  // 获取本地化结果
  getLocalizedResults: (caseStudy: CaseStudy, language: 'zh' | 'en' = 'zh') => {
    return getLocalizedContent(caseStudy.attributes, 'results', language);
  },

  // 生成案例标签
  generateTags: (caseStudy: CaseStudy) => {
    const tags = [];
    
    if (caseStudy.attributes.industry) {
      tags.push({
        label: caseStudy.attributes.industry,
        type: 'industry',
        color: 'bg-blue-100 text-blue-800',
      });
    }
    
    if (caseStudy.attributes.location) {
      tags.push({
        label: caseStudy.attributes.location,
        type: 'location',
        color: 'bg-green-100 text-green-800',
      });
    }
    
    return tags;
  },

  // 获取相关产品
  getRelatedProducts: (caseStudy: CaseStudy) => {
    return caseStudy.attributes.products?.data || [];
  },
};