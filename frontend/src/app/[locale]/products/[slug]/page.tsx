/**
 * 产品详情页面
 * 展示完整产品信息，包括技术规格和相关案例
 */

import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct, getProducts } from '@/services/product';
import { getCaseStudies } from '@/lib/strapi';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { MediaGallery } from '@/components/ui/media-gallery';
import { TechnicalSpecs } from '@/components/product/technical-specs';
import { ProductComparison } from '@/components/product/product-comparison';
import CaseStudyCard from '@/components/case-study/case-study-card';
import ProductCard from '@/components/product/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SEOHead } from '@/components/layout/seo-head';
import { Badge } from '@/components/ui/badge';

interface ProductDetailPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function ProductDetailPage({ 
  params: { locale, slug } 
}: ProductDetailPageProps) {
  const t = useTranslations();

  // Fetch product data
  const productResponse = await getProduct(slug, {
    locale,
    populate: [
      'images',
      'videos', 
      'category',
      'applications',
      'relatedCases',
      'brochures'
    ]
  });

  if (!productResponse.data) {
    notFound();
  }

  const product = productResponse.data;

  // Fetch related products and case studies
  const [relatedProducts, relatedCases] = await Promise.all([
    getProducts({
      filters: {
        category: { id: product.category?.id },
        id: { $ne: product.id }
      },
      pagination: { limit: 4 },
      locale
    }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } })),
    
    getCaseStudies({
      filters: {
        productsUsed: { id: product.id }
      },
      pagination: { limit: 3 },
      locale
    }).catch(() => ({ data: [], meta: { pagination: { total: 0 } } }))
  ]);

  const breadcrumbItems = [
    { label: t('Navigation.home'), href: `/${locale}` },
    { label: t('Navigation.products'), href: `/${locale}/products` },
  ];

  if (product.category) {
    breadcrumbItems.push({
      label: product.category.name,
      href: `/${locale}/products?category=${product.category.slug}`
    });
  }

  breadcrumbItems.push({
    label: product.name,
    href: `/${locale}/products/${product.slug}`
  });

  return (
    <>
      <SEOHead
        title={product.seoTitle || product.name}
        description={product.seoDescription || product.description}
        canonical={`/${locale}/products/${product.slug}`}
        ogImage={product.images?.[0]?.url}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Product Header */}
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product Images */}
            <div className="lg:max-w-lg lg:self-end">
              {product.images && product.images.length > 0 ? (
                <MediaGallery
                  images={product.images}
                  videos={product.videos}
                  alt={product.name}
                />
              ) : (
                <div className="aspect-square w-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">{t('Common.noImage')}</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div className="flex items-center space-x-2 mb-4">
                {product.category && (
                  <Badge variant="secondary">
                    {product.category.name}
                  </Badge>
                )}
                {product.applications?.map((app) => (
                  <Badge key={app.id} variant="outline">
                    {app.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-6">
                <div className="space-y-6 text-base text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    {t('Products.keyFeatures')}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact?product=${product.slug}`}
                  className="btn-primary flex-1 text-center"
                >
                  {t('Products.requestQuote')}
                </Link>
                
                {product.brochures && product.brochures.length > 0 && (
                  <a
                    href={product.brochures[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 text-center"
                  >
                    {t('Products.downloadBrochure')}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.technicalSpecs && (
            <div className="mt-16">
              <TechnicalSpecs 
                specs={product.technicalSpecs}
                title={t('Products.technicalSpecs')}
              />
            </div>
          )}

          {/* Related Case Studies */}
          {relatedCases.data.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('Products.relatedCases')}
                </h2>
                <Link
                  href={`/${locale}/case-studies?product=${product.slug}`}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  {t('Common.viewAll')} →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedCases.data.map((caseStudy) => (
                  <CaseStudyCard
                    key={caseStudy.id}
                    caseStudy={caseStudy}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.data.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('Products.relatedProducts')}
                </h2>
                <Link
                  href={`/${locale}/products?category=${product.category?.slug}`}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  {t('Common.viewAll')} →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.data.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Product Comparison Tool */}
          <div className="mt-16">
            <ProductComparison
              currentProduct={product}
              relatedProducts={relatedProducts.data}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Generate static params for static generation
export async function generateStaticParams({ params: { locale } }) {
  try {
    const products = await getProducts({
      pagination: { limit: 100 },
      locale,
      fields: ['slug']
    });

    return products.data.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    return [];
  }
}