'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle' | 'buttons';
  showLabels?: boolean;
}

export default function LanguageSwitcher({ 
  className = '', 
  variant = 'dropdown',
  showLabels = true 
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'toggle') {
    return (
      <button
        onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
        title={language === 'zh' ? 'Switch to English' : '切换到中文'}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        {showLabels && (
          <span className="text-sm font-medium">
            {language === 'zh' ? 'EN' : '中'}
          </span>
        )}
      </button>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              language === lang.code
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {showLabels && lang.name}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        {showLabels && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentLanguage.name}
          </span>
        )}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-3 ${
                  language === lang.code
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-orange-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 简化的语言切换按钮
export function LanguageToggle({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher 
      variant="toggle" 
      showLabels={false} 
      className={className}
    />
  );
}

// 导航栏用的语言切换器
export function NavLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher 
      variant="dropdown" 
      showLabels={true} 
      className={className}
    />
  );
}

// 页脚用的语言按钮组
export function FooterLanguageSwitcher({ className = '' }: { className?: string }) {
  return (
    <LanguageSwitcher 
      variant="buttons" 
      showLabels={true} 
      className={className}
    />
  );
}