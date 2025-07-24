import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getProducts } from '@/services/product';
import { getCaseStudies, getNews } from '@/lib/strapi';
import { ProductCard } from '@/components/product/product-card';
import { CaseStudyCard } from '@/components/case-study/case-study-card';
import { NewsCard } from '@/components/news/news-card';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations();

  // Fetch featured content
  const [featuredProducts, featuredCases, latestNews] = await Promise.all([
    getProducts({ 
      filter: 'featured',
      locale 
    }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } })),
    getCaseStudies({ 
      filters: { featured: true }, 
      pagination: { pageSize: 3 },
      locale 
    }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } })),
    getNews({ 
      filters: { featured: true }, 
      pagination: { pageSize: 3 },
      locale 
    }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } }))
  ]);
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="heading-1 mb-6">
              {t('HomePage.title')}
            </h1>
            <p className="text-xl text-primary-600 mb-4 font-semibold">
              {t('HomePage.subtitle')}
            </p>
            <p className="body-large mb-10 max-w-2xl mx-auto">
              {t('HomePage.description')}
            </p>
            
            <div className="flex items-center justify-center gap-x-6">
              <Link href="/products" className="btn-primary">
                {t('Navigation.products')}
              </Link>
              <Link href="/contact" className="btn-secondary">
                {t('Common.contactUs')}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              专业优势
            </h2>
            <p className="heading-2 mt-2">
              为什么选择联锦光电
            </p>
            <p className="body-large mt-6">
              我们专注于LED显示屏技术创新，为全球客户提供高品质的显示解决方案
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  高品质产品
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  采用优质LED芯片和先进制造工艺，确保产品稳定性和长寿命
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m0 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                  </div>
                  定制化服务
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  根据客户需求提供个性化解决方案，满足不同应用场景
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  专业团队
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  拥有经验丰富的研发和技术支持团队，提供全方位服务
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
                    </svg>
                  </div>
                  全球服务
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  产品远销全球多个国家和地区，建立了完善的销售网络
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      {featuredProducts.data.length > 0 && (
        <div className="py-24 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {t('HomePage.featuredProducts')}
              </h2>
              <p className="heading-2 mt-2">
                {t('HomePage.ourProducts')}
              </p>
              <p className="body-large mt-6">
                {t('HomePage.productsDescription')}
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {featuredProducts.data.map((product) => (
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
                  variant="featured"
                />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href={`/${locale}/products`}
                className="btn-primary"
              >
                {t('Common.viewAll')} {t('Navigation.products')}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Featured Case Studies Section */}
      {featuredCases.data.length > 0 && (
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {t('HomePage.successStories')}
              </h2>
              <p className="heading-2 mt-2">
                {t('HomePage.caseStudies')}
              </p>
              <p className="body-large mt-6">
                {t('HomePage.caseStudiesDescription')}
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {featuredCases.data.map((caseStudy) => (
                <CaseStudyCard 
                  key={caseStudy.id}
                  id={caseStudy.id.toString()}
                  slug={caseStudy.attributes?.slug || caseStudy.slug}
                  title={caseStudy.attributes?.title || caseStudy.title}
                  description={caseStudy.attributes?.shortDescription || caseStudy.description}
                  industry={caseStudy.attributes?.industry || caseStudy.industry}
                  location={caseStudy.attributes?.location || caseStudy.location}
                  client={caseStudy.attributes?.client || caseStudy.client}
                  thumbnailUrl={caseStudy.attributes?.mainImage?.data?.attributes?.url || caseStudy.mainImage?.url || '/images/placeholder-case.jpg'}
                  locale={locale as 'zh-Hans' | 'en'}
                  variant="featured"
                />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href={`/${locale}/case-studies`}
                className="btn-secondary"
              >
                {t('Common.viewAll')} {t('Navigation.caseStudies')}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Company Stats Section */}
      <div className="bg-primary-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('HomePage.companyStats')}
              </h2>
              <p className="mt-4 text-lg leading-8 text-primary-200">
                {t('HomePage.statsDescription')}
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-primary-200">
                  {t('HomePage.yearsExperience')}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">
                  15+
                </dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-primary-200">
                  {t('HomePage.projectsCompleted')}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">
                  1000+
                </dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-primary-200">
                  {t('HomePage.countriesServed')}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">
                  50+
                </dd>
              </div>
              <div className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-primary-200">
                  {t('HomePage.satisfiedClients')}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-white">
                  500+
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      {latestNews.data.length > 0 && (
        <div className="py-24 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {t('HomePage.latestNews')}
              </h2>
              <p className="heading-2 mt-2">
                {t('HomePage.newsAndUpdates')}
              </p>
              <p className="body-large mt-6">
                {t('HomePage.newsDescription')}
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {latestNews.data.map((article) => (
                <NewsCard 
                  key={article.id}
                  id={article.id.toString()}
                  slug={article.attributes?.slug || article.slug}
                  title={article.attributes?.title || article.title}
                  excerpt={article.attributes?.excerpt || article.excerpt}
                  category={article.attributes?.category || article.category}
                  author={article.attributes?.author || article.author}
                  publishDate={article.attributes?.publishDate || article.publishDate || article.createdAt}
                  thumbnailUrl={article.attributes?.featuredImage?.data?.attributes?.url || article.featuredImage?.url || '/images/placeholder-news.jpg'}
                  locale={locale as 'zh-Hans' | 'en'}
                  variant="featured"
                />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href={`/${locale}/news`}
                className="btn-secondary"
              >
                {t('Common.viewAll')} {t('Navigation.news')}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('HomePage.ctaTitle')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              {t('HomePage.ctaDescription')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${locale}/contact`}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {t('Common.contactUs')}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="text-sm font-semibold leading-6 text-white hover:text-primary-200 transition-colors"
              >
                {t('Common.learnMore')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}