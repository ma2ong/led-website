'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { FadeInUp } from '@/components/AnimatedSection';

interface ProductSpec {
  name: string;
  value: string;
  unit?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: ProductSpec[];
  applications: string[];
  features: string[];
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  className?: string;
}

export default function ProductCard({
  product,
  onViewDetails,
  onRequestQuote,
  className = '',
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      'fine-pitch': 'from-blue-500 to-blue-700',
      'rental': 'from-purple-500 to-purple-700',
      'outdoor': 'from-green-500 to-green-700',
      'creative': 'from-pink-500 to-pink-700',
      'all-in-one': 'from-teal-500 to-teal-700',
      'poster': 'from-red-500 to-red-700',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-700';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'fine-pitch': '📺',
      'rental': '🎭',
      'outdoor': '🏢',
      'creative': '✨',
      'all-in-one': '💼',
      'poster': '📱',
    };
    return icons[category as keyof typeof icons] || '📺';
  };

  return (
    <FadeInUp className={`group ${className}`}>
      <article className="led-card overflow-hidden hover-lift">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(product.category)} opacity-90`} />
          
          {/* Placeholder/Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">{getCategoryIcon(product.category)}</div>
                <div className="text-xl font-bold">{product.name}</div>
              </div>
            </div>
          )}

          {/* Actual Image */}
          <OptimizedImage
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="led-badge bg-orange-500 text-white">新品</span>
            )}
            {product.isFeatured && (
              <span className="led-badge bg-yellow-500 text-black">推荐</span>
            )}
            {!product.inStock && (
              <span className="led-badge bg-red-500 text-white">缺货</span>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="led-badge-outline text-white border-white">
              {product.category}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-3">
              <button
                onClick={() => onViewDetails(product)}
                className="btn-led-primary text-sm px-4 py-2"
              >
                查看详情
              </button>
              <button
                onClick={() => onRequestQuote(product)}
                className="btn-led-outline text-sm px-4 py-2 text-white border-white hover:bg-white hover:text-gray-900"
              >
                询价
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
              {product.name}
            </h3>
            {product.price && (
              <div className="text-right">
                <div className="text-orange-400 font-bold">
                  ${product.price.min} - ${product.price.max}
                </div>
                <div className="text-xs text-gray-400">起价</div>
              </div>
            )}
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Key Specs */}
          {product.specs.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">主要规格：</h4>
              <div className="grid grid-cols-2 gap-2">
                {product.specs.slice(0, 4).map((spec, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-gray-400">{spec.name}:</span>
                    <span className="text-gray-300">
                      {spec.value}{spec.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">主要特点：</h4>
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{product.features.length - 3} 更多
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Applications */}
          {product.applications.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">应用场景：</h4>
              <div className="text-xs text-gray-400">
                {product.applications.slice(0, 3).join(' • ')}
                {product.applications.length > 3 && ' • ...'}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onViewDetails(product)}
              className="flex-1 btn-led-secondary text-sm py-2"
            >
              查看详情
            </button>
            <button
              onClick={() => onRequestQuote(product)}
              className="flex-1 btn-led-outline text-sm py-2"
              disabled={!product.inStock}
            >
              {product.inStock ? '立即询价' : '缺货'}
            </button>
          </div>
        </div>
      </article>
    </FadeInUp>
  );
}

// 产品网格组件
interface ProductGridProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  loading?: boolean;
  className?: string;
}

export function ProductGrid({
  products,
  onViewDetails,
  onRequestQuote,
  loading = false,
  className = '',
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={`led-grid-3 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="led-card animate-pulse">
            <div className="h-64 bg-gray-700" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded" />
                <div className="h-3 bg-gray-700 rounded w-2/3" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1 h-8 bg-gray-700 rounded" />
                <div className="flex-1 h-8 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">未找到产品</h3>
        <p className="text-gray-400">请尝试调整筛选条件或搜索关键词</p>
      </div>
    );
  }

  return (
    <div className={`led-grid-3 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
          onRequestQuote={onRequestQuote}
        />
      ))}
    </div>
  );
}

// 产品类型定义导出
export type { Product, ProductSpec };