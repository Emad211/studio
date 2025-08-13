import { BlogForm } from "@/components/admin/blog-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NewBlogPostPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد پست وبلاگ جدید</CardTitle>
        <CardDescription>فرم زیر را برای ایجاد یک پست وبلاگ جدید پر کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm />
      </CardContent>
    </Card>
  );
}
