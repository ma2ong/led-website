'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { type NewsItem, newsUtils } from '@/hooks/useNews';

interface NewsCardProps {
  newsItem: NewsItem;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export default function NewsCard({ newsItem, className = '', variant = 'default' }: NewsCardProps) {
  const { language } = useLanguage();
  
  const title = newsUtils.getLocalizedTitle(newsItem, language);
  const excerpt = newsUtils.getLocalizedExcerpt(newsItem, language);
  const mainImage = newsUtils.getMainImage(newsItem);
  const publishDate = newsUtils.formatPublishDate(newsItem.attributes.publishDate, language);
  const categoryIcon = '📰'; // 默认图标
  const categoryColor = 'bg-blue-500'; // 默认颜色
  const categoryLabel = '新闻'; // 默认标签

  if (variant === 'compact') {
    return (
      <article className={`flex gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors ${className}`}>
        {mainImage && (
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${categoryColor}`}>
              {categoryIcon} {categoryLabel}
            </span>
            <span className="text-gray-400 text-xs">{publishDate}</span>
          </div>
          <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
            <Link href={`/news/${newsItem.id}`} className="hover:text-orange-400 transition-colors">
              {title}
            </Link>
          </h3>
          {excerpt && (
            <p className="text-gray-300 text-xs line-clamp-2">{excerpt}</p>
          )}
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className={`led-card overflow-hidden ${className}`}>
        {mainImage && (
          <div className="h-64 relative overflow-hidden">
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${categoryColor}`}>
                {categoryIcon} {categoryLabel}
              </span>
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <time className="text-gray-400 text-sm">{publishDate}</time>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
            <Link href={`/news/${newsItem.id}`} className="hover:text-orange-400 transition-colors">
              {title}
            </Link>
          </h3>
          {excerpt && (
            <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">{excerpt}</p>
          )}
          <Link
            href={`/news/${newsItem.id}`}
            className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
          >
            阅读更多 
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className={`led-card overflow-hidden animate-fade-in-up ${className}`}>
      {mainImage && (
        <div className="h-48 relative overflow-hidden">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${categoryColor}`}>
            {categoryIcon} {categoryLabel}
          </span>
          <time className="text-gray-400 text-sm">{publishDate}</time>
        </div>
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
          <Link href={`/news/${newsItem.id}`} className="hover:text-orange-400 transition-colors">
            {title}
          </Link>
        </h3>
        {excerpt && (
          <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
        )}
        <Link
          href={`/news/${newsItem.id}`}
          className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
        >
          阅读更多 
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

// 新闻卡片骨架屏
export function NewsCardSkeleton({ className = '', variant = 'default' }: { className?: string; variant?: 'default' | 'featured' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className={`flex gap-4 p-4 bg-gray-800 rounded-lg animate-pulse ${className}`}>
        <div className="w-20 h-20 bg-gray-700 rounded-lg flex-shrink-0"></div>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <div className="h-5 bg-gray-700 rounded-full w-16"></div>
            <div className="h-5 bg-gray-700 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`led-card animate-pulse ${className}`}>
      <div className="h-48 bg-gray-700"></div>
      <div className="p-6">
        <div className="flex justify-between mb-3">
          <div className="h-5 bg-gray-700 rounded-full w-20"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  );
}