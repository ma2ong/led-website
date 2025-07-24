'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { OptimizedImage } from '../ui/optimized-image';
import { Badge } from '../ui/badge';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';

export interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  pixelPitch?: string;
  brightness?: string;
  thumbnailUrl: string;
  isNew?: boolean;
  isFeatured?: boolean;
  locale: Locale;
  variant?: 'default' | 'compact' | 'featured' | 'grid';
  className?: string;
}

export function ProductCard({
  id,
  slug,
  title,
  description,
  category,
  pixelPitch,
  brightness,
  thumbnailUrl,
  isNew = false,
  isFeatured = false,
  locale,
  variant = 'default',
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 构建产品详情页URL
  const productUrl = `/${locale}/products/${slug}`;
  
  // 根据变体选择不同的布局
  if (variant === 'compact') {
    return (
      <Link 
        href={productUrl}
        className={cn(
          "group block relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{title}</h3>
          {pixelPitch && (
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'zh-Hans' ? '点间距: ' : 'Pixel Pitch: '}{pixelPitch}
            </p>
          )}
        </div>
        {isNew && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            {locale === 'zh-Hans' ? '新品' : 'New'}
          </Badge>
        )}
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <div 
        className={cn(
          "group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
          {isNew && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              {locale === 'zh-Hans' ? '新品' : 'New'}
            </Badge>
          )}
          {isFeatured && (
            <Badge variant="primary" className="absolute top-3 right-3">
              {locale === 'zh-Hans' ? '推荐' : 'Featured'}
            </Badge>
          )}
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{category}</p>
            </div>
          </div>
          
          {description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
          
          <div className="mt-4 flex flex-wrap gap-2">
            {pixelPitch && (
              <Badge variant="outline">
                {locale === 'zh-Hans' ? '点间距: ' : 'Pixel Pitch: '}{pixelPitch}
              </Badge>
            )}
            {brightness && (
              <Badge variant="outline">
                {locale === 'zh-Hans' ? '亮度: ' : 'Brightness: '}{brightness}
              </Badge>
            )}
          </div>
          
          <Link 
            href={productUrl}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '了解详情' : 'Learn more'}
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }
  
  if (variant === 'grid') {
    return (
      <div 
        className={cn(
          "group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-w-1 aspect-h-1 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
          {isNew && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              {locale === 'zh-Hans' ? '新品' : 'New'}
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-medium text-gray-900 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{category}</p>
          
          <div className="mt-3 space-y-1">
            {pixelPitch && (
              <p className="text-xs text-gray-600">
                {locale === 'zh-Hans' ? '点间距: ' : 'Pixel Pitch: '}{pixelPitch}
              </p>
            )}
            {brightness && (
              <p className="text-xs text-gray-600">
                {locale === 'zh-Hans' ? '亮度: ' : 'Brightness: '}{brightness}
              </p>
            )}
          </div>
          
          <Link 
            href={productUrl}
            className="mt-3 inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '查看详情' : 'View details'}
            <ChevronRightIcon className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    );
  }
  
  // 默认卡片样式
  return (
    <div 
      className={cn(
        "group flex flex-col md:flex-row rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="md:w-1/3 relative">
        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className={cn(
              "object-cover transition-transform duration-300",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
        </div>
        {isNew && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            {locale === 'zh-Hans' ? '新品' : 'New'}
          </Badge>
        )}
      </div>
      
      <div className="p-5 md:w-2/3 flex flex-col">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{category}</p>
        </div>
        
        {description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
        )}
        
        <div className="mt-4 flex flex-wrap gap-2">
          {pixelPitch && (
            <Badge variant="outline">
              {locale === 'zh-Hans' ? '点间距: ' : 'Pixel Pitch: '}{pixelPitch}
            </Badge>
          )}
          {brightness && (
            <Badge variant="outline">
              {locale === 'zh-Hans' ? '亮度: ' : 'Brightness: '}{brightness}
            </Badge>
          )}
        </div>
        
        <div className="mt-auto pt-4">
          <Link 
            href={productUrl}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '了解详情' : 'Learn more'}
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}