/**
 * Case Studies Page
 * Displays all case studies with filtering and search capabilities
 */

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { getCaseStudies } from '@/services/case-study';
import { CaseStudyCard } from '@/components/case-study/case-study-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { Pagination } from '@/components/ui/pagination';

interface CaseStudiesPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
    industry?: string;
    region?: string;
    product?: string;
    search?: string;
  };
}

export default async function CaseStudiesPage({ 
  params: { locale }, 
  searchParams 
}: CaseStudiesPageProps) {
  const t = useTranslations();
  
  const page = parseInt(searchParams.page || '1');
  const pageSize = 12;
  
  // Fetch case studies with filters
  const caseStudiesResponse = await getCaseStudies({
    locale,
    page,
    pageSize,
    filters: {
      industry: searchParams.industry,
      region: searchParams.region,
      product: searchParams.product,
      search: searchParams.search,
    }
  });

  const { data: caseStudies, meta } = caseStudiesResponse;

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.cases'), url: `/${locale}/case-studies` },
  ];

  // Get unique industries and regions for filters
  const industries = [
    'retail', 'transportation', 'sports', 'entertainment', 
    'corporate', 'education', 'healthcare', 'government'
  ];
  
  const regions = [
    'north-america', 'europe', 'asia-pacific', 'middle-east', 
    'latin-america', 'africa'
  ];

  return (
    <>
      <SEOHead
        title={t('CaseStudies.pageTitle')}
        description={t('CaseStudies.pageDescription')}
        canonical={`/${locale}/case-studies`}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page Header */}
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h1 className="heading-1 mb-4">
              {t('CaseStudies.title')}
            </h1>
            <p className="body-large text-gray-600">
              {t('CaseStudies.description')}
            </p>
          </div>

          {/* Filters */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('CaseStudies.search')}
                </label>
                <input
                  type="text"
                  id="search"
                  name="search"
                  defaultValue={searchParams.search}
                  placeholder={t('CaseStudies.searchPlaceholder')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {/* Industry Filter */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('CaseStudies.industry')}
                </label>
                <select
                  id="industry"
                  name="industry"
                  defaultValue={searchParams.industry || ''}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{t('CaseStudies.allIndustries')}</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {t(`CaseStudies.industries.${industry}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('CaseStudies.region')}
                </label>
                <select
                  id="region"
                  name="region"
                  defaultValue={searchParams.region || ''}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">{t('CaseStudies.allRegions')}</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {t(`CaseStudies.regions.${region}`)}
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
                  {t('CaseStudies.applyFilters')}
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {t('CaseStudies.resultsCount', { 
                count: meta.pagination.total,
                start: (page - 1) * pageSize + 1,
                end: Math.min(page * pageSize, meta.pagination.total)
              })}
            </p>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                {t('CaseStudies.sortBy')}:
              </label>
              <select
                id="sort"
                name="sort"
                className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="newest">{t('CaseStudies.sortNewest')}</option>
                <option value="oldest">{t('CaseStudies.sortOldest')}</option>
                <option value="title">{t('CaseStudies.sortTitle')}</option>
              </select>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="mt-8">
            {caseStudies.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {caseStudies.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    caseStudy={caseStudy}
                    locale={locale}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {t('CaseStudies.noResults')}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t('CaseStudies.noResultsDescription')}
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
                baseUrl={`/${locale}/case-studies`}
                searchParams={searchParams}
              />
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('CaseStudies.ctaTitle')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('CaseStudies.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('CaseStudies.contactUs')}
              </a>
              <a
                href={`/${locale}/products`}
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('CaseStudies.viewProducts')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}