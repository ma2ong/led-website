// 字体优化配置和工具
import { performanceConfig } from './performance-config'

// 字体配置接口
export interface FontConfig {
  family: string
  src: string[]
  weight?: string | number
  style?: 'normal' | 'italic'
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  preload?: boolean
  subset?: string[]
}

// 预定义字体配置
export const fontConfigs: Record<string, FontConfig> = {
  // 英文字体
  inter: {
    family: 'Inter',
    src: [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var.woff'
    ],
    weight: '100 900',
    style: 'normal',
    display: 'swap',
    preload: true,
    subset: ['latin', 'latin-ext']
  },
  
  // 中文字体
  notoSansSC: {
    family: 'Noto Sans SC',
    src: [
      '/fonts/noto-sans-sc-var.woff2',
      '/fonts/noto-sans-sc-var.woff'
    ],
    weight: '100 900',
    style: 'normal',
    display: 'swap',
    preload: true,
    subset: ['chinese-simplified']
  },
  
  // 等宽字体
  jetBrainsMono: {
    family: 'JetBrains Mono',
    src: [
      '/fonts/jetbrains-mono-var.woff2',
      '/fonts/jetbrains-mono-var.woff'
    ],
    weight: '100 800',
    style: 'normal',
    display: 'swap',
    preload: false,
    subset: ['latin']
  }
}

// 生成字体CSS
export function generateFontCSS(config: FontConfig): string {
  const srcList = config.src.map(src => {
    const format = src.endsWith('.woff2') ? 'woff2' : 
                   src.endsWith('.woff') ? 'woff' : 
                   src.endsWith('.ttf') ? 'truetype' : 'opentype'
    return `url('${src}') format('${format}')`
  }).join(', ')

  return `
    @font-face {
      font-family: '${config.family}';
      src: ${srcList};
      font-weight: ${config.weight || 'normal'};
      font-style: ${config.style || 'normal'};
      font-display: ${config.display || 'swap'};
      unicode-range: ${getUnicodeRange(config.subset)};
    }
  `.trim()
}

// 获取Unicode范围
function getUnicodeRange(subsets?: string[]): string {
  if (!subsets || subsets.length === 0) return 'U+0000-10FFFF'
  
  const ranges: Record<string, string> = {
    'latin': 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    'latin-ext': 'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF',
    'chinese-simplified': 'U+4E00-9FFF, U+3400-4DBF, U+20000-2A6DF, U+2A700-2B73F, U+2B740-2B81F, U+2B820-2CEAF, U+F900-FAFF, U+2F800-2FA1F',
    'chinese-traditional': 'U+4E00-9FFF, U+3400-4DBF, U+20000-2A6DF, U+2A700-2B73F, U+2B740-2B81F, U+2B820-2CEAF, U+F900-FAFF, U+2F800-2FA1F',
    'cyrillic': 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116',
    'greek': 'U+0370-03FF',
    'vietnamese': 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB'
  }
  
  return subsets.map(subset => ranges[subset] || '').filter(Boolean).join(', ')
}

// 生成所有字体的CSS
export function generateAllFontsCSS(): string {
  return Object.values(fontConfigs)
    .map(config => generateFontCSS(config))
    .join('\n\n')
}

// 生成字体预加载链接
export function generateFontPreloadLinks(): Array<{
  href: string
  as: 'font'
  type: string
  crossOrigin: 'anonymous'
}> {
  const preloadLinks: Array<{
    href: string
    as: 'font'
    type: string
    crossOrigin: 'anonymous'
  }> = []

  Object.values(fontConfigs).forEach(config => {
    if (config.preload) {
      config.src.forEach(src => {
        if (src.endsWith('.woff2')) {
          preloadLinks.push({
            href: src,
            as: 'font',
            type: 'font/woff2',
            crossOrigin: 'anonymous'
          })
        }
      })
    }
  })

  return preloadLinks
}

// 字体加载状态检测
export class FontLoadingDetector {
  private loadedFonts = new Set<string>()
  private callbacks = new Map<string, Array<() => void>>()

  constructor() {
    if (typeof window !== 'undefined' && 'fonts' in document) {
      this.initFontLoadingDetection()
    }
  }

