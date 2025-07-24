/**
 * Contact Form Component for Page Builder
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { InquiryForm } from '@/components/inquiry/inquiry-form';

interface ContactFormComponentProps {
  title?: string;
  description?: string;
  fields?: string[];
  backgroundColor?: string;
  locale: string;
  className?: string;
}

export const ContactFormComponent: React.FC<ContactFormComponentProps> = ({
  title,
  description,
  fields = ['name', 'email', 'message'],
  backgroundColor,
  locale,
  className,
}) => {
  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
  };

  return (
    <section 
      className={cn('py-16 sm:py-24', className)}
      style={containerStyle}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {(title || description) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-lg text-gray-600">
                  {description}
                </p>
              )}
            </div>
          )}

          <InquiryForm 
            locale={locale as any}
            variant="compact"
            className="bg-white rounded-lg shadow-lg p-8"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactFormComponent;