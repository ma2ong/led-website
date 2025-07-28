import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '深圳联锦光电 - 专业LED显示屏制造商 | RGBSHARE',
  description: '深圳联锦光电有限公司是全球领先的LED显示屏产品和系统解决方案提供商，专注于LED小间距屏、租赁屏、广告屏、创意屏等。17年专业制造经验，服务全球160+国家。',
  keywords: 'LED显示屏, 深圳联锦光电, RGBSHARE, 小间距LED, LED租赁屏, 户外LED广告屏, 创意LED, 透明LED, LED解决方案',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}