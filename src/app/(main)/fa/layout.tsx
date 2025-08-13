import type { Metadata } from 'next';
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
  }
}

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
