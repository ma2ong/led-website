import './globals.css';

export const metadata = {
  title: '深圳联锦光电有限公司 - 专业LED显示屏制造商',
  description: '深圳联锦光电有限公司是一家专业从事LED显示屏研发、生产和销售的高新技术企业，为全球客户提供高品质的LED显示解决方案。',
  keywords: 'LED显示屏,LED屏幕,户外LED,室内LED,LED租赁屏,LED创意屏,深圳LED',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}