import { notFound } from 'next/navigation';
import { getPageBuilderData } from '@/services/page-builder';
import { SEOHead } from '@/components/layout/seo-head';
import DynamicPageRenderer from '@/components/page-builder/dynamic-page-renderer';

interface PageBuilderPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function PageBuilderPage({ params }: PageBuilderPageProps) {
  const { locale, slug } = params;
  
  const pageData = await getPageBuilderData(slug, locale);
  
  if (!pageData) {
    notFound();
  }

  return (
    <>
      <SEOHead
        title={pageData.title || '页面'}
        description={pageData.description || ''}
        canonical={`/${locale}/page-builder/${slug}`}
      />
      <DynamicPageRenderer pageData={pageData} locale={locale} />
    </>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  // 这里可以从API获取所有页面构建器页面的slug
  return [
    { locale: 'zh', slug: 'custom-page' },
    { locale: 'en', slug: 'custom-page' },
  ];
}