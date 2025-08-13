import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { HeroBackground } from '@/components/sections/hero-background';
import { getSiteSettings } from '@/lib/actions';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  const title = settings.fa.siteName || 'پورتفولیو کدکانواس';
  const description = settings.fa.metaDescription || 'یک پورتفولیو مدرن برای توسعه‌دهندگان';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    keywords: settings.seo.metaKeywords?.split(',').map(k => k.trim()),
    authors: [{ name: settings.en.authorName, url: settings.socials.github }],
    openGraph: {
      title: title,
      description: description,
      url: settings.seo.siteURL,
      siteName: title,
      images: [
        {
          url: settings.seo.ogImage || 'https://placehold.co/1200x630.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'fa_IR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      creator: settings.seo.twitterUsername ? `@${settings.seo.twitterUsername}` : undefined,
      images: [settings.seo.ogImage || 'https://placehold.co/1200x630.png'],
    },
    manifest: `${settings.seo.siteURL}/site.webmanifest`,
  }
}


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
