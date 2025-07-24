'use client';

import Link from 'next/link';
import { OptimizedImage } from '../ui/optimized-image';
import { Badge } from '../ui/badge';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';

export interface CaseStudyCardProps {
  id: string;
  slug: string;
  title: string;
  description?: string;
  industry?: string;
  location?: string;
  client?: string;
  thumbnailUrl: string;
  locale: Locale;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function CaseStudyCard({
  id,
  slug,
  title,
  description,
  industry,
  location,
  client,
  thumbnailUrl,
  locale,
  variant = 'default',
  className,
}: CaseStudyCardProps) {
  const caseUrl = `/${locale}/case-studies/${slug}`;
  
  if (variant === 'compact') {
    return (
      <Link 
        href={caseUrl}
        className={cn(
          "group block relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
      >
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{title}</h3>
          {industry && (
            <p className="text-xs text-gray-500 mt-1">{industry}</p>
          )}
        </div>
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
      >
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {industry && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              {industry}
            </Badge>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {client && (
            <p className="text-sm text-gray-500 mt-1">
              {locale === 'zh-Hans' ? '客户: ' : 'Client: '}{client}
            </p>
          )}
          {location && (
            <p className="text-sm text-gray-500">
              {locale === 'zh-Hans' ? '地点: ' : 'Location: '}{location}
            </p>
          )}
          
          {description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
          
          <Link 
            href={caseUrl}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '查看案例' : 'View case study'}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }
  
  // Default card style
  return (
    <div 
      className={cn(
        "group flex flex-col md:flex-row rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      <div className="md:w-1/3 relative">
        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
          <OptimizedImage
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      
      <div className="p-5 md:w-2/3 flex flex-col">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {industry && (
              <Badge variant="outline">{industry}</Badge>
            )}
            {location && (
              <Badge variant="outline">{location}</Badge>
            )}
          </div>
        </div>
        
        {description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
        )}
        
        <div className="mt-auto pt-4">
          <Link 
            href={caseUrl}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '查看详情' : 'View details'}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}