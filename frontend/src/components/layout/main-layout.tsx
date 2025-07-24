'use client'

import { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'
import { SEOHead } from './seo-head'

interface MainLayoutProps {
  children: ReactNode
  seo?: {
    title?: string
    description?: string
    keywords?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'product'
    author?: string
    publishedTime?: string
    modifiedTime?: string
    section?: string
    tags?: string[]
    noIndex?: boolean
    canonical?: string
  }
  className?: string
}

export function MainLayout({ children, seo, className = '' }: MainLayoutProps) {
  return (
    <>
      <SEOHead {...seo} />
      <div className={`min-h-screen flex flex-col ${className}`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}