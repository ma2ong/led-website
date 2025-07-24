'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { OptimizedImage } from '../ui/optimized-image';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductForComparison {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  category: string;
  specs: ProductSpec[];
}

export interface ProductComparisonProps {
  products: ProductForComparison[];
  availableProducts: ProductForComparison[];
  locale: Locale;
  className?: string;
  onAddProduct?: (productId: string) => void;
  onRemoveProduct?: (productId: string) => void;
}

export function ProductComparison({
  products,
  availableProducts,
  locale,
  className,
  onAddProduct,
  onRemoveProduct,
}: ProductComparisonProps) {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(availableProducts);
  
  // 当可用产品列表变化时更新过滤后的产品列表
  useEffect(() => {
    setFilteredProducts(availableProducts);
  }, [availableProducts]);
  
  // 搜索产品
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredProducts(availableProducts);
      return;
    }
    
    const filtered = availableProducts.filter(product => 
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };
  
  // 添加产品到比较列表
  const handleAddProduct = (productId: string) => {
    if (onAddProduct) {
      onAddProduct(productId);
    }
    setIsAddProductOpen(false);
    setSearchTerm('');
  };
  
  // 从比较列表中移除产品
  const handleRemoveProduct = (productId: string) => {
    if (onRemoveProduct) {
      onRemoveProduct(productId);
    }
  };
  
  // 获取所有规格名称
  const getAllSpecNames = () => {
    const specNames = new Set<string>();
    products.forEach(product => {
      product.specs.forEach(spec => {
        specNames.add(spec.name);
      });
    });
    return Array.from(specNames);
  };
  
  const specNames = getAllSpecNames();
  
  // 翻译函数
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'zh-Hans': {
        'comparison': '产品对比',
        'addProduct': '添加产品',
        'removeProduct': '移除',
        'searchPlaceholder': '搜索产品...',
        'noProducts': '没有产品可供比较',
        'noResults': '没有找到匹配的产品',
        'category': '分类',
        'specifications': '技术规格',
      },
      'en': {
        'comparison': 'Product Comparison',
        'addProduct': 'Add Product',
        'removeProduct': 'Remove',
        'searchPlaceholder': 'Search products...',
        'noProducts': 'No products to compare',
        'noResults': 'No matching products found',
        'category': 'Category',
        'specifications': 'Specifications',
      }
    };
    
    return translations[locale]?.[key] || key;
  };
  
  return (
    <div className={cn("bg-white", className)}>
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-lg font-medium leading-6 text-gray-900">{t('comparison')}</h2>
      </div>
      
      {products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">{t('noProducts')}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            onClick={() => setIsAddProductOpen(true)}
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            {t('addProduct')}
          </button>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden">
          <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(200px,1fr))]">
            {/* 表头 */}
            <div className="border-r border-gray-200 bg-gray-50 p-4">
              <div className="h-40"></div>
              <div className="py-3 font-medium">{t('category')}</div>
              <div className="border-t border-gray-200 py-6">
                <h3 className="font-medium">{t('specifications')}</h3>
              </div>
              {specNames.map((specName) => (
                <div key={specName} className="border-t border-gray-200 py-3">
                  {specName}
                </div>
              ))}
            </div>
            
            {/* 产品列 */}
            {products.map((product) => (
              <div key={product.id} className="border-r border-gray-200 p-4">
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1 mb-4">
                    <OptimizedImage
                      src={product.thumbnailUrl}
                      alt={product.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded-full bg-white p-1 text-gray-400 shadow-sm hover:text-gray-500"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <span className="sr-only">{t('removeProduct')}</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="py-3 text-sm text-gray-500">{product.category}</div>
                <div className="border-t border-gray-200 py-6"></div>
                {specNames.map((specName) => {
                  const spec = product.specs.find(s => s.name === specName);
                  return (
                    <div key={specName} className="border-t border-gray-200 py-3 text-sm text-gray-500">
                      {spec ? spec.value : '-'}
                    </div>
                  );
                })}
              </div>
            ))}
            
            {/* 添加产品按钮 */}
            {products.length < 4 && (
              <div className="border-r border-gray-200 p-4">
                <div className="flex h-40 items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsAddProductOpen(true)}
                  >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    {t('addProduct')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 添加产品弹窗 */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25" 
            onClick={() => setIsAddProductOpen(false)}
          />
          
          {/* 弹窗内容 */}
          <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{t('addProduct')}</h3>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={() => setIsAddProductOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* 搜索框 */}
            <div className="mb-4">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            {/* 产品列表 */}
            <div className="max-h-80 overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-500">{t('noResults')}</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <li key={product.id} className="py-4">
                      <button
                        type="button"
                        className="flex w-full items-center text-left"
                        onClick={() => handleAddProduct(product.id)}
                      >
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <OptimizedImage
                            src={product.thumbnailUrl}
                            alt={product.title}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                        <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}