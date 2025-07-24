/**
 * Inquiry Page
 * Dedicated page for product inquiries and quotes
 */

import { useTranslations } from 'next-intl';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { InquiryForm } from '@/components/inquiry/inquiry-form';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface InquiryPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    product?: string;
    solution?: string;
  };
}

export default function InquiryPage({ 
  params: { locale },
  searchParams
}: InquiryPageProps) {
  const t = useTranslations();

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.inquiry'), url: `/${locale}/inquiry` },
  ];

  return (
    <>
      <SEOHead
        title={t('Inquiry.pageTitle')}
        description={t('Inquiry.pageDescription')}
        canonical={`/${locale}/inquiry`}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Get a Quote"
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
            
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
              <h1 className="heading-1 text-white mb-6">
                {t('Inquiry.title')}
              </h1>
              <p className="body-large text-gray-200">
                {t('Inquiry.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t('Inquiry.formTitle')}
              </h2>
              <InquiryForm 
                locale={locale}
                preselectedProduct={searchParams.product}
                preselectedSolution={searchParams.solution}
              />
            </div>

            {/* Sidebar Information */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('Inquiry.whyChooseUs')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{t('Inquiry.advantage1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{t('Inquiry.advantage2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{t('Inquiry.advantage3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{t('Inquiry.advantage4')}</span>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('Inquiry.needHelp')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">+86-755-8765-4321</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">sales@ledcompany.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{t('Inquiry.businessHours')}</span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('Inquiry.responseTime')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">{t('Inquiry.response1')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">{t('Inquiry.response2')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">{t('Inquiry.response3')}</span>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <blockquote className="text-gray-600 italic mb-4">
                  "{t('Inquiry.testimonialQuote')}"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">
                    {t('Inquiry.testimonialAuthor')}
                  </div>
                  <div className="text-gray-600">
                    {t('Inquiry.testimonialPosition')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}