"use client";

import { useForm, useWatch } from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveBlogPost } from "@/lib/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SeoPreview } from "./seo-preview";

const blogPostSchema = z.object({
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  content_fa: z.string().min(10, "محتوای فارسی باید حداقل 10 کاراکتر باشد."),
  featured_image: z.string().url({ message: "لطفاً یک URL معتبر برای تصویر شاخص وارد کنید." }),

  title: z.string().optional(),
  content: z.string().optional(),
  
  slug: z.string().min(1, "اسلاگ الزامی است."),
  date: z.string().min(1, "تاریخ الزامی است."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  status: z.enum(['published', 'draft']),

  meta_title_fa: z.string().optional(),
  meta_description_fa: z.string().optional(),
  meta_title_en: z.string().optional(),
  meta_description_en: z.string().optional(),
  og_image: z.string().url({ message: "لطفاً یک URL معتبر برای تصویر OG وارد کنید." }).optional().or(z.literal('')),
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
          title_fa: "",
          content_fa: "",
          featured_image: "https://placehold.co/1200x630.png",
          title: "",
          content: "",
          slug: "",
          date: new Date().toISOString().split("T")[0],
          tags: "",
          status: "draft",
          meta_title_fa: "",
          meta_description_fa: "",
          meta_title_en: "",
          meta_description_en: "",
          og_image: "",
        },
  });

  const watchedValues = useWatch({ control: form.control });

  const onSubmit = (data: BlogPostFormValues) => {
    startTransition(async () => {
      try {
        await saveBlogPost(data, post?.slug);
        toast({
          title: "موفقیت",
          description: `پست وبلاگ "${data.title_fa}" با موفقیت ذخیره شد.`,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="fa-content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fa-content">محتوای فارسی</TabsTrigger>
                <TabsTrigger value="en-content">محتوای انگلیسی</TabsTrigger>
                <TabsTrigger value="settings">تنظیمات و سئو</TabsTrigger>
            </TabsList>
            <TabsContent value="fa-content" className="space-y-6 pt-6" dir="rtl">
                 <FormField
                    control={form.control}
                    name="title_fa"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>عنوان فارسی</FormLabel>
                        <FormControl>
                            <Input placeholder="عنوان اصلی پست به فارسی..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="featured_image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL تصویر شاخص</FormLabel>
                        <FormControl>
                            <Input dir="ltr" placeholder="https://example.com/image.png" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="content_fa"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>محتوای کامل پست (فارسی - Markdown)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="محتوای پست خود را اینجا بنویسید..." className="min-h-[400px]" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </TabsContent>
            <TabsContent value="en-content" className="space-y-6 pt-6" dir="ltr">
                 <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title (English)</FormLabel>
                        <FormControl>
                            <Input placeholder="English post title..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Content (English - Markdown)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Write your post content here..." className="min-h-[400px]" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </TabsContent>
             <TabsContent value="settings" className="space-y-8 pt-6" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>اسلاگ (Slug)</FormLabel>
                        <FormControl>
                            <Input dir="ltr" placeholder="a-unique-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
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
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>وضعیت انتشار</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="یک وضعیت را انتخاب کنید" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="published">منتشر شده</SelectItem>
                                        <SelectItem value="draft">پیش‌نویس</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>تگ‌ها (جدا شده با ویرگول)</FormLabel>
                        <FormControl>
                            <Input dir="ltr" placeholder="Next.js, AI, ..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                
                <h3 className="text-lg font-semibold border-t pt-6">تنظیمات سئو</h3>
                <Tabs defaultValue="seo-fa" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="seo-fa">سئوی فارسی</TabsTrigger>
                        <TabsTrigger value="seo-en">SEO (English)</TabsTrigger>
                    </TabsList>
                    <TabsContent value="seo-fa" className="pt-4 space-y-6">
                        <FormField
                            control={form.control}
                            name="meta_title_fa"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>عنوان متا (فارسی)</FormLabel>
                                 <FormDescription>اگر خالی باشد، از عنوان اصلی پست استفاده می‌شود.</FormDescription>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="meta_description_fa"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>توضیحات متا (فارسی)</FormLabel>
                                <FormControl><Textarea {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SeoPreview
                            title={watchedValues.meta_title_fa || watchedValues.title_fa || "عنوان پست شما"}
                            description={watchedValues.meta_description_fa || "توضیحات پست شما در اینجا نمایش داده می‌شود..."}
                            slug={watchedValues.slug || "your-post-slug"}
                        />
                    </TabsContent>
                    <TabsContent value="seo-en" className="pt-4 space-y-6" dir="ltr">
                        <FormField
                            control={form.control}
                            name="meta_title_en"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Title (English)</FormLabel>
                                 <FormDescription>If empty, the main post title will be used.</FormDescription>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="meta_description_en"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Description (English)</FormLabel>
                                <FormControl><Textarea {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SeoPreview
                            title={watchedValues.meta_title_en || watchedValues.title || "Your Post Title"}
                            description={watchedValues.meta_description_en || "Your post description will be shown here..."}
                            slug={`en/blog/${watchedValues.slug || "your-post-slug"}`}
                        />
                    </TabsContent>
                </Tabs>
                <FormField
                    control={form.control}
                    name="og_image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL تصویر Open Graph</FormLabel>
                        <FormDescription>
                            تصویری که هنگام اشتراک‌گذاری پست در شبکه‌های اجتماعی نمایش داده می‌شود (1200x630 پیکسل). اگر خالی باشد از تصویر پیش‌فرض سایت استفاده می‌شود.
                        </FormDescription>
                        <FormControl>
                            <Input dir="ltr" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </TabsContent>
        </Tabs>
        <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto">
          {isPending ? "در حال ذخیره..." : "ذخیره پست"}
        </Button>
      </form>
    </Form>
  );
}
