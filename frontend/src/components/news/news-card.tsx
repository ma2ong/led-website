'use client';

import Link from 'next/link';
import { OptimizedImage } from '../ui/optimized-image';
import { Badge } from '../ui/badge';
import { Locale } from '@/lib/i18n-config';
import { cn } from '@/lib/utils';

export interface NewsCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  author?: string;
  publishDate: string;
  thumbnailUrl: string;
  locale: Locale;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function NewsCard({
  id,
  slug,
  title,
  excerpt,
  category,
  author,
  publishDate,
  thumbnailUrl,
  locale,
  variant = 'default',
  className,
}: NewsCardProps) {
  const newsUrl = `/${locale}/news/${slug}`;
  const formattedDate = new Date(publishDate).toLocaleDateString(
    locale === 'zh-Hans' ? 'zh-CN' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
  
  if (variant === 'compact') {
    return (
      <Link 
        href={newsUrl}
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
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <article 
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
          {category && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              {category}
            </Badge>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <time dateTime={publishDate}>{formattedDate}</time>
            {author && (
              <>
                <span className="mx-2">•</span>
                <span>{author}</span>
              </>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
          
          {excerpt && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">{excerpt}</p>
          )}
          
          <Link 
            href={newsUrl}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '阅读更多' : 'Read more'}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    );
  }
  
  // Default card style
  return (
    <article 
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
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <time dateTime={publishDate}>{formattedDate}</time>
          {author && (
            <>
              <span className="mx-2">•</span>
              <span>{author}</span>
            </>
          )}
          {category && (
            <>
              <span className="mx-2">•</span>
              <Badge variant="outline" className="text-xs">{category}</Badge>
            </>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        
        {excerpt && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{excerpt}</p>
        )}
        
        <div className="mt-auto pt-4">
          <Link 
            href={newsUrl}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {locale === 'zh-Hans' ? '阅读全文' : 'Read full article'}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}