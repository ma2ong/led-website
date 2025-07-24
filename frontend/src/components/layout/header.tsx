'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline'
import LanguageSwitcher from './language-switcher'
import { OptimizedImage } from '../ui/optimized-image'
import { Locale } from '@/lib/i18n-config'
import { Dictionary } from '@/lib/dictionary'
import { cn } from '@/lib/utils'

const navigation = [
  { 
    name: 'home', 
    href: '/',
    children: []
  },
  { 
    name: 'products', 
    href: '/products',
    children: [
      { name: 'outdoor', href: '/products/category/outdoor' },
      { name: 'indoor', href: '/products/category/indoor' },
      { name: 'rental', href: '/products/category/rental' },
      { name: 'creative', href: '/products/category/creative' },
      { name: 'transparent', href: '/products/category/transparent' },
      { name: 'fine-pitch', href: '/products/category/fine-pitch' },
      { name: 'poster', href: '/products/category/poster' },
      { name: 'all-in-one', href: '/products/category/all-in-one' },
    ]
  },
  { 
    name: 'solutions', 
    href: '/solutions',
    children: []
  },
  { 
    name: 'cases', 
    href: '/case-studies',
    children: []
  },
  { 
    name: 'news', 
    href: '/news',
    children: []
  },
  { 
    name: 'about', 
    href: '/about',
    children: []
  },
  { 
    name: 'support', 
    href: '/support',
    children: []
  },
  { 
    name: 'contact', 
    href: '/contact',
    children: []
  },
]

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary;
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // 从字典中获取翻译
  const getTranslation = (key: string) => {
    try {
      const keys = key.split('.');
      let value: any = dictionary;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key; // 如果找不到键，返回原始键
        }
      }
      
      return typeof value === 'string' ? value : key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  // 翻译导航项
  const t = (key: string) => {
    return getTranslation(`common.navigation.${key}`);
  };

  // 翻译产品类别
  const tProduct = (key: string) => {
    return getTranslation(`products.categories.${key}`);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === `/${locale}` || pathname === '/'
    }
    return pathname.startsWith(`/${locale}${href}`)
  }

  // 为链接添加语言前缀
  const localizedHref = (href: string) => {
    return `/${locale}${href === '/' ? '' : href}`;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={localizedHref('/')} className="-m-1.5 p-1.5">
            <span className="sr-only">Lianjin LED</span>
            <div className="text-2xl font-bold text-primary-600">
              联锦光电
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.children.length > 0 ? (
                <div
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={`flex items-center gap-x-1 text-sm font-semibold leading-6 transition-colors ${
                      isActiveLink(item.href) 
                        ? 'text-primary-600' 
                        : 'text-gray-900 hover:text-primary-600'
                    }`}
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    {t(item.name)}
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {activeDropdown === item.name && (
                    <div className="absolute left-0 top-full mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={localizedHref(child.href)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {tProduct(child.name)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={localizedHref(item.href)}
                  className={`text-sm font-semibold leading-6 transition-colors ${
                    isActiveLink(item.href) 
                      ? 'text-primary-600' 
                      : 'text-gray-900 hover:text-primary-600'
                  }`}
                >
                  {t(item.name)}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <LanguageSwitcher variant="dropdown" showLabel={false} />
          
          <Link
            href={localizedHref('/contact')}
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
          >
            {t('contact')}
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href={localizedHref('/')} className="-m-1.5 p-1.5">
              <span className="sr-only">Lianjin LED</span>
              <div className="text-xl font-bold text-blue-600">
                联锦光电
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={localizedHref(item.href)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.name)}
                  </Link>
                ))}
              </div>
              
              <div className="py-6">
                <div className="mb-4">
                  <LanguageSwitcher variant="buttons" />
                </div>
                
                <Link
                  href={localizedHref('/contact')}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}