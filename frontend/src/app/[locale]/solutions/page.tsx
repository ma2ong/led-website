/**
 * Solutions Page
 * Displays industry-specific LED display solutions
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { Badge } from '@/components/ui/badge';

interface SolutionsPageProps {
  params: {
    locale: string;
  };
}

export default function SolutionsPage({ 
  params: { locale } 
}: SolutionsPageProps) {
  const t = useTranslations();

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.solutions'), url: `/${locale}/solutions` },
  ];

  // Industry solutions data
  const solutions = [
    {
      id: 'retail',
      title: t('Solutions.retail.title'),
      description: t('Solutions.retail.description'),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      features: [
        t('Solutions.retail.feature1'),
        t('Solutions.retail.feature2'),
        t('Solutions.retail.feature3'),
        t('Solutions.retail.feature4'),
      ],
      products: ['indoor-led', 'transparent-led', 'creative-led'],
      caseStudies: 2
    },
    {
      id: 'transportation',
      title: t('Solutions.transportation.title'),
      description: t('Solutions.transportation.description'),
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      features: [
        t('Solutions.transportation.feature1'),
        t('Solutions.transportation.feature2'),
        t('Solutions.transportation.feature3'),
        t('Solutions.transportation.feature4'),
      ],
      products: ['outdoor-led', 'fine-pitch-led'],
      caseStudies: 3
    },
    {
      id: 'sports',
      title: t('Solutions.sports.title'),
      description: t('Solutions.sports.description'),
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      features: [
        t('Solutions.sports.feature1'),
        t('Solutions.sports.feature2'),
        t('Solutions.sports.feature3'),
        t('Solutions.sports.feature4'),
      ],
      products: ['outdoor-led', 'rental-led'],
      caseStudies: 4
    },
    {
      id: 'entertainment',
      title: t('Solutions.entertainment.title'),
      description: t('Solutions.entertainment.description'),
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      features: [
        t('Solutions.entertainment.feature1'),
        t('Solutions.entertainment.feature2'),
        t('Solutions.entertainment.feature3'),
        t('Solutions.entertainment.feature4'),
      ],
      products: ['rental-led', 'creative-led'],
      caseStudies: 5
    },
    {
      id: 'corporate',
      title: t('Solutions.corporate.title'),
      description: t('Solutions.corporate.description'),
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      features: [
        t('Solutions.corporate.feature1'),
        t('Solutions.corporate.feature2'),
        t('Solutions.corporate.feature3'),
        t('Solutions.corporate.feature4'),
      ],
      products: ['fine-pitch-led', 'indoor-led'],
      caseStudies: 3
    },
    {
      id: 'education',
      title: t('Solutions.education.title'),
      description: t('Solutions.education.description'),
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      features: [
        t('Solutions.education.feature1'),
        t('Solutions.education.feature2'),
        t('Solutions.education.feature3'),
        t('Solutions.education.feature4'),
      ],
      products: ['indoor-led', 'fine-pitch-led'],
      caseStudies: 2
    }
  ];

  return (
    <>
      <SEOHead
        title={t('Solutions.pageTitle')}
        description={t('Solutions.pageDescription')}
        canonical={`/${locale}/solutions`}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="LED Display Solutions"
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
            
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
              <h1 className="heading-1 text-white mb-6">
                {t('Solutions.title')}
              </h1>
              <p className="body-large text-gray-200">
                {t('Solutions.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Solutions Overview */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('Solutions.overviewTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('Solutions.overviewDescription')}
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid gap-12 lg:gap-16">
            {solutions.map((solution, index) => (
              <div key={solution.id} className={`lg:grid lg:grid-cols-2 lg:gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`mt-8 lg:mt-0 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="mb-4">
                    <Badge variant="primary">{solution.title}</Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {t('Solutions.keyFeatures')}
                    </h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Products */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {t('Solutions.recommendedProducts')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.products.map((productSlug) => (
                        <Link
                          key={productSlug}
                          href={`/${locale}/products/${productSlug}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {t(`Products.${productSlug}.name`)}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/${locale}/case-studies?industry=${solution.id}`}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {t('Solutions.viewCaseStudies')} ({solution.caseStudies})
                    </Link>
                    <Link
                      href={`/${locale}/inquiry?solution=${solution.id}`}
                      className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {t('Solutions.getQuote')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Our Solutions */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('Solutions.whyChooseTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('Solutions.whyChooseDescription')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 text-primary-600 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('Solutions.advantage1Title')}
                </h3>
                <p className="text-gray-600">
                  {t('Solutions.advantage1Description')}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 text-primary-600 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('Solutions.advantage2Title')}
                </h3>
                <p className="text-gray-600">
                  {t('Solutions.advantage2Description')}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 text-primary-600 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('Solutions.advantage3Title')}
                </h3>
                <p className="text-gray-600">
                  {t('Solutions.advantage3Description')}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-16 w-16 text-primary-600 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('Solutions.advantage4Title')}
                </h3>
                <p className="text-gray-600">
                  {t('Solutions.advantage4Description')}
                </p>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('Solutions.processTitle')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('Solutions.processDescription')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="text-center">
                  <div className="mx-auto h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(`Solutions.process.step${step}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`Solutions.process.step${step}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-24 bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('Solutions.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('Solutions.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('Solutions.contactExpert')}
              </Link>
              <Link
                href={`/${locale}/case-studies`}
                className="inline-flex items-center px-8 py-4 border border-primary-600 text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('Solutions.viewAllCases')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}