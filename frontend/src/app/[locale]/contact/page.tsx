/**
 * Contact Page
 * Displays contact information and inquiry form
 */

import { useTranslations } from 'next-intl';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { InquiryForm } from '@/components/inquiry/inquiry-form';
import { ContactMap } from '@/components/contact/contact-map';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default function ContactPage({ 
  params: { locale } 
}: ContactPageProps) {
  const t = useTranslations();

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.contact'), url: `/${locale}/contact` },
  ];

  // Contact information
  const contactInfo = {
    headquarters: {
      name: t('Contact.headquarters'),
      address: t('Contact.headquartersAddress'),
      phone: '+86-755-1234-5678',
      email: 'info@ledcompany.com',
      hours: t('Contact.businessHours')
    },
    sales: {
      name: t('Contact.salesOffice'),
      address: t('Contact.salesAddress'),
      phone: '+86-755-8765-4321',
      email: 'sales@ledcompany.com',
      hours: t('Contact.businessHours')
    },
    support: {
      name: t('Contact.technicalSupport'),
      phone: '+86-755-2468-1357',
      email: 'support@ledcompany.com',
      hours: t('Contact.supportHours')
    }
  };

  return (
    <>
      <SEOHead
        title={t('Contact.pageTitle')}
        description={t('Contact.pageDescription')}
        canonical={`/${locale}/contact`}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Contact Us"
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
            
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
              <h1 className="heading-1 text-white mb-6">
                {t('Contact.title')}
              </h1>
              <p className="body-large text-gray-200">
                {t('Contact.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t('Contact.getInTouch')}
              </h2>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Headquarters */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {contactInfo.headquarters.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {contactInfo.headquarters.address}
                      </p>
                      <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.phone')}:</span> {contactInfo.headquarters.phone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.email')}:</span> {contactInfo.headquarters.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.hours')}:</span> {contactInfo.headquarters.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sales Office */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {contactInfo.sales.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {contactInfo.sales.address}
                      </p>
                      <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.phone')}:</span> {contactInfo.sales.phone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.email')}:</span> {contactInfo.sales.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.hours')}:</span> {contactInfo.sales.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Support */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {contactInfo.support.name}
                      </h3>
                      <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.phone')}:</span> {contactInfo.support.phone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.email')}:</span> {contactInfo.support.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('Contact.hours')}:</span> {contactInfo.support.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('Contact.followUs')}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    aria-label="WeChat"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.858zm-3.288 1.333c.472 0 .857.383.857.857 0 .473-.385.857-.857.857a.857.857 0 0 1 0-1.714zm4.273 0c.472 0 .857.383.857.857 0 .473-.385.857-.857.857a.857.857 0 0 1 0-1.714z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t('Contact.sendMessage')}
              </h2>
              <InquiryForm locale={locale} />
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('Contact.findUs')}
            </h2>
            <ContactMap 
              locale={locale}
              locations={[
                {
                  id: 'headquarters',
                  name: contactInfo.headquarters.name,
                  address: contactInfo.headquarters.address,
                  phone: contactInfo.headquarters.phone,
                  email: contactInfo.headquarters.email,
                  coordinates: { lat: 22.5431, lng: 114.0579 }
                },
                {
                  id: 'sales',
                  name: contactInfo.sales.name,
                  address: contactInfo.sales.address,
                  phone: contactInfo.sales.phone,
                  email: contactInfo.sales.email,
                  coordinates: { lat: 22.5331, lng: 114.0479 }
                }
              ]}
            />
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('Contact.faqTitle')}
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('Contact.faq1Question')}
                  </h3>
                  <p className="text-gray-600">
                    {t('Contact.faq1Answer')}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('Contact.faq2Question')}
                  </h3>
                  <p className="text-gray-600">
                    {t('Contact.faq2Answer')}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('Contact.faq3Question')}
                  </h3>
                  <p className="text-gray-600">
                    {t('Contact.faq3Answer')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}