/**
 * Hero Component for Page Builder
 */

import React from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { cn } from '@/lib/utils';

interface HeroComponentProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
  overlay?: boolean;
  height?: 'small' | 'medium' | 'large' | 'full';
  locale: string;
  className?: string;
}

export const HeroComponent: React.FC<HeroComponentProps> = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink = '#',
  alignment = 'center',
  overlay = true,
  height = 'large',
  locale,
  className,
}) => {
  const getHeightClass = () => {
    switch (height) {
      case 'small':
        return 'h-64 sm:h-80';
      case 'medium':
        return 'h-80 sm:h-96';
      case 'large':
        return 'h-96 sm:h-[32rem]';
      case 'full':
        return 'h-screen';
      default:
        return 'h-96 sm:h-[32rem]';
    }
  };

  const getAlignmentClass = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'center':
      default:
        return 'text-center items-center';
    }
  };

  return (
    <section className={cn(
      'relative flex items-center justify-center',
      getHeightClass(),
      className
    )}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <OptimizedImage
            src={backgroundImage}
            alt={title || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'relative z-10 mx-auto max-w-7xl px-6 lg:px-8',
        'flex flex-col justify-center',
        getAlignmentClass()
      )}>
        <div className="max-w-4xl">
          {title && (
            <h1 className={cn(
              'text-4xl font-bold tracking-tight sm:text-6xl',
              backgroundImage ? 'text-white' : 'text-gray-900'
            )}>
              {title}
            </h1>
          )}
          
          {subtitle && (
            <p className={cn(
              'mt-6 text-lg leading-8 sm:text-xl',
              backgroundImage ? 'text-gray-200' : 'text-gray-600'
            )}>
              {subtitle}
            </p>
          )}
          
          {buttonText && (
            <div className="mt-10">
              {buttonLink.startsWith('http') ? (
                <a
                  href={buttonLink}
                  className="inline-flex items-center rounded-md bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {buttonText}
                </a>
              ) : (
                <Link
                  href={buttonLink}
                  className="inline-flex items-center rounded-md bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator for full height hero */}
      {height === 'full' && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className={cn(
              'h-6 w-6',
              backgroundImage ? 'text-white' : 'text-gray-600'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
    </section>
  );
};

export default HeroComponent;