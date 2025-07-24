/**
 * Stats Component for Page Builder
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

interface StatsComponentProps {
  stats?: Stat[];
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'inline';
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  textColor?: string;
  locale: string;
  className?: string;
}

export const StatsComponent: React.FC<StatsComponentProps> = ({
  stats = [],
  title,
  subtitle,
  layout = 'grid',
  columns = 4,
  backgroundColor,
  textColor,
  locale,
  className,
}) => {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    }
  };

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <section 
      className={cn('py-16 sm:py-24', className)}
      style={containerStyle}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mx-auto max-w-2xl text-center mb-16">
            {title && (
              <h2 className={cn(
                'text-3xl font-bold tracking-tight sm:text-4xl mb-4',
                textColor ? '' : 'text-gray-900'
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn(
                'text-lg leading-8',
                textColor ? 'opacity-80' : 'text-gray-600'
              )}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        {layout === 'grid' ? (
          <div className={cn(
            'grid gap-8',
            getGridColumns()
          )}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                {stat.icon && (
                  <div className="mb-4 text-4xl">
                    {stat.icon}
                  </div>
                )}
                <div className={cn(
                  'text-4xl font-bold tracking-tight sm:text-5xl mb-2',
                  textColor ? '' : 'text-primary-600'
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  'text-lg font-semibold mb-1',
                  textColor ? '' : 'text-gray-900'
                )}>
                  {stat.label}
                </div>
                {stat.description && (
                  <div className={cn(
                    'text-sm',
                    textColor ? 'opacity-70' : 'text-gray-600'
                  )}>
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Inline Layout */
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                {stat.icon && (
                  <div className="mb-2 text-2xl">
                    {stat.icon}
                  </div>
                )}
                <div className={cn(
                  'text-3xl font-bold tracking-tight sm:text-4xl mb-1',
                  textColor ? '' : 'text-primary-600'
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  'text-base font-semibold',
                  textColor ? '' : 'text-gray-900'
                )}>
                  {stat.label}
                </div>
                {stat.description && (
                  <div className={cn(
                    'text-xs mt-1',
                    textColor ? 'opacity-70' : 'text-gray-600'
                  )}>
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsComponent;