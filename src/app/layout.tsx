import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/actions';


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  const title = settings.en.siteName || 'CodeCanvas Portfolio';
  const description = settings.en.metaDescription || 'A modern portfolio for developers';

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
      locale: 'en_US',
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
  // Determine language and direction from the route if needed, or set a default
  const lang = 'en'; // Default language
  const dir = 'ltr';   // Default direction

  return (
    <html lang={lang} dir={dir} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased transition-colors duration-300 bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
