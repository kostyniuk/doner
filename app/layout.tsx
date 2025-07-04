import type { Metadata } from 'next';
import '@/app/globals.css';
import { roboto_mono } from '@/app/ui/fonts';
import Sidebar from './ui/sidebar';
import Head from 'next/head';
import Logo from '@/app/logo';

export const metadata: Metadata = {
  title: 'Doner',
  description: 'Generated by create next app',
};

// SVG data URL for favicon
const faviconDataUrl =
  'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="%23fff" stroke-width="6"%3E%3Cpath d="M25 50 l15 15 l35 -35" /%3E%3Cpath d="M15 75 l70 0" /%3E%3C/g%3E%3C/svg%3E';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href={faviconDataUrl} type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
      </Head>
      <body className={`${roboto_mono.className} antialiased bg-custom-dark`}>
        <div className="flex flex-row">
          <Sidebar logo={<Logo className="w-10 h-10 mb-2" />} />
          {children}
        </div>
      </body>
    </html>
  );
}
