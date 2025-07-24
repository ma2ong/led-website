/**
 * 关于我们页面
 * 展示公司信息和实力
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations();

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.about'), url: `/${locale}/about` },
  ];

  const teamMembers = [
    {
      name: '张总',
      role: t('About.ceo'),
      image: '/images/team/ceo.jpg',
      description: t('About.ceoDescription'),
    },
    {
      name: '李工程师',
      role: t('About.cto'),
      image: '/images/team/cto.jpg',
      description: t('About.ctoDescription'),
    },
    {
      name: '王经理',
      role: t('About.salesManager'),
      image: '/images/team/sales.jpg',
      description: t('About.salesDescription'),
    },
  ];

  const milestones = [
    {
      year: '2008',
      title: t('About.milestone2008'),
      description: t('About.milestone2008Description'),
    },
    {
      year: '2012',
      title: t('About.milestone2012'),
      description: t('About.milestone2012Description'),
    },
    {
      year: '2016',
      title: t('About.milestone2016'),
      description: t('About.milestone2016Description'),
    },
    {
      year: '2020',
      title: t('About.milestone2020'),
      description: t('About.milestone2020Description'),
    },
    {
      year: '2023',
      title: t('About.milestone2023'),
      description: t('About.milestone2023Description'),
    },
  ];

  const certifications = [
    {
      name: 'ISO 9001',
      image: '/images/certifications/iso9001.jpg',
      description: t('About.iso9001Description'),
    },
    {
      name: 'CE',
      image: '/images/certifications/ce.jpg',
      description: t('About.ceDescription'),
    },
    {
      name: 'FCC',
      image: '/images/certifications/fcc.jpg',
      description: t('About.fccDescription'),
    },
    {
      name: 'RoHS',
      image: '/images/certifications/rohs.jpg',
      description: t('About.rohsDescription'),
    },
  ];

  return (
    <>
      <SEOHead
        title={t('About.pageTitle')}
        description={t('About.pageDescription')}
        canonical={`/${locale}/about`}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center">
            <div>
              <h1 className="heading-1 mb-6">
                {t('About.title')}
              </h1>
              <p className="body-large text-gray-600 mb-8">
                {t('About.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/${locale}/contact`} className="btn-primary">
                  {t('Common.contactUs')}
                </Link>
                <Link href={`/${locale}/products`} className="btn-secondary">
                  {t('About.viewProducts')}
                </Link>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <OptimizedImage
                src="/images/about/company-building.jpg"
                alt={t('About.companyBuilding')}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Company Stats */}
          <div className="mt-24 sm:mt-32">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="heading-2 mb-4">
                  {t('About.companyStats')}
                </h2>
                <p className="body-large text-gray-600">
                  {t('About.statsDescription')}
                </p>
              </div>
              
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col bg-gray-50 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    {t('About.yearsExperience')}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">
                    15+
                  </dd>
                </div>
                <div className="flex flex-col bg-gray-50 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    {t('About.projectsCompleted')}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">
                    1000+
                  </dd>
                </div>
                <div className="flex flex-col bg-gray-50 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    {t('About.countriesServed')}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">
                    50+
                  </dd>
                </div>
                <div className="flex flex-col bg-gray-50 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    {t('About.employees')}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">
                    200+
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Company History */}
          <div className="mt-24 sm:mt-32">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="heading-2 mb-4">
                  {t('About.companyHistory')}
                </h2>
                <p className="body-large text-gray-600">
                  {t('About.historyDescription')}
                </p>
              </div>
              
              <div className="mt-16">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
                  
                  {milestones.map((milestone, index) => (
                    <div key={milestone.year} className="relative flex items-center justify-between mb-8">
                      <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 text-left pl-8'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <div className="text-2xl font-bold text-primary-600 mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mt-24 sm:mt-32">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="heading-2 mb-4">
                  {t('About.leadershipTeam')}
                </h2>
                <p className="body-large text-gray-600">
                  {t('About.teamDescription')}
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <div key={member.name} className="text-center">
                    <div className="mx-auto h-40 w-40 rounded-full overflow-hidden mb-4">
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-24 sm:mt-32">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="heading-2 mb-4">
                  {t('About.certifications')}
                </h2>
                <p className="body-large text-gray-600">
                  {t('About.certificationsDescription')}
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="text-center">
                    <div className="mx-auto h-24 w-24 mb-4">
                      <OptimizedImage
                        src={cert.image}
                        alt={cert.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mt-24 sm:mt-32">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-16">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('About.ourMission')}
                  </h3>
                  <p className="text-gray-600">
                    {t('About.missionDescription')}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t('About.ourVision')}
                  </h3>
                  <p className="text-gray-600">
                    {t('About.visionDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 sm:mt-32 text-center">
            <h2 className="heading-2 mb-4">
              {t('About.readyToWork')}
            </h2>
            <p className="body-large text-gray-600 mb-8">
              {t('About.workDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-primary">
                {t('Common.contactUs')}
              </Link>
              <Link href={`/${locale}/case-studies`} className="btn-secondary">
                {t('About.viewCaseStudies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}