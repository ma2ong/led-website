import './globals.css';

export const metadata = {
  title: 'Lianjin LED - Professional LED Display Manufacturer | 联锦光电',
  description: 'Lianjin LED is a leading manufacturer of high-quality LED displays, offering innovative solutions for outdoor, indoor, rental, and creative LED screens worldwide.',
  keywords: 'LED display, LED screen, outdoor LED, indoor LED, rental LED, creative LED, LED manufacturer, Shenzhen LED',
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
    <html lang="en">
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