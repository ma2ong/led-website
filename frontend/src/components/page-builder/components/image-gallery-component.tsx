/**
 * Image Gallery Component for Page Builder
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface ImageGalleryComponentProps {
  images?: GalleryImage[];
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
  title?: string;
  locale: string;
  className?: string;
}

export const ImageGalleryComponent: React.FC<ImageGalleryComponentProps> = ({
  images = [],
  columns = 3,
  showCaptions = true,
  title,
  locale,
  className,
}) => {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      case 3:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (!images || images.length === 0) {
    return (
      <section className={cn('py-16 sm:py-24', className)}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">No images to display</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-16 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
          </div>
        )}
        
        <div className={cn('grid gap-6', getGridColumns())}>
          {images.map((image, index) => (
            <div key={index} className="group">
              <div className="aspect-w-4 aspect-h-3 relative overflow-hidden rounded-lg bg-gray-100">
                <OptimizedImage
                  src={image.url}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {showCaptions && image.caption && (
                <p className="mt-3 text-sm text-gray-600 text-center">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGalleryComponent;