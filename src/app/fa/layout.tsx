import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { HeroBackground } from '@/components/sections/hero-background';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پورتفولیو کدکانواس',
  description: 'یک پورتفولیو مدرن برای توسعه‌دهندگان',
};

export default function FaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="rtl">
        {children}
    </div>
  );
}
