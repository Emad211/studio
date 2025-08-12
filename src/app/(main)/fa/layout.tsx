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
