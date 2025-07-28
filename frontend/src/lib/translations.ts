// 完整的翻译系统
export type Language = 'zh' | 'en';

// 翻译键的类型定义
export interface TranslationKeys {
  // 导航相关
  'nav.home': string;
  'nav.about': string;
  'nav.products': string;
  'nav.solutions': string;
  'nav.cases': string;
  'nav.news': string;
  'nav.support': string;
  'nav.contact': string;
  
  // 产品相关
  'products.finePitch': string;
  'products.outdoor': string;
  'products.rental': string;
  'products.creative': string;
  'products.allInOne': string;
  'products.poster': string;
  
  // 解决方案相关
  'solutions.government': string;
  'solutions.sports': string;
  'solutions.retail': string;
  'solutions.conference': string;
  'solutions.entertainment': string;
  
  // 通用文本
  'common.learnMore': string;
  'common.getQuote': string;
  'common.contact': string;
  'common.phone': string;
  'common.email': string;
  'common.address': string;
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.submit': string;
  'common.cancel': string;
  'common.confirm': string;
  'common.search': string;
  'common.filter': string;
  'common.reset': string;
  'common.viewAll': string;
  'common.backToTop': string;
  'common.copyright': string;
  
  // 表单相关
  'form.name': string;
  'form.email': string;
  'form.phone': string;
  'form.company': string;
  'form.message': string;
  'form.required': string;
  'form.invalid': string;
  'form.sending': string;
  'form.sent': string;
  'form.error': string;
  
  // 页面标题和描述
  'page.home.title': string;
  'page.home.description': string;
  'page.about.title': string;
  'page.about.description': string;
  'page.products.title': string;
  'page.products.description': string;
  'page.cases.title': string;
  'page.cases.description': string;
  'page.news.title': string;
  'page.news.description': string;
  'page.contact.title': string;
  'page.contact.description': string;
}

// 完整的翻译数据
export const translations: Record<Language, TranslationKeys> = {
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
    
    // 产品
    'products.finePitch': '小间距显示屏',
    'products.outdoor': '户外显示屏',
    'products.rental': '租赁显示屏',
    'products.creative': '创意显示屏',
    'products.allInOne': '会议一体机',
    'products.poster': 'LED广告机',
    
    // 解决方案
    'solutions.government': '政府机构',
    'solutions.sports': '体育场馆',
    'solutions.retail': '商业零售',
    'solutions.conference': '会议展览',
    'solutions.entertainment': '文化娱乐',
    
    // 通用
    'common.learnMore': '了解更多',
    'common.getQuote': '获取报价',
    'common.contact': '联系我们',
    'common.phone': '+86 755-8259-5016',
    'common.email': 'bruce@lianjinled.com',
    'common.address': '深圳市宝安区石岩街道塘头第一工业区C栋',
    'common.loading': '加载中...',
    'common.error': '出错了',
    'common.success': '成功',
    'common.submit': '提交',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.reset': '重置',
    'common.viewAll': '查看全部',
    'common.backToTop': '返回顶部',
    'common.copyright': '© 2024 深圳联锦光电有限公司 版权所有',
    
    // 表单
    'form.name': '姓名',
    'form.email': '邮箱',
    'form.phone': '电话',
    'form.company': '公司',
    'form.message': '留言',
    'form.required': '此项为必填',
    'form.invalid': '格式不正确',
    'form.sending': '发送中...',
    'form.sent': '发送成功',
    'form.error': '发送失败',
    
    // 页面
    'page.home.title': '深圳联锦光电 - 专业LED显示屏制造商',
    'page.home.description': '深圳联锦光电有限公司是全球领先的LED显示屏产品和系统解决方案提供商，专注于LED小间距屏、租赁屏、广告屏、创意屏等。17年专业制造经验，服务全球160+国家。',
    'page.about.title': '关于我们 - 深圳联锦光电',
    'page.about.description': '了解深圳联锦光电的发展历程、企业文化、生产实力和技术创新。17年专业经验，50000㎡现代化工厂，服务全球160+国家。',
    'page.products.title': '产品中心 - LED显示屏产品',
    'page.products.description': '探索深圳联锦光电全系列LED显示屏产品，包括小间距、租赁、户外、创意显示屏、会议一体机、广告机等专业解决方案。',
    'page.cases.title': '成功案例 - LED显示屏项目',
    'page.cases.description': '查看深圳联锦光电在全球160+国家的成功LED显示屏项目案例，涵盖政府、体育、商业、会议、娱乐等多个行业。',
    'page.news.title': '新闻资讯 - 行业动态',
    'page.news.description': '获取LED显示屏行业最新资讯、技术动态、产品发布和公司新闻。',
    'page.contact.title': '联系我们 - 深圳联锦光电',
    'page.contact.description': '联系深圳联锦光电获取LED显示屏解决方案。电话：+86 755-8259-5016，邮箱：bruce@lianjinled.com',
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
    
    // Products
    'products.finePitch': 'Fine Pitch LED',
    'products.outdoor': 'Outdoor LED',
    'products.rental': 'Rental LED',
    'products.creative': 'Creative LED',
    'products.allInOne': 'All-in-One',
    'products.poster': 'Poster LED',
    
    // Solutions
    'solutions.government': 'Government',
    'solutions.sports': 'Sports Venues',
    'solutions.retail': 'Retail',
    'solutions.conference': 'Conference',
    'solutions.entertainment': 'Entertainment',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.getQuote': 'Get Quote',
    'common.contact': 'Contact Us',
    'common.phone': '+86 755-8259-5016',
    'common.email': 'bruce@lianjinled.com',
    'common.address': 'Building C, Tangtou First Industrial Zone, Shiyan Street, Bao\'an District, Shenzhen',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.reset': 'Reset',
    'common.viewAll': 'View All',
    'common.backToTop': 'Back to Top',
    'common.copyright': '© 2024 Shenzhen Lianjin Photoelectricity Co., Ltd. All rights reserved',
    
    // Form
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.company': 'Company',
    'form.message': 'Message',
    'form.required': 'This field is required',
    'form.invalid': 'Invalid format',
    'form.sending': 'Sending...',
    'form.sent': 'Sent successfully',
    'form.error': 'Failed to send',
    
    // Pages
    'page.home.title': 'Shenzhen Lianjin Photoelectricity - Professional LED Display Manufacturer',
    'page.home.description': 'Shenzhen Lianjin Photoelectricity Co., Ltd. is a leading global provider of LED display products and system solutions, specializing in fine pitch LED, rental LED, advertising LED, creative LED, etc. 17 years of professional manufacturing experience, serving 160+ countries worldwide.',
    'page.about.title': 'About Us - Shenzhen Lianjin Photoelectricity',
    'page.about.description': 'Learn about Shenzhen Lianjin Photoelectricity\'s development history, corporate culture, production strength and technological innovation. 17 years of professional experience, 50,000㎡ modern factory, serving 160+ countries worldwide.',
    'page.products.title': 'Product Center - LED Display Products',
    'page.products.description': 'Explore the full range of LED display products from Shenzhen Lianjin Photoelectricity, including fine pitch, rental, outdoor, creative displays, all-in-one conference units, and poster LEDs.',
    'page.cases.title': 'Success Cases - LED Display Projects',
    'page.cases.description': 'View successful LED display project cases from Shenzhen Lianjin Photoelectricity in 160+ countries worldwide, covering government, sports, commercial, conference, entertainment and other industries.',
    'page.news.title': 'News & Updates - Industry Dynamics',
    'page.news.description': 'Get the latest news about LED display industry, technical updates, product releases and company news.',
    'page.contact.title': 'Contact Us - Shenzhen Lianjin Photoelectricity',
    'page.contact.description': 'Contact Shenzhen Lianjin Photoelectricity for LED display solutions. Phone: +86 755-8259-5016, Email: bruce@lianjinled.com',
  }
};

