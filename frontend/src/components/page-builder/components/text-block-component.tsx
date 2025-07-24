/**
 * Text Block Component for Page Builder
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface TextBlockComponentProps {
  title?: string;
  content?: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  textColor?: string;
  locale: string;
  className?: string;
}

export const TextBlockComponent: React.FC<TextBlockComponentProps> = ({
  title,
  content,
  alignment = 'left',
  size = 'medium',
  backgroundColor,
  textColor,
  locale,
  className,
}) => {
  const getAlignmentClass = () => {
    switch (alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'py-8 sm:py-12',
          title: 'text-2xl sm:text-3xl',
          content: 'text-base',
          maxWidth: 'max-w-3xl',
        };
      case 'large':
        return {
          container: 'py-16 sm:py-24',
          title: 'text-3xl sm:text-5xl',
          content: 'text-lg sm:text-xl',
          maxWidth: 'max-w-5xl',
        };
      case 'medium':
      default:
        return {
          container: 'py-12 sm:py-16',
          title: 'text-3xl sm:text-4xl',
          content: 'text-base sm:text-lg',
          maxWidth: 'max-w-4xl',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  };

  // Process content to handle basic HTML and line breaks
  const processContent = (text: string) => {
    if (!text) return '';
    
    // Convert line breaks to <br> tags
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  return (
    <section 
      className={cn(
        sizeClasses.container,
        className
      )}
      style={containerStyle}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={cn(
          'mx-auto',
          sizeClasses.maxWidth,
          getAlignmentClass()
        )}>
          {title && (
            <h2 className={cn(
              'font-bold tracking-tight mb-6',
              sizeClasses.title,
              textColor ? '' : 'text-gray-900'
            )}>
              {title}
            </h2>
          )}
          
          {content && (
            <div 
              className={cn(
                'leading-relaxed',
                sizeClasses.content,
                textColor ? '' : 'text-gray-600'
              )}
              dangerouslySetInnerHTML={{ 
                __html: processContent(content) 
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TextBlockComponent;