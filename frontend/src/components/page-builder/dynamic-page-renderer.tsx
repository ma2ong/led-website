/**
 * Dynamic Page Renderer
 * Renders page builder components on the frontend
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { HeroComponent } from './components/hero-component';
import { TextBlockComponent } from './components/text-block-component';
import { ImageGalleryComponent } from './components/image-gallery-component';
import { ProductGridComponent } from './components/product-grid-component';
import { ContactFormComponent } from './components/contact-form-component';
import { TestimonialsComponent } from './components/testimonials-component';
import { StatsComponent } from './components/stats-component';
import { CtaComponent } from './components/cta-component';

interface PageComponent {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  children?: PageComponent[];
}

interface DynamicPageRendererProps {
  components: PageComponent[];
  locale: string;
  pageTitle?: string;
  template?: string;
  className?: string;
}

export const DynamicPageRenderer: React.FC<DynamicPageRendererProps> = ({
  components,
  locale,
  pageTitle,
  template = 'default',
  className,
}) => {
  const renderComponent = (component: PageComponent) => {
    const commonProps = {
      key: component.id,
      locale,
      ...component.props,
    };

    switch (component.type) {
      case 'hero':
        return <HeroComponent {...commonProps} />;
      
      case 'textBlock':
        return <TextBlockComponent {...commonProps} />;
      
      case 'imageGallery':
        return <ImageGalleryComponent {...commonProps} />;
      
      case 'productGrid':
        return <ProductGridComponent {...commonProps} />;
      
      case 'contactForm':
        return <ContactFormComponent {...commonProps} />;
      
      case 'testimonials':
        return <TestimonialsComponent {...commonProps} />;
      
      case 'stats':
        return <StatsComponent {...commonProps} />;
      
      case 'cta':
        return <CtaComponent {...commonProps} />;
      
      default:
        console.warn(`Unknown component type: ${component.type}`);
        return (
          <div key={component.id} className="p-4 bg-yellow-100 border border-yellow-300 rounded">
            <p className="text-yellow-800">
              Unknown component type: {component.type}
            </p>
          </div>
        );
    }
  };

  const getTemplateClassName = () => {
    switch (template) {
      case 'landing':
        return 'template-landing';
      case 'product':
        return 'template-product';
      case 'about':
        return 'template-about';
      case 'contact':
        return 'template-contact';
      default:
        return 'template-default';
    }
  };

  if (!components || components.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {pageTitle || 'Page'}
          </h1>
          <p className="text-gray-600">
            This page has no content yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'dynamic-page',
      getTemplateClassName(),
      className
    )}>
      {components.map(renderComponent)}
    </div>
  );
};

export default DynamicPageRenderer;