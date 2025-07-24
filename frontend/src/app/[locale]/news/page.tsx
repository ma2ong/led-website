/**
 * News Page
 * Displays all news articles with filtering and search capabilities
 */

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { getNews } from '@/services/news';
import { NewsCard } from '@/components/news/news-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { Pagination } from '@/components/ui/pagination';

interface NewsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function NewsPage({ 
  params: { locale }, 
  searchParams 
}: NewsPageProps) {
  const t = useTranslations();
  
  const page = parseInt(searchParams.page || '1');
  const pageSize = 12;
  
  // Fetch news with filters
  const newsResponse = await getNews({
    locale,
    page,
    pageSize,
    filters: {
      category: searchParams.category,
      search: searchParams.search,
    }
  });

  const { data: newsArticles, meta } = newsResponse;

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.news'), url: `/${locale}/news` },
  ];

  // News categories
  const categories = [
    'company-news', 'product-updates', 'industry-insights', 
    'events', 'awards', 'partnerships'
  ];

  return (
    <>
      <SEOHead
        title={t('News.pageTitle')}
        description={t('News.pageDescription')}
        canonical={`/${locale}/news`}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page Header */}
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h1 className="heading-1 mb-4">
              {t('News.title')}
            </h1>
            <p className="body-large text-gray-600">
              {t('News.description')}
            </p>
          </div>

          {/* Filters */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('News.search')}
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  defaultValue={searchParams.search}
                  placeholder={t('News.searchPlaceholder')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('News.category')}
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={searchParams.category || ''}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{t('News.allCategories')}</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {t(`News.categories.${category}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Filters Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {t('News.applyFilters')}
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {t('News.resultsCount', { 
                count: meta.pagination.total,
                start: (page - 1) * pageSize + 1,
                end: Math.min(page * pageSize, meta.pagination.total)
              })}
            </p>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                {t('News.sortBy')}:
              </label>
              <select
                id="sort"
                name="sort"
                className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="newest">{t('News.sortNewest')}</option>
                <option value="oldest">{t('News.sortOldest')}</option>
                <option value="title">{t('News.sortTitle')}</option>
              </select>
            </div>
          </div>

          {/* Featured Article */}
          {newsArticles.length > 0 && page === 1 && (
            <div className="mt-8 mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {t('News.featuredArticle')}
              </h2>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <NewsCard
                  article={newsArticles[0]}
                  locale={locale}
                  featured={true}
                />
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="mt-8">
            {newsArticles.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {newsArticles.slice(page === 1 ? 1 : 0).map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    locale={locale}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {t('News.noResults')}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t('News.noResultsDescription')}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {meta.pagination.pageCount > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={page}
                totalPages={meta.pagination.pageCount}
                baseUrl={`/${locale}/news`}
                searchParams={searchParams}
              />
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('News.newsletterTitle')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('News.newsletterDescription')}
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder={t('News.emailPlaceholder')}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('News.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}