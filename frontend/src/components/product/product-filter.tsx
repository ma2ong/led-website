'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '../ui/badge';
import { Locale } from '@/lib/i18n-config';

export interface ProductFilterProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
  }>;
  currentFilters: {
    category?: string;
    search?: string;
    pixelPitch?: string;
    application?: string;
  };
  locale: Locale;
  className?: string;
}

export function ProductFilter({
  categories,
  currentFilters,
  locale,
  className,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to first page when filters change
    params.delete('page');
    
    const newUrl = `/${locale}/products?${params.toString()}`;
    router.push(newUrl);
  };

  const clearAllFilters = () => {
    router.push(`/${locale}/products`);
    setSearchTerm('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', searchTerm || null);
  };

  const hasActiveFilters = Object.values(currentFilters).some(value => value);

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder={locale === 'zh-Hans' ? '搜索产品...' : 'Search products...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </form>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('category', null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !currentFilters.category
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {locale === 'zh-Hans' ? '全部' : 'All'}
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilter('category', category.slug)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                currentFilters.category === category.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {locale === 'zh-Hans' ? '清除筛选' : 'Clear filters'}
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">
            {locale === 'zh-Hans' ? '当前筛选:' : 'Active filters:'}
          </span>
          
          {currentFilters.category && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer"
              onClick={() => updateFilter('category', null)}
            >
              {categories.find(c => c.slug === currentFilters.category)?.name}
              <span className="ml-1">×</span>
            </Badge>
          )}
          
          {currentFilters.search && (
            <Badge 
              variant="secondary" 
              className="cursor-pointer"
              onClick={() => updateFilter('search', null)}
            >
              {locale === 'zh-Hans' ? '搜索: ' : 'Search: '}{currentFilters.search}
              <span className="ml-1">×</span>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}