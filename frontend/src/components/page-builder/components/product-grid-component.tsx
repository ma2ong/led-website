/**
 * Product Grid Component for Page Builder
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product/product-card';

interface ProductGridComponentProps {
  category?: string;
  limit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
  locale: string;
  className?: string;
}

export const ProductGridComponent: React.FC<ProductGridComponentProps> = ({
  category,
  limit = 6,
  showFilters = false,
  title,
  subtitle,
  locale,
  className,
}) => {
  // This would typically fetch products from an API
  // For now, we'll show a placeholder
  
  return (
    <section className={cn('py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {showFilters && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <button className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                All Products
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
                Indoor Displays
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
                Outdoor Displays
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200">
                Rental Screens
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder products - in real implementation, this would fetch from API */}
          {Array.from({ length: Math.min(limit, 6) }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">Product Image</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Product {index + 1}
                </h3>
                <p className="text-gray-600 mb-4">
                  Product description goes here...
                </p>
                <button className="text-primary-600 font-medium hover:text-primary-500">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {limit > 6 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGridComponent;