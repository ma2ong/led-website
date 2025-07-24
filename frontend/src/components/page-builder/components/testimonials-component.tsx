/**
 * Testimonials Component for Page Builder
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  position?: string;
  company?: string;
  avatar?: string;
}

interface TestimonialsComponentProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'carousel' | 'single';
  backgroundColor?: string;
  locale: string;
  className?: string;
}

export const TestimonialsComponent: React.FC<TestimonialsComponentProps> = ({
  testimonials = [],
  title,
  subtitle,
  layout = 'grid',
  backgroundColor,
  locale,
  className,
}) => {
  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <section 
        className={cn('py-16 sm:py-24', className)}
        style={containerStyle}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">No testimonials to display</p>
          </div>
        </div>
      </section>
    );
  }

  const renderTestimonial = (testimonial: Testimonial, index: number) => (
    <div key={index} className="bg-white p-8 rounded-lg shadow-md">
      <blockquote className="text-lg text-gray-700 mb-6">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="h-12 w-12 rounded-full mr-4"
          />
        )}
        <div>
          <div className="font-semibold text-gray-900">
            {testimonial.author}
          </div>
          {testimonial.position && (
            <div className="text-sm text-gray-600">
              {testimonial.position}
              {testimonial.company && `, ${testimonial.company}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section 
      className={cn('py-16 sm:py-24', className)}
      style={containerStyle}
    >
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

        {layout === 'single' ? (
          <div className="max-w-3xl mx-auto">
            {renderTestimonial(testimonials[0], 0)}
          </div>
        ) : layout === 'carousel' ? (
          <div className="max-w-4xl mx-auto">
            {/* Simple carousel - in production, you'd use a proper carousel library */}
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    {renderTestimonial(testimonial, index)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial, index) => 
              renderTestimonial(testimonial, index)
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsComponent;