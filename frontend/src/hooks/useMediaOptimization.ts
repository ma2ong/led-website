import { useState, useEffect, useCallback } from 'react';
import {
  getOptimizedImageUrl,
  getAdaptiveImageQuality,
  preloadImages,
  getConnectionQuality,
  getDeviceType,
} from '@/lib/media';

// 图片预加载钩子
export function useImagePreload(urls: string[]) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (urls.length === 0) {
      setLoaded(true);
      return;
    }

    preloadImages(urls)
      .then(() => {
        setLoaded(true);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoaded(true); // 即使失败也设为已加载，避免无限等待
      });
  }, [urls]);

  return { loaded, error };
}

// 自适应图片质量钩子
export function useAdaptiveImageQuality() {
  const [quality, setQuality] = useState(75);

  useEffect(() => {
    const updateQuality = () => {
      setQuality(getAdaptiveImageQuality());
    };

    updateQuality();

    // 监听网络状态变化
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateQuality);
      
      return () => {
        connection.removeEventListener('change', updateQuality);
      };
    }
  }, []);

  return quality;
}

// 响应式图片钩子
export function useResponsiveImage(
  src: string,
  options: {
    sizes?: { [breakpoint: string]: number };
    quality?: number;
  } = {}
) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const adaptiveQuality = useAdaptiveImageQuality();

  const updateImage = useCallback(() => {
    const currentDeviceType = getDeviceType();
    setDeviceType(currentDeviceType);

    const sizes = options.sizes || {
      mobile: 640,
      tablet: 1024,
      desktop: 1920,
    };

    const width = sizes[currentDeviceType] || sizes.desktop;
    const quality = options.quality || adaptiveQuality;

    const optimized = getOptimizedImageUrl(src, {
      width,
      quality,
      format: 'webp',
    });

    setOptimizedSrc(optimized);
  }, [src, options.sizes, options.quality, adaptiveQuality]);

  useEffect(() => {
    updateImage();

    const handleResize = () => {
      updateImage();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateImage]);

  return { optimizedSrc, deviceType };
}

// 懒加载钩子
export function useLazyLoading(threshold = 0.1, rootMargin = '50px') {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, threshold, rootMargin]);

  return { isIntersecting, setElement };
}

// 图片加载状态钩子
export function useImageLoadingState() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [errorStates, setErrorStates] = useState<{ [key: string]: boolean }>({});

  const setLoading = useCallback((id: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: loading }));
  }, []);

  const setError = useCallback((id: string, error: boolean) => {
    setErrorStates(prev => ({ ...prev, [id]: error }));
  }, []);

  const isLoading = useCallback((id: string) => loadingStates[id] || false, [loadingStates]);
  const hasError = useCallback((id: string) => errorStates[id] || false, [errorStates]);

  return { setLoading, setError, isLoading, hasError };
}

// 媒体查询钩子
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// 网络状态钩子
export function useNetworkStatus() {
  const [connectionQuality, setConnectionQuality] = useState<'slow' | 'fast' | 'unknown'>('unknown');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateConnectionQuality = () => {
      setConnectionQuality(getConnectionQuality());
    };

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateConnectionQuality();
    updateOnlineStatus();

    // 监听网络状态变化
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // 监听连接质量变化
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateConnectionQuality);
      
      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
        connection.removeEventListener('change', updateConnectionQuality);
      };
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return { connectionQuality, isOnline };
}

// 图片缓存钩子
export function useImageCache() {
  const [cache] = useState(new Map<string, string>());

  const getCachedImage = useCallback((key: string) => {
    return cache.get(key);
  }, [cache]);

  const setCachedImage = useCallback((key: string, value: string) => {
    cache.set(key, value);
  }, [cache]);

  const clearCache = useCallback(() => {
    cache.clear();
  }, [cache]);

  return { getCachedImage, setCachedImage, clearCache };
}