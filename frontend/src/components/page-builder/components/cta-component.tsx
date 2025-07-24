/**
 * CTA (Call to Action) Component for Page Builder
 */

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface CtaComponentProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonStyle?: 'primary' | 'secondary' | 'outline';
  layout?: 'centered' | 'split' | 'minimal';
  locale: string;
  className?: string;
}

export const CtaComponent: React.FC<CtaComponentProps> = ({
  title,
  description,
  buttonText,
  buttonLink = '#',
  secondaryButtonText,
  secondaryButtonLink = '#',
  backgroundImage,
  backgroundColor,
  textColor,
  buttonStyle = 'primary',
  layout = 'centered',
  locale,
  className,
}) => {
  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  const getButtonClasses = (isPrimary = true) => {
    const baseClasses = 'inline-flex items-center rounded-md px-8 py-4 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors';
    
    if (isPrimary) {
      switch (buttonStyle) {
        case 'secondary':
          return cn(baseClasses, 'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600');
        case 'outline':
          return cn(baseClasses, 'border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:outline-primary-600');
        case 'primary':
        default:
          return cn(baseClasses, 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600');
      }
    } else {
      return cn(baseClasses, 'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus-visible:outline-gray-500');
    }
  };

  const renderButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {buttonText && (
        buttonLink.startsWith('http') ? (
          <a
            href={buttonLink}
            className={getButtonClasses(true)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        ) : (
          <Link
            href={buttonLink}
            className={getButtonClasses(true)}
          >
            {buttonText}
          </Link>
        )
      )}
      
      {secondaryButtonText && (
        secondaryButtonLink.startsWith('http') ? (
          <a
            href={secondaryButtonLink}
            className={getButtonClasses(false)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {secondaryButtonText}
          </a>
        ) : (
          <Link
            href={secondaryButtonLink}
            className={getButtonClasses(false)}
          >
            {secondaryButtonText}
          </Link>
        )
      )}
    </div>
  );

  if (layout === 'minimal') {
    return (
      <section 
        className={cn('py-12 sm:py-16', className)}
        style={containerStyle}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            {title && (
              <h2 className={cn(
                'text-2xl font-bold tracking-tight sm:text-3xl mb-4',
                textColor ? '' : 'text-gray-900'
              )}>
                {title}
              </h2>
            )}
            {description && (
              <p className={cn(
                'text-lg mb-8',
                textColor ? 'opacity-80' : 'text-gray-600'
              )}>
                {description}
              </p>
            )}
            {renderButtons()}
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'split') {
    return (
      <section 
        className={cn('py-16 sm:py-24', className)}
        style={containerStyle}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              {title && (
                <h2 className={cn(
                  'text-3xl font-bold tracking-tight sm:text-4xl mb-6',
                  textColor ? '' : 'text-gray-900'
                )}>
                  {title}
                </h2>
              )}
              {description && (
                <p className={cn(
                  'text-lg leading-8 mb-8',
                  textColor ? 'opacity-80' : 'text-gray-600'
                )}>
                  {description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                {renderButtons()}
              </div>
            </div>
            {backgroundImage && (
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={backgroundImage}
                  alt={title || 'CTA image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Centered layout (default)
  return (
    <section className={cn(
      'relative py-16 sm:py-24',
      className
    )}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <OptimizedImage
            src={backgroundImage}
            alt={title || 'CTA background'}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}

      <div 
        className={cn(
          'relative mx-auto max-w-7xl px-6 lg:px-8',
          backgroundImage && !backgroundColor ? '' : 'bg-opacity-90'
        )}
        style={backgroundImage && !backgroundColor ? {} : containerStyle}
      >
        <div className="mx-auto max-w-4xl text-center">
          {title && (
            <h2 className={cn(
              'text-3xl font-bold tracking-tight sm:text-4xl mb-6',
              backgroundImage || textColor ? 'text-white' : 'text-gray-900'
            )}>
              {title}
            </h2>
          )}
          
          {description && (
            <p className={cn(
              'text-lg leading-8 mb-10',
              backgroundImage || textColor ? 'text-gray-200' : 'text-gray-600'
            )}>
              {description}
            </p>
          )}
          
          {renderButtons()}
        </div>
      </div>
    </section>
  );
};

export default CtaComponent;