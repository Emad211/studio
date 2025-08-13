import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data';
import { BlogForm } from '@/components/admin/blog-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ویرایش پست وبلاگ</CardTitle>
        <CardDescription>فرم زیر را برای ویرایش پست وبلاگ خود پر کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm post={post} />
      </CardContent>
    </Card>
  );
}
