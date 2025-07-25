export const metadata = {
  title: '深圳联锦光电有限公司',
  description: '专业LED显示屏制造商',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}