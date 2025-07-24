/**
 * News Detail Page
 * Displays detailed information about a specific news article
 */

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsArticle, getNews } from '@/services/news';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { Badge } from '@/components/ui/badge';
import { NewsCard } from '@/components/news/news-card';

interface NewsDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function NewsDetailPage({ 
  params: { locale, slug } 
}: NewsDetailPageProps) {
  const t = useTranslations();

  // Fetch news article data
  const articleResponse = await getNewsArticle(slug, { locale });
  
  if (!articleResponse.data) {
    notFound();
  }

  const article = articleResponse.data;

  // Fetch related articles
  const relatedResponse = await getNews({
    locale,
    page: 1,
    pageSize: 3,
    filters: {
      category: article.category,
      exclude: article.id
    }
  });

  const relatedArticles = relatedResponse.data;

  const breadcrumbItems = [
    { name: t('Navigation.home'), url: `/${locale}` },
    { name: t('Navigation.news'), url: `/${locale}/news` },
    { name: article.title, url: `/${locale}/news/${slug}` },
  ];

  return (
    <>
      <SEOHead
        title={`${article.title} - ${t('News.pageTitle')}`}
        description={article.excerpt || article.content?.substring(0, 160)}
        canonical={`/${locale}/news/${slug}`}
        openGraph={{
          type: 'article',
          images: article.featuredImage ? [article.featuredImage.url] : undefined,
          publishedTime: article.publishedAt,
          modifiedTime: article.updatedAt,
          authors: article.author ? [article.author] : undefined,
        }}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <article className="mx-auto max-w-3xl">
            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="primary">
                  {t(`News.categories.${article.category}`)}
                </Badge>
                {article.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="heading-1 mb-6">
                {article.title}
              </h1>
              
              {article.excerpt && (
                <p className="body-large text-gray-600 mb-6">
                  {article.excerpt}
                </p>
              )}
              
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                {article.author && (
                  <span>{t('News.byAuthor', { author: article.author })}</span>
                )}
                <span>
                  {new Date(article.publishedAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span>{t('News.readTime', { minutes: Math.ceil((article.content?.length || 0) / 1000) })}</span>
              </div>
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alternativeText || article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {article.featuredImage.caption && (
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    {article.featuredImage.caption}
                  </p>
                )}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {article.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <footer className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {t('News.lastUpdated')}:
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date(article.updatedAt).toLocaleDateString(locale)}
                  </span>
                </div>
                
                {/* Social Share */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {t('News.share')}:
                  </span>
                  <div className="flex space-x-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                      aria-label="Share on Twitter"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-700"
                      aria-label="Share on Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {t('News.relatedArticles')}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <NewsCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('News.stayUpdated')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('News.stayUpdatedDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('News.viewAllNews')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('News.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate static params for all news articles
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const newsResponse = await getNews({
    locale: params.locale,
    page: 1,
    pageSize: 100, // Get all articles for static generation
  });

  return newsResponse.data.map((article) => ({
    slug: article.slug,
  }));
}