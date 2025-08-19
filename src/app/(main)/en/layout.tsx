import type { Metadata } from 'next';
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
  }
}

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="ltr">
        {children}
    </div>
  );
}
