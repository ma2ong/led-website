'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';

export interface SpecGroup {
  name: string;
  specs: {
    name: string;
    value: string;
  }[];
}

export interface TechnicalSpecsProps {
  specGroups: SpecGroup[];
  locale: Locale;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

export function TechnicalSpecs({
  specGroups,
  locale,
  className,
  variant = 'default',
}: TechnicalSpecsProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(specGroups.map(group => [group.name, true]))
  );
  
  // 切换规格组的展开/折叠状态
  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };
  
  // 翻译函数
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'zh-Hans': {
        'technicalSpecs': '技术规格',
        'general': '基本参数',
        'physical': '物理参数',
        'electrical': '电气参数',
        'optical': '光学参数',
        'control': '控制参数',
        'environmental': '环境参数',
      },
      'en': {
        'technicalSpecs': 'Technical Specifications',
        'general': 'General',
        'physical': 'Physical',
        'electrical': 'Electrical',
        'optical': 'Optical',
        'control': 'Control',
        'environmental': 'Environmental',
      }
    };
    
    return translations[locale]?.[key] || key;
  };
  
  // 紧凑型布局
  if (variant === 'compact') {
    return (
      <div className={cn("bg-white", className)}>
        <h3 className="text-base font-semibold text-gray-900 mb-4">{t('technicalSpecs')}</h3>
        <div className="overflow-hidden rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {specGroups.flatMap(group => 
                group.specs.map((spec, index) => (
                  <tr key={`${group.name}-${spec.name}-${index}`}>
                    <td className="whitespace-nowrap py-2 px-4 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                      {spec.name}
                    </td>
                    <td className="whitespace-nowrap py-2 px-4 text-sm text-gray-500">
                      {spec.value}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  // 详细布局
  if (variant === 'detailed') {
    return (
      <div className={cn("bg-white", className)}>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('technicalSpecs')}</h2>
        
        <div className="space-y-6">
          {specGroups.map((group) => (
            <div key={group.name} className="overflow-hidden rounded-lg border border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between bg-gray-50 px-6 py-3 text-left"
                onClick={() => toggleGroup(group.name)}
              >
                <h3 className="text-base font-medium text-gray-900">
                  {t(group.name.toLowerCase()) || group.name}
                </h3>
                <ChevronDownIcon
                  className={cn(
                    "h-5 w-5 text-gray-500 transition-transform",
                    expandedGroups[group.name] ? "rotate-180" : ""
                  )}
                />
              </button>
              
              {expandedGroups[group.name] && (
                <div className="px-6 py-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.specs.map((spec, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4">
                        <dt className="text-sm font-medium text-gray-500">{spec.name}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // 默认布局
  return (
    <div className={cn("bg-white", className)}>
      <h3 className="text-base font-semibold text-gray-900 mb-4">{t('technicalSpecs')}</h3>
      
      <div className="space-y-4">
        {specGroups.map((group) => (
          <div key={group.name} className="overflow-hidden rounded-md border border-gray-200">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-gray-50 px-4 py-2 text-left"
              onClick={() => toggleGroup(group.name)}
            >
              <h4 className="text-sm font-medium text-gray-900">
                {t(group.name.toLowerCase()) || group.name}
              </h4>
              <ChevronDownIcon
                className={cn(
                  "h-5 w-5 text-gray-500 transition-transform",
                  expandedGroups[group.name] ? "rotate-180" : ""
                )}
              />
            </button>
            
            {expandedGroups[group.name] && (
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {group.specs.map((spec, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-2 px-4 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                          {spec.name}
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-500">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}