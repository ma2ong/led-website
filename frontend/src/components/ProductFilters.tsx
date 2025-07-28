'use client';

import { useState, useEffect } from 'react';
import { FadeInLeft } from '@/components/AnimatedSection';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  applications: FilterOption[];
  priceRanges: FilterOption[];
  onFiltersChange: (filters: ProductFilters) => void;
  className?: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  application: string;
  priceRange: string;
  inStock: boolean;
  sortBy: string;
}

export default function ProductFilters({
  categories,
  applications,
  priceRanges,
  onFiltersChange,
  className = '',
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    application: '',
    priceRange: '',
    inStock: false,
    sortBy: 'name',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // 排序选项
  const sortOptions = [
    { value: 'name', label: '按名称排序' },
    { value: 'price-low', label: '价格从低到高' },
    { value: 'price-high', label: '价格从高到低' },
    { value: 'newest', label: '最新产品' },
    { value: 'popular', label: '热门产品' },
  ];

  // 更新筛选条件
  const updateFilter = (key: keyof ProductFilters, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  // 清除所有筛选
  const clearFilters = () => {
    const defaultFilters: ProductFilters = {
      search: '',
      category: '',
      application: '',
      priceRange: '',
      inStock: false,
      sortBy: 'name',
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  // 检查是否有活跃的筛选条件
  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.category ||
      filters.application ||
      filters.priceRange ||
      filters.inStock ||
      filters.sortBy !== 'name'
    );
  };

  return (
    <FadeInLeft className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      {/* 筛选标题和展开按钮 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="mr-2">🔍</span>
          产品筛选
        </h3>
        <div className="flex items-center gap-3">
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
            >
              清除筛选
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-white hover:text-orange-400 transition-colors"
          >
            {isExpanded ? '收起' : '展开'}
          </button>
        </div>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* 搜索框 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            搜索产品
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="输入产品名称或关键词..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            {filters.search && (
              <button
                onClick={() => updateFilter('search', '')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 产品分类 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            产品分类
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">所有分类</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
                {category.count && ` (${category.count})`}
              </option>
            ))}
          </select>
        </div>

        {/* 应用场景 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            应用场景
          </label>
          <select
            value={filters.application}
            onChange={(e) => updateFilter('application', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">所有场景</option>
            {applications.map((app) => (
              <option key={app.value} value={app.value}>
                {app.label}
                {app.count && ` (${app.count})`}
              </option>
            ))}
          </select>
        </div>

        {/* 价格范围 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            价格范围
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilter('priceRange', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">所有价格</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
                {range.count && ` (${range.count})`}
              </option>
            ))}
          </select>
        </div>

        {/* 库存状态 */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilter('inStock', e.target.checked)}
              className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
            />
            <span className="text-sm text-gray-300">仅显示有库存产品</span>
          </label>
        </div>

        {/* 排序方式 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            排序方式
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 快速筛选标签 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            快速筛选
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateFilter('category', 'fine-pitch')}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filters.category === 'fine-pitch'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              小间距
            </button>
            <button
              onClick={() => updateFilter('category', 'outdoor')}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filters.category === 'outdoor'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              户外屏
            </button>
            <button
              onClick={() => updateFilter('category', 'rental')}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filters.category === 'rental'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              租赁屏
            </button>
            <button
              onClick={() => updateFilter('inStock', true)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filters.inStock
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              现货
            </button>
          </div>
        </div>
      </div>

      {/* 活跃筛选条件显示 */}
      {hasActiveFilters() && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">当前筛选:</span>
            <span className="text-xs text-gray-400">
              {Object.values(filters).filter(Boolean).length} 个条件
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 text-xs bg-orange-500 text-white px-2 py-1 rounded">
                搜索: {filters.search}
                <button
                  onClick={() => updateFilter('search', '')}
                  className="hover:text-orange-200"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                分类: {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => updateFilter('category', '')}
                  className="hover:text-blue-200"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.application && (
              <span className="inline-flex items-center gap-1 text-xs bg-purple-500 text-white px-2 py-1 rounded">
                场景: {applications.find(a => a.value === filters.application)?.label}
                <button
                  onClick={() => updateFilter('application', '')}
                  className="hover:text-purple-200"
                >
                  ✕
                </button>
              </span>
            )}
            {filters.inStock && (
              <span className="inline-flex items-center gap-1 text-xs bg-green-500 text-white px-2 py-1 rounded">
                有库存
                <button
                  onClick={() => updateFilter('inStock', false)}
                  className="hover:text-green-200"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </FadeInLeft>
  );
}

// 移动端筛选抽屉组件
interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  children,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 抽屉内容 */}
      <div className="absolute right-0 top-0 h-full w-80 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">筛选产品</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}