'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', key: 'nav.home' },
    { href: '/about', key: 'nav.about' },
    { href: '/products', key: 'nav.products' },
    { href: '/solutions', key: 'nav.solutions' },
    { href: '/cases', key: 'nav.cases' },
    { href: '/news', key: 'nav.news' },
    { href: '/support', key: 'nav.support' },
    { href: '/contact', key: 'nav.contact' },
  ];

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
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{t(item.key)}</span>
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-lg"></div>
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => setLanguage('zh')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  language === 'zh' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                中
              </button>
              <span className="text-gray-400">/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="btn-led-secondary text-sm px-6 py-2">
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
          <nav className="py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-orange-400 bg-orange-500/10 border-l-4 border-orange-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{t(item.key)}</span>
              </Link>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-4 mt-4 border-t border-gray-700">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-gray-400 text-sm">
                  {language === 'zh' ? '语言选择' : 'Language'}
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setLanguage('zh')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      language === 'zh' 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    中文
                  </button>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      language === 'en' 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-400'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block mx-4 mt-4 btn-led-primary text-center"
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