  private initFontLoadingDetection() {
    // 监听字体加载事件
    document.fonts.addEventListener('loadingdone', (event) => {
      event.fontfaces.forEach((fontFace) => {
        const fontKey = `${fontFace.family}-${fontFace.weight}-${fontFace.style}`
        this.loadedFonts.add(fontKey)
        
        // 执行回调
        const callbacks = this.callbacks.get(fontKey) || []
        callbacks.forEach(callback => callback())
        this.callbacks.delete(fontKey)
      })
    })

    // 检查已加载的字体
    document.fonts.forEach((fontFace) => {
      if (fontFace.status === 'loaded') {
        const fontKey = `${fontFace.family}-${fontFace.weight}-${fontFace.style}`
        this.loadedFonts.add(fontKey)
      }
    })
  }

  // 检查字体是否已加载
  isFontLoaded(family: string, weight: string = 'normal', style: string = 'normal'): boolean {
    const fontKey = `${family}-${weight}-${style}`
    return this.loadedFonts.has(fontKey)
  }

  // 等待字体加载
  async waitForFont(family: string, weight: string = 'normal', style: string = 'normal'): Promise<void> {
    const fontKey = `${family}-${weight}-${style}`
    
    if (this.loadedFonts.has(fontKey)) {
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      if (!this.callbacks.has(fontKey)) {
        this.callbacks.set(fontKey, [])
      }
      this.callbacks.get(fontKey)!.push(resolve)

      // 设置超时
      setTimeout(() => {
        const callbacks = this.callbacks.get(fontKey) || []
        const index = callbacks.indexOf(resolve)
        if (index > -1) {
          callbacks.splice(index, 1)
          resolve() // 超时后也resolve，避免无限等待
        }
      }, 3000) // 3秒超时
    })
  }

  // 预加载字体
  async preloadFont(family: string, weight: string = 'normal', style: string = 'normal'): Promise<void> {
    if (typeof window === 'undefined' || !('fonts' in document)) {
      return
    }

    try {
      const fontFace = new FontFace(family, `url(/fonts/${family.toLowerCase().replace(/\s+/g, '-')}-${weight}.woff2)`, {
        weight,
        style
      })

      await fontFace.load()
      document.fonts.add(fontFace)
      
      const fontKey = `${family}-${weight}-${style}`
      this.loadedFonts.add(fontKey)
    } catch (error) {
      console.warn(`Failed to preload font: ${family}`, error)
    }
  }
}

// 全局字体加载检测器实例
export const fontLoadingDetector = new FontLoadingDetector()

// 字体回退策略
export const fontFallbacks = {
  sans: [
    'Inter',
    'Noto Sans SC',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol'
  ],
  serif: [
    'Georgia',
    'Times New Roman',
    'serif'
  ],
  mono: [
    'JetBrains Mono',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace'
  ]
}

// 生成字体堆栈CSS变量
export function generateFontStackCSS(): string {
  return `
    :root {
      --font-sans: ${fontFallbacks.sans.join(', ')};
      --font-serif: ${fontFallbacks.serif.join(', ')};
      --font-mono: ${fontFallbacks.mono.join(', ')};
    }
  `
}

// 字体性能优化建议
export function getFontOptimizationTips(): string[] {
  return [
    '使用 font-display: swap 避免不可见文本闪烁',
    '预加载关键字体文件以减少加载时间',
    '使用字体子集减少文件大小',
    '优先使用 WOFF2 格式，提供 WOFF 作为回退',
    '避免加载过多字体变体',
    '使用系统字体作为回退以提高性能',
    '考虑使用可变字体减少HTTP请求',
    '在CSS中定义字体回退堆栈'
  ]
}

// 检查字体性能
export function checkFontPerformance(): {
  score: number
  issues: string[]
  recommendations: string[]
} {
  const issues: string[] = []
  const recommendations: string[] = []

  if (typeof window === 'undefined') {
    return { score: 100, issues, recommendations }
  }

  // 检查字体数量
  const fontCount = document.fonts.size
  if (fontCount > 6) {
    issues.push(`加载了过多字体 (${fontCount}个)，建议减少到6个以下`)
    recommendations.push('减少不必要的字体变体')
  }

  // 检查字体加载状态
  let loadedCount = 0
  document.fonts.forEach(font => {
    if (font.status === 'loaded') loadedCount++
  })

  const loadingRatio = fontCount > 0 ? loadedCount / fontCount : 1
  if (loadingRatio < 0.8) {
    issues.push('部分字体加载失败或缓慢')
    recommendations.push('检查字体文件路径和网络连接')
  }

  // 计算分数
  let score = 100
  if (fontCount > 6) score -= 20
  if (loadingRatio < 0.8) score -= 30

  return {
    score: Math.max(0, score),
    issues,
    recommendations: recommendations.length > 0 ? recommendations : getFontOptimizationTips().slice(0, 3)
  }
}