// 翻译函数
export function t(key: keyof TranslationKeys, language: Language = 'zh'): string {
  return translations[language][key] || key;
}

// 带参数的翻译函数
export function tWithParams(
  key: keyof TranslationKeys, 
  params: Record<string, string | number>, 
  language: Language = 'zh'
): string {
  let text = translations[language][key] || key;
  
  Object.entries(params).forEach(([param, value]) => {
    text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
  });
  
  return text;
}

// 复数形式翻译
export function tPlural(
  key: keyof TranslationKeys,
  count: number,
  language: Language = 'zh'
): string {
  const text = translations[language][key] || key;
  
  // 中文不需要复数处理
  if (language === 'zh') {
    return text;
  }
  
  // 英文复数处理（简单实现）
  if (count === 1) {
    return text;
  } else {
    // 这里可以添加更复杂的复数规则
    return text + 's';
  }
}

// 日期格式化翻译
export function formatDate(date: Date, language: Language = 'zh'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  return date.toLocaleDateString(locale, options);
}

// 数字格式化翻译
export function formatNumber(number: number, language: Language = 'zh'): string {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  return number.toLocaleString(locale);
}

// 货币格式化翻译
export function formatCurrency(
  amount: number, 
  currency: string = 'CNY', 
  language: Language = 'zh'
): string {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// 相对时间格式化
export function formatRelativeTime(
  date: Date, 
  language: Language = 'zh'
): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    numeric: 'auto'
  });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

// 翻译缺失处理
export function handleMissingTranslation(key: string, language: Language): string {
  console.warn(`Missing translation for key: ${key} in language: ${language}`);
  
  // 开发环境显示缺失的键
  if (process.env.NODE_ENV === 'development') {
    return `[${language}:${key}]`;
  }
  
  // 生产环境返回键本身或默认语言的翻译
  if (language !== 'zh' && translations.zh[key as keyof TranslationKeys]) {
    return translations.zh[key as keyof TranslationKeys];
  }
  
  return key;
}

// 语言检测
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'zh';
  
  // 检查localStorage
  const saved = localStorage.getItem('language') as Language;
  if (saved && (saved === 'zh' || saved === 'en')) {
    return saved;
  }
  
  // 检查浏览器语言
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) {
    return 'en';
  }
  
  // 默认中文
  return 'zh';
}

// 语言切换工具
export function switchLanguage(newLanguage: Language): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('language', newLanguage);
  
  // 触发自定义事件通知语言变更
  window.dispatchEvent(new CustomEvent('languageChange', {
    detail: { language: newLanguage }
  }));
}

// 获取支持的语言列表
export function getSupportedLanguages(): Array<{ code: Language; name: string; nativeName: string }> {
  return [
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'en', name: 'English', nativeName: 'English' },
  ];
}

// 翻译验证工具（开发环境使用）
export function validateTranslations(): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  const languages = Object.keys(translations) as Language[];
  const allKeys = new Set<string>();
  
  // 收集所有键
  languages.forEach(lang => {
    Object.keys(translations[lang]).forEach(key => {
      allKeys.add(key);
    });
  });
  
  // 检查每种语言是否有所有键
  languages.forEach(lang => {
    const missingKeys: string[] = [];
    allKeys.forEach(key => {
      if (!translations[lang][key as keyof TranslationKeys]) {
        missingKeys.push(key);
      }
    });
    
    if (missingKeys.length > 0) {
      console.warn(`Missing translations in ${lang}:`, missingKeys);
    }
  });
}