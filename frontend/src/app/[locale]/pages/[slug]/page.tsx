/**
 * Dynamic Page Component
 * Renders pages created with the page builder
 */

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SEOHead } from '@/components/layout/seo-head';
import { DynamicPageRenderer } from '@/components/page-builder/dynamic-page-renderer';
import { getPageBySlug } from '@/services/page-builder';

interface DynamicPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ 
  params: { locale, slug } 
}: DynamicPageProps): Promise<Metadata> {
  try {
    const page = await getPageBySlug(slug, locale);
    
    if (!page) {
      return {
        title: 'Page Not Found',
      };
    }

    return {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription,
      keywords: page.seo?.keywords,
      openGraph: {
        title: page.seo?.metaTitle || page.title,
        description: page.seo?.metaDescription,
        images: page.seo?.metaImage ? [page.seo.metaImage.url] : [],
      },
      alternates: {
        canonical: page.seo?.canonicalURL,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for dynamic page:', error);
    return {
      title: 'Page Not Found',
    };
  }
}

export default async function DynamicPage({ 
  params: { locale, slug } 
}: DynamicPageProps) {
  try {
    const page = await getPageBySlug(slug, locale);

    if (!page) {
      notFound();
    }

    return (
      <>
        <SEOHead
          title={page.seo?.metaTitle || page.title}
          description={page.seo?.metaDescription}
          canonical={`/${locale}/pages/${slug}`}
          keywords={page.seo?.keywords}
          ogImage={page.seo?.metaImage?.url}
        />
        
        <DynamicPageRenderer 
          components={page.components}
          locale={locale}
          pageTitle={page.title}
          template={page.template}
        />
      </>
    );
  } catch (error) {
    console.error('Error rendering dynamic page:', error);
    notFound();
  }
}