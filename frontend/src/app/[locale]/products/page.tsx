/**
 * 产品列表页面
 * 支持分类筛选和分页
 */

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { getProducts, getProductCategories } from '@/services/product';
import { ProductCard } from '@/components/product/product-card';
import { ProductFilter } from '@/components/product/product-filter';
import { Pagination } from '@/components/ui/pagination';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';

interface ProductListPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
    sort?: string;
    pixelPitch?: string;
    application?: string;
  };
}

export default async function ProductListPage({ 
  params: { locale }, 
  searchParams 
}: ProductListPageProps) {
  const t = useTranslations();
  
  const page = parseInt(searchParams.page || '1');
  const pageSize = 12;
  
  // Build filters from search params
  const filters: any = {};
  if (searchParams.category) {
    filters.category = { slug: searchParams.category };
  }
  if (searchParams.search) {
    filters.$or = [
      { name: { $containsi: searchParams.search } },
      { description: { $containsi: searchParams.search } },
    ];
  }
  if (searchParams.pixelPitch) {
    filters.technicalSpecs = {
      pixelPitch: searchParams.pixelPitch
    };
  }
  if (searchParams.application) {
    filters.applications = {
      name: { $containsi: searchParams.application }
    };
  }

  // Fetch products and categories
  const [productsResponse, categoriesResponse] = await Promise.all([
    getProducts({
      category: searchParams.category,
      filter: searchParams.search ? `search:${searchParams.search}` : undefined,
      sort: searchParams.sort || 'newest',
      page,
      locale
    }),
    getProductCategories({ locale })
  ]);

  const { data: products, meta } = productsResponse;
  const { data: categories } = categoriesResponse;

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.products'), url: `/${locale}/products` },
  ];

  if (searchParams.category) {
    const currentCategory = categories.find(cat => cat.slug === searchParams.category);
    if (currentCategory) {
      breadcrumbItems.push({
        name: currentCategory.name,
        url: `/${locale}/products?category=${searchParams.category}`
      });
    }
  }

  return (
    <>
      <SEOHead
        title={t('Products.pageTitle')}
        description={t('Products.pageDescription')}
        canonical={`/${locale}/products`}
      />
      
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
            <h1 className="heading-1 mb-4">
              {t('Products.title')}
            </h1>
            <p className="body-large text-gray-600">
              {t('Products.description')}
            </p>
          </div>

          {/* Filters */}
          <div className="mt-16">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilter
                categories={categories}
                currentFilters={searchParams}
                locale={locale}
              />
            </Suspense>
          </div>

          {/* Results Summary */}
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              {t('Products.showingResults', {
                start: (page - 1) * pageSize + 1,
                end: Math.min(page * pageSize, meta.pagination.total),
                total: meta.pagination.total
              })}
            </p>
            
            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                {t('Products.sortBy')}:
              </label>
              <select
                id="sort"
                name="sort"
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                defaultValue={searchParams.sort || 'createdAt:desc'}
                onChange={(e) => {
                  const url = new URL(window.location.href);
                  url.searchParams.set('sort', e.target.value);
                  url.searchParams.delete('page'); // Reset to first page
                  window.location.href = url.toString();
                }}
              >
                <option value="createdAt:desc">{t('Products.sortNewest')}</option>
                <option value="createdAt:asc">{t('Products.sortOldest')}</option>
                <option value="name:asc">{t('Products.sortNameAZ')}</option>
                <option value="name:desc">{t('Products.sortNameZA')}</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <>
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id.toString()}
                    slug={product.slug}
                    title={product.name}
                    description={product.shortDescription}
                    category={product.categoryInfo?.name || product.category}
                    pixelPitch={product.pixelPitch}
                    brightness={product.brightness}
                    thumbnailUrl={product.mainImage?.url || '/images/placeholder-product.jpg'}
                    isNew={false}
                    isFeatured={product.isFeatured}
                    locale={locale as 'zh-Hans' | 'en'}
                    variant="grid"
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta && meta.pagination && meta.pagination.pageCount > 1 && (
                <div className="mt-16">
                  <Pagination
                    currentPage={page}
                    totalPages={meta.pagination.pageCount}
                    baseUrl={`/${locale}/products`}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="mt-16 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0a7.962 7.962 0 011.824 2.562 7.962 7.962 0 01-1.824 2.562M9 6.306v.001"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {t('Products.noResults')}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {t('Products.noResultsDescription')}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    window.location.href = `/${locale}/products`;
                  }}
                >
                  {t('Products.clearFilters')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}