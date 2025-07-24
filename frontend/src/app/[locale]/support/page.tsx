/**
 * Support Page
 * Provides technical documentation downloads and support resources
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Badge } from '@/components/ui/badge';

interface SupportPageProps {
  params: {
    locale: string;
  };
}

export default function SupportPage({ 
  params: { locale } 
}: SupportPageProps) {
  const t = useTranslations();

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.support'), url: `/${locale}/support` },
  ];

  // Support resources data
  const documentCategories = [
    {
      id: 'installation',
      title: t('Support.installation.title'),
      description: t('Support.installation.description'),
      icon: 'installation',
      documents: [
        {
          name: t('Support.installation.quickStart'),
          type: 'PDF',
          size: '2.5 MB',
          language: 'zh/en',
          downloadUrl: '/docs/installation-quick-start.pdf'
        },
        {
          name: t('Support.installation.detailedGuide'),
          type: 'PDF',
          size: '8.2 MB',
          language: 'zh/en',
          downloadUrl: '/docs/installation-detailed-guide.pdf'
        },
        {
          name: t('Support.installation.safetyManual'),
          type: 'PDF',
          size: '1.8 MB',
          language: 'zh/en',
          downloadUrl: '/docs/safety-manual.pdf'
        }
      ]
    },
    {
      id: 'technical',
      title: t('Support.technical.title'),
      description: t('Support.technical.description'),
      icon: 'technical',
      documents: [
        {
          name: t('Support.technical.specifications'),
          type: 'PDF',
          size: '3.1 MB',
          language: 'zh/en',
          downloadUrl: '/docs/technical-specifications.pdf'
        },
        {
          name: t('Support.technical.calibration'),
          type: 'PDF',
          size: '4.7 MB',
          language: 'zh/en',
          downloadUrl: '/docs/calibration-guide.pdf'
        },
        {
          name: t('Support.technical.troubleshooting'),
          type: 'PDF',
          size: '2.9 MB',
          language: 'zh/en',
          downloadUrl: '/docs/troubleshooting-guide.pdf'
        }
      ]
    },
    {
      id: 'software',
      title: t('Support.software.title'),
      description: t('Support.software.description'),
      icon: 'software',
      documents: [
        {
          name: t('Support.software.controlSoftware'),
          type: 'ZIP',
          size: '125 MB',
          language: 'zh/en',
          downloadUrl: '/software/led-control-software.zip'
        },
        {
          name: t('Support.software.userManual'),
          type: 'PDF',
          size: '6.3 MB',
          language: 'zh/en',
          downloadUrl: '/docs/software-user-manual.pdf'
        },
        {
          name: t('Support.software.apiDocumentation'),
          type: 'PDF',
          size: '4.1 MB',
          language: 'en',
          downloadUrl: '/docs/api-documentation.pdf'
        }
      ]
    },
    {
      id: 'maintenance',
      title: t('Support.maintenance.title'),
      description: t('Support.maintenance.description'),
      icon: 'maintenance',
      documents: [
        {
          name: t('Support.maintenance.schedule'),
          type: 'PDF',
          size: '1.2 MB',
          language: 'zh/en',
          downloadUrl: '/docs/maintenance-schedule.pdf'
        },
        {
          name: t('Support.maintenance.cleaning'),
          type: 'PDF',
          size: '2.8 MB',
          language: 'zh/en',
          downloadUrl: '/docs/cleaning-guide.pdf'
        },
        {
          name: t('Support.maintenance.replacement'),
          type: 'PDF',
          size: '3.5 MB',
          language: 'zh/en',
          downloadUrl: '/docs/component-replacement.pdf'
        }
      ]
    }
  ];

  const supportChannels = [
    {
      title: t('Support.channels.phone'),
      description: t('Support.channels.phoneDescription'),
      contact: '+86-755-2468-1357',
      hours: t('Support.channels.phoneHours'),
      icon: 'phone'
    },
    {
      title: t('Support.channels.email'),
      description: t('Support.channels.emailDescription'),
      contact: 'support@ledcompany.com',
      hours: t('Support.channels.emailHours'),
      icon: 'email'
    },
    {
      title: t('Support.channels.remote'),
      description: t('Support.channels.remoteDescription'),
      contact: t('Support.channels.remoteContact'),
      hours: t('Support.channels.remoteHours'),
      icon: 'remote'
    }
  ];

  const getIcon = (iconType: string) => {
    const icons = {
      installation: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      technical: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      software: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      maintenance: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      phone: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      email: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      remote: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    };
    return icons[iconType as keyof typeof icons] || icons.technical;
  };

  return (
    <>
      <SEOHead
        title={t('Support.pageTitle')}
        description={t('Support.pageDescription')}
        canonical={`/${locale}/support`}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Technical Support"
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <Breadcrumb items={breadcrumbItems} className="mb-8" />
            
            <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
              <h1 className="heading-1 text-white mb-6">
                {t('Support.title')}
              </h1>
              <p className="body-large text-gray-200">
                {t('Support.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Support Channels */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('Support.getHelpTitle')}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {supportChannels.map((channel) => (
                <div key={channel.title} className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="mx-auto h-12 w-12 text-primary-600 mb-4">
                    {getIcon(channel.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {channel.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">
                      {channel.contact}
                    </p>
                    <p className="text-sm text-gray-600">
                      {channel.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Downloads */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('Support.documentationTitle')}
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {documentCategories.map((category) => (
                <div key={category.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-primary-600 mr-4">
                      {getIcon(category.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category.title}
                      </h3>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {category.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {doc.name}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline">{doc.type}</Badge>
                            <span className="text-sm text-gray-500">{doc.size}</span>
                            <span className="text-sm text-gray-500">{doc.language}</span>
                          </div>
                        </div>
                        <a
                          href={doc.downloadUrl}
                          download
                          className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {t('Support.download')}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('Support.videoTutorialsTitle')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: t('Support.videos.installation'),
                  duration: '15:30',
                  thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
                  url: '#'
                },
                {
                  title: t('Support.videos.calibration'),
                  duration: '12:45',
                  thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
                  url: '#'
                },
                {
                  title: t('Support.videos.maintenance'),
                  duration: '18:20',
                  thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
                  url: '#'
                }
              ].map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <OptimizedImage
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600">
                      {video.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Warranty Information */}
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('Support.warrantyTitle')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('Support.warranty.coverage')}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('Support.warranty.item1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('Support.warranty.item2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('Support.warranty.item3')}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('Support.warranty.terms')}
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>{t('Support.warranty.term1')}</p>
                  <p>{t('Support.warranty.term2')}</p>
                  <p>{t('Support.warranty.term3')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('Support.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('Support.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('Support.contactSupport')}
              </Link>
              <a
                href="tel:+86-755-2468-1357"
                className="inline-flex items-center px-8 py-4 border border-primary-600 text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('Support.callNow')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}