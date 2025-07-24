'use client'

import { useEffect } from 'react'
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals'
import { performanceConfig, checkCoreWebVitals } from '@/lib/performance-config'

interface WebVitalsData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

// Web Vitals监控组件
export function WebVitalsMonitor() {
  useEffect(() => {
    if (!performanceConfig.monitoring.webVitals) return

    // 收集的指标数据
    const vitalsData: Record<string, number> = {}

    // 发送指标数据到分析服务
    const sendToAnalytics = (metric: WebVitalsData) => {
      // 只在生产环境发送数据
      if (process.env.NODE_ENV !== 'production') {
        console.log('Web Vitals:', metric)
        return
      }

      // 采样率控制
      if (Math.random() > performanceConfig.monitoring.sampleRate) {
        return
      }

      // 存储指标数据
      vitalsData[metric.name] = metric.value

      // 发送到Google Analytics (如果配置了)
      if (typeof gtag !== 'undefined') {
        gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true
        })
      }

      // 发送到自定义分析端点
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          url: window.location.pathname,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      }).catch(error => {
        console.error('Failed to send web vitals:', error)
      })

      // 检查所有指标是否收集完成
      const expectedMetrics = ['CLS', 'FCP', 'FID', 'LCP', 'TTFB']
      const collectedMetrics = Object.keys(vitalsData)
      
      if (expectedMetrics.every(metric => collectedMetrics.includes(metric))) {
        const vitalsCheck = checkCoreWebVitals({
          lcp: vitalsData.LCP / 1000, // 转换为秒
          fid: vitalsData.FID,
          cls: vitalsData.CLS,
          fcp: vitalsData.FCP / 1000, // 转换为秒
          tti: vitalsData.TTFB / 1000 // 使用TTFB作为TTI的近似值
        })

        console.log('Core Web Vitals Check:', vitalsCheck)
      }
    }

    // 收集各项指标
    getCLS(sendToAnalytics)
    getFCP(sendToAnalytics)
    getFID(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)

  }, [])

  return null // 这是一个监控组件，不渲染任何内容
}

// 性能指标显示组件（开发环境使用）
export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Record<string, WebVitalsData>>({})

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const updateMetric = (metric: WebVitalsData) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name]: metric
      }))
    }

    getCLS(updateMetric)
    getFCP(updateMetric)
    getFID(updateMetric)
    getLCP(updateMetric)
    getTTFB(updateMetric)
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Web Vitals</div>
      {Object.entries(metrics).map(([name, metric]) => (
        <div key={name} className="flex justify-between gap-4">
          <span>{name}:</span>
          <span className={`font-bold ${
            metric.rating === 'good' ? 'text-green-400' :
            metric.rating === 'needs-improvement' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {name === 'CLS' ? metric.value.toFixed(3) : Math.round(metric.value)}
            {name !== 'CLS' && 'ms'}
          </span>
        </div>
      ))}
    </div>
  )
}

// 性能预算检查
export function checkPerformanceBudget() {
  const budget = {
    // 资源大小预算（KB）
    javascript: 500,
    css: 100,
    images: 2000,
    fonts: 200,
    total: 3000
  }

  if (typeof window === 'undefined') return null

  // 获取性能条目
  const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

  if (entries.length === 0) return null

  const navigationEntry = entries[0]
  
  // 计算各类资源大小
  const resourceSizes = {
    javascript: 0,
    css: 0,
    images: 0,
    fonts: 0,
    total: 0
  }

  resourceEntries.forEach(entry => {
    const size = entry.transferSize || 0
    resourceSizes.total += size

    if (entry.name.includes('.js')) {
      resourceSizes.javascript += size
    } else if (entry.name.includes('.css')) {
      resourceSizes.css += size
    } else if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
      resourceSizes.images += size
    } else if (entry.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
      resourceSizes.fonts += size
    }
  })

  // 转换为KB
  Object.keys(resourceSizes).forEach(key => {
    resourceSizes[key as keyof typeof resourceSizes] = Math.round(resourceSizes[key as keyof typeof resourceSizes] / 1024)
  })

  // 检查预算
  const budgetCheck = {
    javascript: resourceSizes.javascript <= budget.javascript,
    css: resourceSizes.css <= budget.css,
    images: resourceSizes.images <= budget.images,
    fonts: resourceSizes.fonts <= budget.fonts,
    total: resourceSizes.total <= budget.total
  }

  return {
    sizes: resourceSizes,
    budget,
    check: budgetCheck,
    passed: Object.values(budgetCheck).every(Boolean)
  }
}

// 导入React的useState
import { useState } from 'react'