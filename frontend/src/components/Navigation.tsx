'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { NavLanguageSwitcher } from '@/components/LanguageSwitcher';

// 导航项类型定义
interface NavItem {
  href: string;
  key: string;
  children?: NavItem[];
}

// 下拉菜单组件
interface DropdownMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  t: (key: string) => string;
}

// 移动端导航项组件
interface MobileNavItemProps {
  item: NavItem;
  pathname: string;
  t: (key: string) => string;
  onClose: () => void;
}

function MobileNavItem({ item, pathname, t, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const hasActiveChild = item.children?.some(child => isActive(child.href));

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href}
          onClick={item.children ? undefined : onClose}
          className={`flex-1 flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
            isActive(item.href) || hasActiveChild
              ? 'text-orange-400 bg-orange-500/10 border-l-4 border-orange-400'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>{t(item.key)}</span>
        </Link>
        
        {item.children && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {/* 子菜单 */}
      {item.children && (
        <div className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  isActive(child.href)
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                {t(child.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownMenu({ items, isOpen, onClose, pathname, t }: DropdownMenuProps) {
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50 py-2 z-50 animate-fade-in-down">
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className={`flex items-center px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-700/50 ${
            isActive(item.href)
              ? 'text-orange-400 bg-orange-500/10 border-r-2 border-orange-400'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <span>{t(item.key)}</span>
          {isActive(item.href) && (
            <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full"></div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 导航项配置（包含下拉菜单）
  const navItems: NavItem[] = [
    { href: '/', key: 'nav.home' },
    { href: '/about', key: 'nav.about' },
    { 
      href: '/products', 
      key: 'nav.products',
      children: [
        { href: '/products?category=fine-pitch', key: 'nav.products.finePitch' },
        { href: '/products?category=outdoor', key: 'nav.products.outdoor' },
        { href: '/products?category=rental', key: 'nav.products.rental' },
        { href: '/products?category=creative', key: 'nav.products.creative' },
        { href: '/products?category=all-in-one', key: 'nav.products.allInOne' },
        { href: '/products?category=poster', key: 'nav.products.poster' },
      ]
    },
    { 
      href: '/solutions', 
      key: 'nav.solutions',
      children: [
        { href: '/solutions/government', key: 'nav.solutions.government' },
        { href: '/solutions/sports', key: 'nav.solutions.sports' },
        { href: '/solutions/retail', key: 'nav.solutions.retail' },
        { href: '/solutions/conference', key: 'nav.solutions.conference' },
        { href: '/solutions/entertainment', key: 'nav.solutions.entertainment' },
      ]
    },
    { href: '/cases', key: 'nav.cases' },
    { href: '/news', key: 'nav.news' },
    { 
      href: '/support', 
      key: 'nav.support',
      children: [
        { href: '/support/technical', key: 'nav.support.technical' },
        { href: '/support/installation', key: 'nav.support.installation' },
        { href: '/support/maintenance', key: 'nav.support.maintenance' },
        { href: '/support/training', key: 'nav.support.training' },
        { href: '/support/downloads', key: 'nav.support.downloads' },
      ]
    },
    { href: '/contact', key: 'nav.contact' },
  ];

  // 处理下拉菜单显示
  const handleMouseEnter = (href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(href);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                RGBSHARE
              </span>
              <span className="text-sm text-orange-500 font-medium -mt-1">联锦光电</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.href)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    isActive(item.href)
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={(e) => {
                    if (item.children && activeDropdown !== item.href) {
                      e.preventDefault();
                      setActiveDropdown(item.href);
                    }
                  }}
                >
                  <span className="relative z-10">{t(item.key)}</span>
                  {item.children && (
                    <svg
                      className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.href ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-lg"></div>
                  )}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
                
                {/* 下拉菜单 */}
                {item.children && (
                  <div onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleMouseLeave}>
                    <DropdownMenu
                      items={item.children}
                      isOpen={activeDropdown === item.href}
                      onClose={() => setActiveDropdown(null)}
                      pathname={pathname}
                      t={t}
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button */}
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Language Switcher */}
            <NavLanguageSwitcher />

            {/* CTA Button */}
            <Link href="/contact" className="btn-led-primary text-sm px-6 py-2 hover-lift">
              {t('nav.consultation')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-6 space-y-1">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                pathname={pathname}
                t={t}
                onClose={() => setIsMenuOpen(false)}
              />
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-6 mt-6 border-t border-gray-700">
              {/* Search */}
              <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>搜索</span>
              </button>
              
              {/* Language Switcher */}
              <div className="flex items-center justify-between px-4 py-3 mt-2">
                <span className="text-gray-400 text-sm">
                  {language === 'zh' ? '语言选择' : 'Language'}
                </span>
                <NavLanguageSwitcher />
              </div>
              
              {/* CTA Button */}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block mx-4 mt-4 btn-led-primary text-center hover-lift"
              >
                {t('nav.consultation')}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}