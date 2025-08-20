import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/actions';
import { Fira_Code, Inter } from 'next/font/google'
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  // Default metadata for the root, can be overridden by nested layouts
  const title = settings.fa.siteName || 'پورتفولیو کدکانواس';
  const description = settings.fa.metaDescription || 'یک پورتفولیو مدرن برای توسعه‌دهندگان';

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    keywords: settings.seo.metaKeywords?.split(',').map(k => k.trim()),
    authors: [{ name: settings.fa.authorName, url: settings.socials.github }],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark" suppressHydrationWarning>
      <body className={cn(
          "font-body antialiased transition-colors duration-300 bg-background text-foreground",
          inter.variable,
          firaCode.variable
      )}>
        {children}
      </body>
    </html>
  );
}
