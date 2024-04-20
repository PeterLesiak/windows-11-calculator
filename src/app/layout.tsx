import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const windows11Font = localFont({ src: '../../public/fonts/SegoeUIVF.woff2', weight: '500' });

export const metadata: Metadata = {
  title: 'Windows 11 Calculator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={windows11Font.className}>{children}</body>
    </html>
  );
}
