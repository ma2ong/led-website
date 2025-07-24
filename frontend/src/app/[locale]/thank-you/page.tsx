/**
 * Thank You Page
 * Displays confirmation message after form submissions
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface ThankYouPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    type?: 'inquiry' | 'contact' | 'newsletter';
  };
}

export default function ThankYouPage({ 
  params: { locale },
  searchParams
}: ThankYouPageProps) {
  const t = useTranslations();
  const type = searchParams.type || 'inquiry';

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('ThankYou.title'), url: `/${locale}/thank-you` },
  ];

  const getContent = () => {
    switch (type) {
      case 'inquiry':
        return {
          title: t('ThankYou.inquiry.title'),
          message: t('ThankYou.inquiry.message'),
          description: t('ThankYou.inquiry.description'),
          icon: (
            <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'contact':
        return {
          title: t('ThankYou.contact.title'),
          message: t('ThankYou.contact.message'),
          description: t('ThankYou.contact.description'),
          icon: (
            <svg className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )
        };
      case 'newsletter':
        return {
          title: t('ThankYou.newsletter.title'),
          message: t('ThankYou.newsletter.message'),
          description: t('ThankYou.newsletter.description'),
          icon: (
            <svg className="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          )
        };
      default:
        return {
          title: t('ThankYou.default.title'),
          message: t('ThankYou.default.message'),
          description: t('ThankYou.default.description'),
          icon: (
            <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const content = getContent();

  return (
    <>
      <SEOHead
        title={content.title}
        description={content.message}
        canonical={`/${locale}/thank-you`}
        noindex={true}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
            
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center mb-8">
                {content.icon}
              </div>
              
              <h1 className="heading-1 text-gray-900 mb-6">
                {content.title}
              </h1>
              
              <p className="body-large text-gray-600 mb-8">
                {content.message}
              </p>
              
              <p className="text-gray-500 mb-12">
                {content.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {t('ThankYou.backToHome')}
                </Link>
                
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center px-8 py-4 border border-primary-600 text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {t('ThankYou.viewProducts')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Response Time */}
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="mx-auto h-12 w-12 text-green-600 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('ThankYou.responseTime.title')}
              </h3>
              <p className="text-gray-600">
                {t('ThankYou.responseTime.description')}
              </p>
            </div>

            {/* Expert Team */}
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="mx-auto h-12 w-12 text-blue-600 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('ThankYou.expertTeam.title')}
              </h3>
              <p className="text-gray-600">
                {t('ThankYou.expertTeam.description')}
              </p>
            </div>

            {/* Quality Assurance */}
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="mx-auto h-12 w-12 text-purple-600 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('ThankYou.qualityAssurance.title')}
              </h3>
              <p className="text-gray-600">
                {t('ThankYou.qualityAssurance.description')}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('ThankYou.needImmediateHelp')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('ThankYou.salesTeam')}
                </h3>
                <p className="text-gray-600 mb-2">
                  {t('ThankYou.salesDescription')}
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">+86-755-8765-4321</p>
                  <p className="text-gray-600">sales@ledcompany.com</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('ThankYou.technicalSupport')}
                </h3>
                <p className="text-gray-600 mb-2">
                  {t('ThankYou.technicalDescription')}
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">+86-755-2468-1357</p>
                  <p className="text-gray-600">support@ledcompany.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}