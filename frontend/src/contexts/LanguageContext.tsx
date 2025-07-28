'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations = {
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.products': '产品中心',
    'nav.solutions': '解决方案',
    'nav.cases': '成功案例',
    'nav.news': '新闻资讯',
    'nav.support': '技术支持',
    'nav.contact': '联系我们',
    'nav.inquiry': '询盘',
    'nav.consultation': '免费咨询',
    
    // 首页
    'home.hero.title1': '引领创新科技',
    'home.hero.title2': '智慧绚丽显示',
    'home.hero.subtitle': '深圳联锦光电，您值得信赖的LED显示屏解决方案提供商',
    'home.hero.description': '17年专业制造经验 • 服务全球160+国家 • 50000㎡现代化生产基地',
    'home.hero.explore': '🚀 探索产品系列',
    'home.hero.consult': '💬 免费咨询',
    
    'home.products.title': '核心产品系列',
    'home.products.subtitle': '探索我们多样化的LED显示解决方案，从超高清小间距到创意异形屏，满足您的各种专业需求',
    'home.products.viewAll': '查看所有产品',
    
    'home.stats.title': '实力见证',
    'home.stats.subtitle': '数字背后的专业实力与全球信赖',
    'home.stats.experience': '年行业经验',
    'home.stats.countries': '服务国家',
    'home.stats.factory': '生产基地',
    'home.stats.support': '技术支持',
    
    // 产品
    'products.title': '产品中心',
    'products.subtitle': '探索深圳联锦光电(RGBSHARE联锦)全系列LED显示屏产品',
    'products.description': '包括小间距、租赁、户外、创意显示屏、会议一体机、广告机等专业解决方案',
    'products.getSpecs': '获取详细规格',
    'products.learnMore': '了解详情',
    
    'products.finePitch.title': '超高清小间距系列',
    'products.finePitch.description': '高清画质，无缝拼接，适用于控制室、会议室、展厅等高端应用场景。提供P0.9-P1.87多种像素间距选择。',
    'products.finePitch.feature1': '✓ 超高清显示',
    'products.finePitch.feature2': '✓ 无缝拼接',
    
    'products.rental.title': '专业租赁系列',
    'products.rental.description': '轻便易装，高刷新率，专为舞台活动、展览展示、演出租赁等应用设计。',
    'products.rental.feature1': '✓ 快速安装',
    'products.rental.feature2': '✓ 高刷新率',
    
    'products.outdoor.title': '高亮户外系列',
    'products.outdoor.description': '高亮防水，稳定耐用，适用于户外广告、体育场馆、交通显示等应用。',
    'products.outdoor.feature1': '✓ IP65防护',
    'products.outdoor.feature2': '✓ 节能技术',
    
    // 通用
    'common.backToTop': '返回顶部',
    'common.phone': '+86 755-8259-5016',
    'common.email': 'bruce@lianjinled.com',
    'common.address': '深圳市宝安区',
    'common.copyright': '© 2024 深圳联锦光电有限公司 版权所有',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.solutions': 'Solutions',
    'nav.cases': 'Cases',
    'nav.news': 'News',
    'nav.support': 'Support',
    'nav.contact': 'Contact',
    'nav.inquiry': 'Inquiry',
    'nav.consultation': 'Free Consultation',
    
    // Homepage
    'home.hero.title1': 'Leading & Innovative Technology',
    'home.hero.title2': 'Smart & Brilliant Display',
    'home.hero.subtitle': 'Shenzhen Lianjin Photoelectricity, Your Trusted LED Display Solution Provider',
    'home.hero.description': '17 Years Experience • Serving 160+ Countries • 50,000㎡ Modern Factory',
    'home.hero.explore': '🚀 Explore Products',
    'home.hero.consult': '💬 Free Consultation',
    
    'home.products.title': 'Core Product Series',
    'home.products.subtitle': 'Discover our diverse LED display solutions, from ultra-high definition fine pitch to creative shaped screens, meeting all your professional needs',
    'home.products.viewAll': 'View All Products',
    
    'home.stats.title': 'Strength Witness',
    'home.stats.subtitle': 'Professional strength and global trust behind the numbers',
    'home.stats.experience': 'Years Experience',
    'home.stats.countries': 'Countries Served',
    'home.stats.factory': 'Factory Area',
    'home.stats.support': 'Technical Support',
    
    // Products
    'products.title': 'Product Center',
    'products.subtitle': 'Explore the full range of LED display products from Shenzhen Lianjin Photoelectricity (RGBSHARE)',
    'products.description': 'Including fine pitch, rental, outdoor, creative displays, all-in-one conference units, and poster LEDs',
    'products.getSpecs': 'Get Detailed Specs',
    'products.learnMore': 'Learn More',
    
    'products.finePitch.title': 'Ultra-HD Fine Pitch Series',
    'products.finePitch.description': 'High definition, seamless splicing, suitable for control rooms, conference rooms, exhibition halls and other high-end applications. P0.9-P1.87 pixel pitch options available.',
    'products.finePitch.feature1': '✓ Ultra-HD Display',
    'products.finePitch.feature2': '✓ Seamless Splicing',
    
    'products.rental.title': 'Professional Rental Series',
    'products.rental.description': 'Lightweight and easy to install, high refresh rate, designed for stage events, exhibitions, and rental applications.',
    'products.rental.feature1': '✓ Quick Installation',
    'products.rental.feature2': '✓ High Refresh Rate',
    
    'products.outdoor.title': 'High-Brightness Outdoor Series',
    'products.outdoor.description': 'High brightness and waterproof, stable and durable, suitable for outdoor advertising, sports venues, traffic displays.',
    'products.outdoor.feature1': '✓ IP65 Protection',
    'products.outdoor.feature2': '✓ Energy-Saving Tech',
    
    // Common
    'common.backToTop': 'Back to Top',
    'common.phone': '+86 755-8259-5016',
    'common.email': 'bruce@lianjinled.com',
    'common.address': 'Shenzhen, Bao\'an District',
    'common.copyright': '© 2024 Shenzhen Lianjin Photoelectricity Co., Ltd. All rights reserved',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    // 从localStorage读取保存的语言设置
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}