'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  getOptimizedImageUrl,
  generateSrcSet,
  generateResponsiveSizes,
  generatePlaceholder,
  getImageErrorFallback,
  getAdaptiveImageQuality,
  IMAGE_SIZES,
} from '@/lib/media';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholder?: 'blur' | 'empty';
  fallbackType?: 'product' | 'news' | 'case' | 'general';
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality,
  sizes,
  fill = false,
  objectFit = 'cover',
  placeholder = 'blur',
  fallbackType = 'general',
  lazy = true,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adaptiveQuality, setAdaptiveQuality] = useState(quality || 75);

  useEffect(() => {
    if (!quality) {
      setAdaptiveQuality(getAdaptiveImageQuality());
    }
  }, [quality]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // 如果图片加载失败，使用fallback图片
  const imageSrc = imageError ? getImageErrorFallback(fallbackType) : src;
  
  // 优化图片URL
  const optimizedSrc = getOptimizedImageUrl(imageSrc, {
    width: width,
    height: height,
    quality: adaptiveQuality,
    format: 'webp',
  });

  // 生成响应式sizes
  const responsiveSizes = sizes || generateResponsiveSizes(imageSrc);

  // 生成占位符
  const blurDataURL = placeholder === 'blur' 
    ? generatePlaceholder(width || 400, height || 300)
    : undefined;

  const imageProps = {
    src: optimizedSrc,
    alt,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    priority,
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder as any,
    blurDataURL,
    quality: adaptiveQuality,
    ...(fill ? {
      fill: true,
      style: { objectFit },
    } : {
      width,
      height,
    }),
    sizes: responsiveSizes,
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <Image {...imageProps} />
      
      {/* 加载指示器 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )}
      
      {/* 错误状态 */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-sm">图片加载失败</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 预设尺寸的图片组件
export function ProductImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'fallbackType'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      fallbackType="product"
      width={IMAGE_SIZES.MEDIUM.width}
      height={IMAGE_SIZES.MEDIUM.height}
      {...props}
    />
  );
}

export function NewsImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'fallbackType'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      fallbackType="news"
      width={IMAGE_SIZES.MEDIUM.width}
      height={IMAGE_SIZES.MEDIUM.height}
      {...props}
    />
  );
}

export function CaseImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'fallbackType'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      fallbackType="case"
      width={IMAGE_SIZES.MEDIUM.width}
      height={IMAGE_SIZES.MEDIUM.height}
      {...props}
    />
  );
}

export function HeroImage({ src, alt, className, ...props }: Omit<OptimizedImageProps, 'fallbackType' | 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      fallbackType="general"
      width={IMAGE_SIZES.HERO.width}
      height={IMAGE_SIZES.HERO.height}
      priority
      {...props}
    />
  );
}

// 图片画廊组件
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
  columns?: number;
}

export function ImageGallery({ images, className = '', columns = 3 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-3';

  return (
    <>
      <div className={`grid ${gridCols} gap-4 ${className}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
            onClick={() => setSelectedImage(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      {/* 图片预览模态框 */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <OptimizedImage
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            
            {/* 导航按钮 */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
                  }}
                >
                  ‹
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}