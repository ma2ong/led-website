'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  name: string
  url: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
  separator?: React.ReactNode
}

export function Breadcrumb({ 
  items, 
  className,
  showHome = true,
  separator = <ChevronRightIcon className="h-4 w-4 text-gray-400" />
}: BreadcrumbProps) {
  const t = useTranslations('Common')
  
  // 添加首页链接
  const breadcrumbItems = showHome 
    ? [{ name: t('home'), url: '/', current: false }, ...items]
    : items

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 flex-shrink-0">
                {separator}
              </span>
            )}
            
            {item.current ? (
              <span 
                className="text-sm font-medium text-gray-900 dark:text-gray-100"
                aria-current="page"
              >
                {index === 0 && showHome ? (
                  <HomeIcon className="h-4 w-4" />
                ) : (
                  item.name
                )}
              </span>
            ) : (
              <Link
                href={item.url}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {index === 0 && showHome ? (
                  <HomeIcon className="h-4 w-4" />
                ) : (
                  item.name
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// 简化版面包屑组件
interface SimpleBreadcrumbProps {
  current: string
  parent?: { name: string; url: string }
  className?: string
}

export function SimpleBreadcrumb({ current, parent, className }: SimpleBreadcrumbProps) {
  const t = useTranslations('Common')
  
  const items: BreadcrumbItem[] = []
  
  if (parent) {
    items.push({ name: parent.name, url: parent.url })
  }
  
  items.push({ name: current, url: '#', current: true })
  
  return <Breadcrumb items={items} className={className} />
}

// 结构化数据面包屑组件
interface StructuredBreadcrumbProps extends BreadcrumbProps {
  generateStructuredData?: boolean
}

export function StructuredBreadcrumb({ 
  generateStructuredData = true,
  ...props 
}: StructuredBreadcrumbProps) {
  const structuredData = generateStructuredData ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.url}`
    }))
  } : null

  return (
    <>
      <Breadcrumb {...props} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  )
}