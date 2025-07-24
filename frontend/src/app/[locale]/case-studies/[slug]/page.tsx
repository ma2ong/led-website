/**
 * Case Study Detail Page
 * Displays detailed information about a specific case study
 */

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseStudy, getCaseStudies } from '@/services/case-study';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { MediaGallery } from '@/components/ui/media-gallery';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { Badge } from '@/components/ui/badge';
import { CaseStudyCard } from '@/components/case-study/case-study-card';

interface CaseStudyDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function CaseStudyDetailPage({ 
  params: { locale, slug } 
}: CaseStudyDetailPageProps) {
  const t = useTranslations();

  // Fetch case study data
  const caseStudyResponse = await getCaseStudy(slug, { locale });
  
  if (!caseStudyResponse.data) {
    notFound();
  }

  const caseStudy = caseStudyResponse.data;

  // Fetch related case studies
  const relatedResponse = await getCaseStudies({
    locale,
    page: 1,
    pageSize: 3,
    filters: {
      industry: caseStudy.industry,
      exclude: caseStudy.id
    }
  });

  const relatedCaseStudies = relatedResponse.data;

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.cases'), url: `/${locale}/case-studies` },
    { name: caseStudy.title, url: `/${locale}/case-studies/${slug}` },
  ];

  return (
    <>
      <SEOHead
        title={`${caseStudy.title} - ${t('CaseStudies.pageTitle')}`}
        description={caseStudy.summary || caseStudy.challenge}
        canonical={`/${locale}/case-studies/${slug}`}
        openGraph={{
          type: 'article',
          images: caseStudy.featuredImage ? [caseStudy.featuredImage.url] : undefined,
        }}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900">
          {caseStudy.featuredImage && (
            <div className="absolute inset-0">
              <OptimizedImage
                src={caseStudy.featuredImage.url}
                alt={caseStudy.title}
                fill
                className="object-cover opacity-60"
                priority
              />
            </div>
          )}
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
            
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                <Badge variant="primary">{t(`CaseStudies.industries.${caseStudy.industry}`)}</Badge>
                <Badge variant="secondary">{t(`CaseStudies.regions.${caseStudy.region}`)}</Badge>
                {caseStudy.products?.map((product) => (
                  <Badge key={product.id} variant="outline">
                    {product.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="heading-1 text-white mb-6">
                {caseStudy.title}
              </h1>
              
              {caseStudy.summary && (
                <p className="body-large text-gray-200">
                  {caseStudy.summary}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Project Overview */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('CaseStudies.projectOverview')}
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('CaseStudies.client')}
                  </h3>
                  <p className="text-gray-600">{caseStudy.client}</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('CaseStudies.location')}
                  </h3>
                  <p className="text-gray-600">{caseStudy.location}</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('CaseStudies.projectDate')}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(caseStudy.projectDate).toLocaleDateString(locale)}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('CaseStudies.projectValue')}
                  </h3>
                  <p className="text-gray-600">{caseStudy.projectValue || t('CaseStudies.confidential')}</p>
                </div>
              </div>
            </div>

            {/* Challenge */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('CaseStudies.challenge')}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{caseStudy.challenge}</p>
              </div>
            </div>

            {/* Solution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('CaseStudies.solution')}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{caseStudy.solution}</p>
              </div>
              
              {/* Products Used */}
              {caseStudy.products && caseStudy.products.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('CaseStudies.productsUsed')}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {caseStudy.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${locale}/products/${product.slug}`}
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {product.mainImage && (
                          <div className="h-16 w-16 flex-shrink-0 mr-4">
                            <OptimizedImage
                              src={product.mainImage.url}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          {product.shortDescription && (
                            <p className="text-sm text-gray-600 mt-1">
                              {product.shortDescription}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('CaseStudies.results')}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p>{caseStudy.results}</p>
              </div>
              
              {/* Key Metrics */}
              {caseStudy.keyMetrics && caseStudy.keyMetrics.length > 0 && (
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {caseStudy.keyMetrics.map((metric, index) => (
                    <div key={index} className="text-center p-6 bg-primary-50 rounded-lg">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Media Gallery */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('CaseStudies.projectGallery')}
                </h2>
                <MediaGallery
                  items={caseStudy.gallery.map(item => ({
                    type: item.mime?.startsWith('video/') ? 'video' : 'image',
                    url: item.url,
                    thumbnail: item.formats?.thumbnail?.url || item.url,
                    alt: item.alternativeText || caseStudy.title,
                    caption: item.caption
                  }))}
                />
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="mb-12 bg-gray-50 p-8 rounded-lg">
                <blockquote className="text-lg italic text-gray-600 mb-4">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {caseStudy.testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {caseStudy.testimonial.position}, {caseStudy.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('CaseStudies.relatedCases')}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedCaseStudies.map((relatedCase) => (
                  <CaseStudyCard
                    key={relatedCase.id}
                    caseStudy={relatedCase}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('CaseStudies.interestedInSimilar')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('CaseStudies.interestedDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('CaseStudies.discussProject')}
              </Link>
              <Link
                href={`/${locale}/case-studies`}
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('CaseStudies.viewMoreCases')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate static params for all case studies
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const caseStudiesResponse = await getCaseStudies({
    locale: params.locale,
    page: 1,
    pageSize: 100, // Get all case studies for static generation
  });

  return caseStudiesResponse.data.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}