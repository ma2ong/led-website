'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { type MediaFile } from '@/lib/media'
import { performanceConfig, getImageOptimization } from '@/lib/performance-config'

interface OptimizedImageProps {
  src: MediaFile | string
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  type?: 'thumbnail' | 'small' | 'medium' | 'large' | 'hero'
  lazyLoading?: boolean
  fadeIn?: boolean
  webpFallback?: boolean
  avifSupport?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  fill = false,
  quality,
  placeholder = 'empty',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  type = 'medium',
  lazyLoading = true,
  fadeIn = true,
  webpFallback = true,
  avifSupport = true,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazyLoading || priority)
  const imgRef = useRef<HTMLDivElement>(null)

  // Handle image source
  const imageUrl = typeof src === 'object' ? src.url : src
  const imageAlt = alt || (typeof src === 'object' ? src.alternativeText || '' : '')

  // Get image optimization config
  const imageConfig = getImageOptimization(type)
  const finalQuality = quality || imageConfig.quality

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoading || priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: imageConfig.lazyLoading.rootMargin,
        threshold: imageConfig.lazyLoading.threshold
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazyLoading, priority, isInView, imageConfig.lazyLoading])

  const handleLoad = () => {
    setImageLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setImageError(true)
    onError?.()
  }

  // Generate responsive sizes
  const responsiveSizes = sizes || generateResponsiveSizes(type)

  // Generate optimized image sources
  const avifSrc = avifSupport && imageUrl.match(/\.(jpg|jpeg|png)$/i) 
    ? imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.avif')
    : null
  
  const webpSrc = webpFallback && imageUrl.match(/\.(jpg|jpeg|png)$/i) 
    ? imageUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    : imageUrl

  // Error fallback
  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  // Loading placeholder
  const LoadingPlaceholder = () => (
    <div 
      className={`bg-gray-200 animate-pulse ${fill ? 'absolute inset-0' : ''}`}
      style={!fill ? { width, height } : undefined}
    />
  )

  // Common props
  const commonProps = {
    alt: imageAlt,
    priority,
    quality: finalQuality,
    placeholder,
    blurDataURL,
    sizes: responsiveSizes,
    onLoad: handleLoad,
    onError: handleError,
    className: `transition-all duration-300 ${
      fadeIn && !imageLoaded ? 'opacity-0' : 'opacity-100'
    } ${fadeIn && imageLoaded ? 'animate-fade-in' : ''} ${className}`,
    style: !fill ? { objectFit, objectPosition } : undefined
  }

  return (
    <div 
      ref={imgRef}
      className="relative overflow-hidden"
    >
      {/* Loading state */}
      {!imageLoaded && <LoadingPlaceholder />}
      
      {/* Only load image when in view */}
      {isInView && (
        <>
          {/* Modern image formats with fallback */}
          {(avifSupport || webpFallback) && (avifSrc || webpSrc !== imageUrl) ? (
            <picture>
              {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
              {webpSrc !== imageUrl && <source srcSet={webpSrc} type="image/webp" />}
              {fill ? (
                <Image
                  src={imageUrl}
                  fill
                  {...commonProps}
                />
              ) : (
                <Image
                  src={imageUrl}
                  width={width || 400}
                  height={height || 300}
                  {...commonProps}
                />
              )}
            </picture>
          ) : (
            <>
              {fill ? (
                <Image
                  src={imageUrl}
                  fill
                  {...commonProps}
                />
              ) : (
                <Image
                  src={imageUrl}
                  width={width || 400}
                  height={height || 300}
                  {...commonProps}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

// Generate responsive sizes
function generateResponsiveSizes(type: string): string {
  switch (type) {
    case 'thumbnail':
      return '(max-width: 640px) 150px, 300px'
    case 'small':
      return '(max-width: 640px) 300px, 600px'
    case 'medium':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
    case 'large':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px'
    case 'hero':
      return '100vw'
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
  }
}

// Loading placeholder component
export function ImagePlaceholder({
  width,
  height,
  className,
}: {
  width?: number
  height?: number
  className?: string
}) {
  return (
    <div
      className={`animate-pulse bg-gray-200 flex items-center justify-center ${className || ''}`}
      style={{ width, height }}
    >
      <svg
        className="h-8 w-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}