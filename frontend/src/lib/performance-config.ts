// 性能优化配置
export const performanceConfig = {
  // 图片优化配置
  images: {
    // 支持的图片格式
    formats: ['webp', 'avif', 'jpeg', 'png'],
    // 图片质量设置
    quality: {
      default: 80,
      thumbnail: 60,
      hero: 90,
      gallery: 85
    },
    // 响应式图片尺寸
    sizes: {
      thumbnail: [150, 300],
      small: [300, 600],
      medium: [600, 1200],
      large: [1200, 2400],
      hero: [1920, 3840]
    },
    // 懒加载配置
    lazyLoading: {
      rootMargin: '50px',
      threshold: 0.1,
      fadeInDuration: 300
    }
  },
  
  // 字体优化配置
  fonts: {
    // 预加载字体
    preload: [
      '/fonts/inter-var.woff2',
      '/fonts/noto-sans-sc-var.woff2'
    ],
    // 字体显示策略
    display: 'swap',
    // 字体子集
    subsets: ['latin', 'chinese-simplified']
  },
  
  // 代码分割配置
  codeSplitting: {
    // 路由级别分割
    routeLevel: true,
    // 组件级别分割
    componentLevel: true,
    // 第三方库分割
    vendorSplit: true,
    // 分割阈值（KB）
    splitThreshold: 244
  },
  
  // 缓存策略配置
  caching: {
    // 静态资源缓存时间（秒）
    staticAssets: 31536000, // 1年
    // API响应缓存时间
    apiResponses: 3600, // 1小时
    // 页面缓存时间
    pages: 86400, // 1天
    // CDN缓存时间
    cdn: 2592000 // 30天
  },
  
  // Core Web Vitals目标
  coreWebVitals: {
    // Largest Contentful Paint (秒)
    lcp: 2.5,
    // First Input Delay (毫秒)
    fid: 100,
    // Cumulative Layout Shift
    cls: 0.1,
    // First Contentful Paint (秒)
    fcp: 1.8,
    // Time to Interactive (秒)
    tti: 3.8
  },
  
  // 预加载策略
  preloading: {
    // 关键资源预加载
    critical: [
      'fonts',
      'hero-images',
      'above-fold-css'
    ],
    // 预取策略
    prefetch: [
      'next-page-data',
      'common-images',
      'navigation-data'
    ],
    // 预连接域名
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://res.cloudinary.com'
    ]
  },
  
  // 压缩配置
  compression: {
    // Gzip压缩
    gzip: {
      enabled: true,
      level: 6,
      threshold: 1024
    },
    // Brotli压缩
    brotli: {
      enabled: true,
      quality: 4,
      threshold: 1024
    }
  },
  
  // 监控配置
  monitoring: {
    // Web Vitals监控
    webVitals: true,
    // 性能API监控
    performanceAPI: true,
    // 错误监控
    errorTracking: true,
    // 采样率
    sampleRate: 0.1
  }
}

// 获取图片优化参数
export function getImageOptimization(type: keyof typeof performanceConfig.images.sizes) {
  const config = performanceConfig.images
  return {
    quality: config.quality.default,
    sizes: config.sizes[type],
    formats: config.formats,
    lazyLoading: config.lazyLoading
  }
}

// 获取缓存头
export function getCacheHeaders(type: keyof typeof performanceConfig.caching) {
  const maxAge = performanceConfig.caching[type]
  return {
    'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
    'Expires': new Date(Date.now() + maxAge * 1000).toUTCString()
  }
}

// 检查Core Web Vitals
export function checkCoreWebVitals(metrics: {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  tti?: number
}) {
  const targets = performanceConfig.coreWebVitals
  const results = {
    lcp: metrics.lcp ? metrics.lcp <= targets.lcp : null,
    fid: metrics.fid ? metrics.fid <= targets.fid : null,
    cls: metrics.cls ? metrics.cls <= targets.cls : null,
    fcp: metrics.fcp ? metrics.fcp <= targets.fcp : null,
    tti: metrics.tti ? metrics.tti <= targets.tti : null
  }
  
  const passed = Object.values(results).filter(Boolean).length
  const total = Object.values(results).filter(r => r !== null).length
  const score = total > 0 ? (passed / total) * 100 : 0
  
  return {
    score: Math.round(score),
    results,
    passed,
    total
  }
}