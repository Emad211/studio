interface SeoPreviewProps {
  title: string;
  description: string;
  slug: string;
}

export function SeoPreview({ title, description, slug }: SeoPreviewProps) {
  const siteUrl = "https://your-site.com"; // This can be loaded from settings later

  return (
    <div className="p-4 border rounded-lg bg-card/50">
      <h4 className="text-sm font-semibold mb-2">پیش‌نمایش در نتایج گوگل</h4>
      <div className="space-y-1">
        <p className="text-blue-600 text-lg truncate">{title}</p>
        <p className="text-green-700 text-sm truncate">{`${siteUrl}/blog/${slug}`}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
