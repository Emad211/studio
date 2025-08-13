import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { HeroBackground } from '@/components/sections/hero-background';

export const metadata: Metadata = {
  title: 'CodeCanvas Portfolio',
  description: 'A modern portfolio for developers',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeroBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
