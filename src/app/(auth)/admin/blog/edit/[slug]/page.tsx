import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/lib/actions';
import { BlogForm } from '@/components/admin/blog-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function EditBlogPostPage({ params }) {
  const posts = await getBlogPosts();
  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ویرایش پست وبلاگ</CardTitle>
        <CardDescription>فرم زیر را برای ویرایش پست «{post.title_fa}» پر کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm post={post} />
      </CardContent>
    </Card>
  );
}
