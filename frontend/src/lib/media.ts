/**
 * Media utilities for handling images and files
 */

export interface MediaFile {
  id: number
  name: string
  url: string
  mime: string
  size: number
  width?: number
  height?: number
  alternativeText?: string
  caption?: string
  formats?: {
    thumbnail?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
  }
}

/**
 * Get optimized image URL with specified parameters
 */
export function getOptimizedImageUrl(
  file: MediaFile | string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif'
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' | 'scale' | 'crop' | 'pad'
    gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west'
    blur?: number
    sharpen?: boolean
  } = {}
): string {
  const url = typeof file === 'string' ? file : file.url
  
  // Handle relative URLs by making them absolute
  const absoluteUrl = url.startsWith('/') 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`
    : url
  
  // If it's a Cloudinary URL, add transformation parameters
  if (absoluteUrl.includes('cloudinary.com') || absoluteUrl.includes('res.cloudinary.com')) {
    const transformations: string[] = []
    
    if (options.width) transformations.push(`w_${options.width}`)
    if (options.height) transformations.push(`h_${options.height}`)
    if (options.quality) transformations.push(`q_${options.quality}`)
    if (options.format) transformations.push(`f_${options.format}`)
    if (options.fit) {
      const cropMap = {
        'cover': 'fill',
        'contain': 'fit',
        'fill': 'fill',
        'inside': 'fit',
        'outside': 'fill',
        'scale': 'scale',
        'crop': 'crop',
        'pad': 'pad'
      }
      transformations.push(`c_${cropMap[options.fit] || options.fit}`)
    }
    if (options.gravity) transformations.push(`g_${options.gravity}`)
    if (options.blur) transformations.push(`e_blur:${options.blur}`)
    if (options.sharpen) transformations.push('e_sharpen')
    
    // Add automatic format and quality optimization if not specified
    if (!options.format) transformations.push('f_auto')
    if (!options.quality) transformations.push('q_auto:good')
    
    if (transformations.length > 0) {
      // Insert transformations into Cloudinary URL
      const parts = absoluteUrl.split('/upload/')
      if (parts.length === 2) {
        return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`
      }
    }
  }
  
  // For Strapi API URLs, add query parameters
  if (absoluteUrl.includes('/api/') && (options.width || options.height || options.quality)) {
    const params = new URLSearchParams()
    if (options.width) params.append('width', options.width.toString())
    if (options.height) params.append('height', options.height.toString())
    if (options.quality && options.quality !== 'auto') params.append('quality', options.quality.toString())
    if (options.format && options.format !== 'auto') params.append('format', options.format)
    
    const separator = absoluteUrl.includes('?') ? '&' : '?'
    return `${absoluteUrl}${separator}${params.toString()}`
  }
  
  return absoluteUrl
}

/**
 * Get responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(file: MediaFile | string): {
  src: string
  srcSet: string
  sizes: string
} {
  const baseUrl = typeof file === 'string' ? file : file.url
  
  const breakpoints = [
    { width: 640, size: '640w' },
    { width: 768, size: '768w' },
    { width: 1024, size: '1024w' },
    { width: 1280, size: '1280w' },
    { width: 1536, size: '1536w' },
    { width: 1920, size: '1920w' },
  ]
  
  const srcSet = breakpoints
    .map(bp => `${getOptimizedImageUrl(baseUrl, { width: bp.width })} ${bp.size}`)
    .join(', ')
  
  const sizes = [
    '(max-width: 640px) 640px',
    '(max-width: 768px) 768px', 
    '(max-width: 1024px) 1024px',
    '(max-width: 1280px) 1280px',
    '(max-width: 1536px) 1536px',
    '1920px'
  ].join(', ')
  
  return {
    src: getOptimizedImageUrl(baseUrl, { width: 1920 }),
    srcSet,
    sizes,
  }
}

/**
 * Get the best format for a given file based on browser support
 */
export function getBestImageFormat(file: MediaFile): string {
  // Check if browser supports WebP
  const supportsWebP = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  
  if (supportsWebP && file.mime.startsWith('image/')) {
    return getOptimizedImageUrl(file, { format: 'webp' })
  }
  
  return file.url
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Check if file is an image
 */
export function isImage(file: MediaFile | string): boolean {
  if (typeof file === 'string') {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  }
  return file.mime.startsWith('image/')
}

/**
 * Check if file is a video
 */
export function isVideo(file: MediaFile | string): boolean {
  if (typeof file === 'string') {
    return /\.(mp4|webm|ogg|avi|mov)$/i.test(file)
  }
  return file.mime.startsWith('video/')
}

/**
 * Check if file is a document
 */
export function isDocument(file: MediaFile | string): boolean {
  if (typeof file === 'string') {
    return /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(file)
  }
  return file.mime.startsWith('application/') || file.mime.includes('document')
}

/**
 * Generate alt text for images based on filename
 */
export function generateAltText(file: MediaFile): string {
  if (file.alternativeText) {
    return file.alternativeText;
  }
  
  return file.name
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
}

/**
 * Get thumbnail URL for any media file
 */
export function getThumbnailUrl(file: MediaFile, size: number = 150): string {
  if (file.formats?.thumbnail) {
    return file.formats.thumbnail.url
  }
  
  if (isImage(file)) {
    return getOptimizedImageUrl(file, { 
      width: size, 
      height: size, 
      fit: 'cover' 
    })
  }
  
  // Return a default thumbnail for non-image files
  return '/images/file-thumbnail.png'
}