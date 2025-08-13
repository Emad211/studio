"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveBlogPost } from "@/lib/actions";

const blogPostSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است."),
  slug: z.string().min(1, "اسلاگ الزامی است."),
  description: z.string().min(1, "توضیحات الزامی است."),
  date: z.string().min(1, "تاریخ الزامی است."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  content: z.string().min(10, "محتوا باید حداقل 10 کاراکتر باشد."),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

interface BlogFormProps {
  post?: BlogPost;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post
      ? { ...post, tags: post.tags.join(", ") }
      : {
          title: "",
          slug: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
          tags: "",
          content: "",
        },
  });

  const onSubmit = (data: BlogPostFormValues) => {
    startTransition(async () => {
      try {
        await saveBlogPost(data, post?.slug);
        toast({
          title: "موفقیت",
          description: `پست وبلاگ "${data.title}" با موفقیت ذخیره شد.`,
        });
        router.push("/admin/blog");
        router.refresh();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: `خطا در ذخیره پست وبلاگ. لطفا دوباره تلاش کنید.`,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" dir="rtl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان</FormLabel>
              <FormControl>
                <Input placeholder="عنوان پست..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسلاگ (Slug)</FormLabel>
              <FormControl>
                <Input placeholder="a-unique-slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات کوتاه</FormLabel>
              <FormControl>
                <Textarea placeholder="توضیحاتی برای نمایش در لیست پست‌ها..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>تاریخ انتشار</FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel>تگ‌ها (جدا شده با ویرگول)</FormLabel>
                <FormControl>
                    <Input placeholder="Next.js, AI, ..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>محتوای کامل پست (Markdown)</FormLabel>
              <FormControl>
                <Textarea placeholder="محتوای پست خود را اینجا بنویسید..." className="min-h-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره پست"}
        </Button>
      </form>
    </Form>
  );
}
