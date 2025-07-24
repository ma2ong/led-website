import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { i18n, Locale } from '@/lib/i18n-config';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getDictionary } from '@/lib/dictionary';
import SEOHead from '@/components/layout/seo-head';

const inter = Inter({ subsets: ['latin'] });

// 生成元数据
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  // 验证语言参数
  const locale = params.locale as Locale;
  
  // 获取字典数据用于元数据
  const dictionary = await getDictionary(locale);
  
  return {
    title: {
      default: '联锦光电 - 专业LED显示屏解决方案提供商',
      template: '%s | 联锦光电'
    },
    description: '联锦光电是一家专业的LED显示屏制造商，提供高品质的LED显示产品和解决方案',
    alternates: {
      canonical: '/',
      languages: {
        'zh-Hans': '/zh-Hans',
        'en': '/en',
      },
    },
  };
}

// 生成静态参数
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 验证语言参数
  const locale = params.locale as Locale;
  
  // 如果URL中的语言不受支持，返回404
  if (!i18n.locales.includes(locale)) {
    notFound();
  }
  
  // 获取字典数据
  const dictionary = await getDictionary(locale);
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SEOHead />
        <Header locale={locale} dictionary={dictionary} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}