// 媒体资源处理工具

// 图片优化配置
export const IMAGE_QUALITY = {
  HIGH: 90,
  MEDIUM: 75,
  LOW: 60,
} as const;

export const IMAGE_SIZES = {
  THUMBNAIL: { width: 150, height: 150 },
  SMALL: { width: 300, height: 200 },
  MEDIUM: { width: 600, height: 400 },
  LARGE: { width: 1200, height: 800 },
  HERO: { width: 1920, height: 1080 },
} as const;

// 支持的图片格式
export const SUPPORTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
] as const;

// 图片URL处理函数
export function getOptimizedImageUrl(
  originalUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}
): string {
  if (!originalUrl) return '';
  
  // 如果是外部URL，直接返回
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }
  
  // 构建Strapi图片变换URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const params = new URLSearchParams();
  
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());
  if (options.format) params.append('format', options.format);
  
  const queryString = params.toString();
  const separator = originalUrl.includes('?') ? '&' : '?';
  
  return `${baseUrl}${originalUrl}${queryString ? separator + queryString : ''}`;
}

// 响应式图片尺寸生成
export function generateResponsiveSizes(
  originalUrl: string,
  breakpoints: { [key: string]: number } = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  }
): string {
  const sizes = Object.entries(breakpoints)
    .map(([breakpoint, width]) => {
      if (breakpoint === 'sm') {
        return `(max-width: ${width}px) 100vw`;
      }
      return `(max-width: ${width}px) 50vw`;
    })
    .join(', ');
  
  return `${sizes}, 33vw`;
}

// 生成srcSet
export function generateSrcSet(
  originalUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(originalUrl, { 
        width,
        quality: IMAGE_QUALITY.MEDIUM,
        format: 'webp'
      });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

// 图片懒加载配置
export const LAZY_LOADING_CONFIG = {
  rootMargin: '50px',
  threshold: 0.1,
};

// 图片占位符生成
export function generatePlaceholder(width: number, height: number, color = '#1f2937'): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        Loading...
      </text>
    </svg>
  `)}`;
}

// 图片错误处理
export function getImageErrorFallback(type: 'product' | 'news' | 'case' | 'general' = 'general'): string {
  const fallbacks = {
    product: '/images/fallback/product-placeholder.jpg',
    news: '/images/fallback/news-placeholder.jpg',
    case: '/images/fallback/case-placeholder.jpg',
    general: '/images/fallback/image-placeholder.jpg',
  };
  
  return fallbacks[type];
}

// 视频处理函数
export function getVideoThumbnail(videoUrl: string): string {
  // YouTube视频缩略图
  const youtubeMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (youtubeMatch) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }
  
  // Vimeo视频缩略图需要API调用，这里返回默认占位符
  const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return '/images/fallback/video-placeholder.jpg';
  }
  
  return '/images/fallback/video-placeholder.jpg';
}

// 文件大小格式化
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 图片预加载
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// 批量图片预加载
export async function preloadImages(urls: string[]): Promise<void> {
  const promises = urls.map(url => preloadImage(url));
  await Promise.all(promises);
}

// 图片压缩（客户端）
export function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // 计算新尺寸
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // 绘制并压缩
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve!, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
}

// 媒体查询工具
export const MEDIA_QUERIES = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
} as const;

// 检测设备类型
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// 检测网络连接质量
export function getConnectionQuality(): 'slow' | 'fast' | 'unknown' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }
  
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  }
  
  return 'fast';
}

// 根据网络质量调整图片质量
export function getAdaptiveImageQuality(): number {
  const connectionQuality = getConnectionQuality();
  const deviceType = getDeviceType();
  
  if (connectionQuality === 'slow') {
    return IMAGE_QUALITY.LOW;
  }
  
  if (deviceType === 'mobile') {
    return IMAGE_QUALITY.MEDIUM;
  }
  
  return IMAGE_QUALITY.HIGH;
}