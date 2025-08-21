
"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generateBlogPost, BlogPostGeneratorInput } from "@/ai/flows/blog-post-generator-flow";
import { Label } from "@/components/ui/label";
import { MarkdownGuide } from "./markdown-guide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const blogPostSchema = z.object({
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  content_fa: z.string().min(10, "محتوای فارسی باید حداقل 10 کاراکتر باشد."),
  featured_image: z.string().url({ message: "لطفاً یک URL معتبر برای تصویر شاخص وارد کنید." }).optional().or(z.literal('')),

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

function AiGeneratorDialog({ setFormValues }: { setFormValues: (data: any) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [context, setContext] = useState("");
    const [title, setTitle] = useState("");
    const { toast } = useToast();

    const handleGenerate = async () => {
        if (!context.trim() || !title.trim()) {
            toast({
                variant: "destructive",
                title: "ورودی ناقص",
                description: "لطفاً هم متن کامل منبع و هم عنوان را برای تولید محتوا وارد کنید.",
            });
            return;
        }

        setIsGenerating(true);
        try {
            const input: BlogPostGeneratorInput = { context, title };
            const result = await generateBlogPost(input);
            setFormValues({
                ...result,
                tags: result.tags.join(", "),
            });
            toast({
                title: "محتوا تولید شد",
                description: "فیلدهای فرم با محتوای تولید شده توسط هوش مصنوعی به‌روز شد.",
            });
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to generate blog post:", error);
            toast({
                variant: "destructive",
                title: "خطا در تولید محتوا",
                description: "مشکلی در ارتباط با سرویس هوش مصنوعی پیش آمد. لطفاً دوباره تلاش کنید.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Sparkles className="ml-2 h-4 w-4" />
                    تولید محتوا با AI
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                    <DialogTitle>تولید پست وبلاگ با هوش مصنوعی</DialogTitle>
                    <DialogDescription>
                        یک متن کامل (مقاله، داکیومنت و ...) به عنوان منبع وارد کنید تا ما آن را به یک پست وبلاگ تبدیل کنیم.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            عنوان پست
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                            placeholder="مثال: تسلط بر یادگیری عمیق"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="context" className="text-right pt-2">
                            متن منبع
                        </Label>
                        <Textarea
                            id="context"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            className="col-span-3 min-h-[200px]"
                            placeholder="متن کامل مقاله یا داکیومنتی که می‌خواهید به پست وبلاگ تبدیل شود را اینجا جای‌گذاری کنید..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                        {isGenerating ? "در حال تولید..." : "تولید کن"}
                    </Button>
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>انصراف</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
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
          featured_image: "https://placehold.co/1280x720.png",
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
  const watchedTitleFa = useWatch({ control: form.control, name: 'title_fa' });

  useEffect(() => {
    if (watchedTitleFa && !post) { // Only auto-generate for new posts
      const slug = watchedTitleFa
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '') // Remove non-alphanumeric, non-Persian characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+/g, '-'); // Replace multiple - with single -
      form.setValue("slug", slug, { shouldValidate: true });
    }
  }, [watchedTitleFa, form, post]);

  const setAiGeneratedValues = (data: any) => {
    form.setValue("content_fa", data.content_fa, { shouldValidate: true, shouldDirty: true });
    form.setValue("content", data.content, { shouldValidate: true, shouldDirty: true });
    form.setValue("tags", data.tags, { shouldValidate: true, shouldDirty: true });
    form.setValue("meta_description_fa", data.meta_description_fa, { shouldValidate: true, shouldDirty: true });
    form.setValue("meta_description_en", data.meta_description_en, { shouldValidate: true, shouldDirty: true });
  }

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" dir="rtl">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                 <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>محتوای پست</CardTitle>
                            <CardDescription>محتوای اصلی پست خود را در اینجا به دو زبان وارد کنید.</CardDescription>
                        </div>
                         <AiGeneratorDialog setFormValues={setAiGeneratedValues} />
                    </div>
                </CardHeader>
                <CardContent>
                     <Tabs defaultValue="fa-content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="fa-content">فارسی</TabsTrigger>
                            <TabsTrigger value="en-content">انگلیسی</TabsTrigger>
                        </TabsList>
                        <TabsContent value="fa-content" className="space-y-6 pt-6">
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
                                name="content_fa"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>محتوای کامل (پشتیبانی از Markdown)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="محتوای پست خود را اینجا بنویسید..." className="min-h-[400px] font-code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <div className="pt-2">
                                <MarkdownGuide />
                             </div>
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
                                    <FormLabel>Full Content (Markdown Supported)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your post content here..." className="min-h-[400px] font-code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <div className="pt-2">
                                <MarkdownGuide />
                             </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>بهینه‌سازی برای موتورهای جستجو (SEO)</CardTitle>
                    <CardDescription>این اطلاعات به بهبود رتبه پست شما در گوگل کمک می‌کند.</CardDescription>
                </CardHeader>
                <CardContent>
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
                                    <FormLabel>عنوان متا</FormLabel>
                                    <FormControl><Input {...field} placeholder="یک عنوان جذاب برای گوگل بنویسید" /></FormControl>
                                    <FormDescription>اگر خالی باشد، از عنوان اصلی پست استفاده می‌شود. (بهینه: ۶۰ کاراکتر)</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="meta_description_fa"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>توضیحات متا</FormLabel>
                                    <FormControl><Textarea {...field} placeholder="توضیحی کوتاه و جذاب که کاربر را به کلیک ترغیب کند." /></FormControl>
                                    <FormDescription>توضیحاتی که در نتایج گوگل نمایش داده می‌شود. (بهینه: ۱۵۵-۱۶۰ کاراکتر)</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h4 className="font-semibold text-sm">پیش‌نمایش در گوگل</h4>
                            <SeoPreview
                                title={watchedValues.meta_title_fa || watchedValues.title_fa || "عنوان پست شما"}
                                description={watchedValues.meta_description_fa || "توضیحات پست شما در اینجا برای پیش‌نمایش نمایش داده می‌شود..."}
                                slug={`blog/${watchedValues.slug || "your-post-slug"}`}
                            />
                        </TabsContent>
                        <TabsContent value="seo-en" className="pt-4 space-y-6" dir="ltr">
                            <FormField
                                control={form.control}
                                name="meta_title_en"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Meta Title</FormLabel>
                                    <FormControl><Input {...field} placeholder="Write a catchy title for Google" /></FormControl>
                                     <FormDescription>If empty, the main post title will be used. (Optimal: 60 characters)</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="meta_description_en"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Meta Description</FormLabel>
                                    <FormControl><Textarea {...field} placeholder="A short, compelling description to encourage clicks." /></FormControl>
                                     <FormDescription>The description shown in Google search results. (Optimal: 155-160 characters)</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <h4 className="font-semibold text-sm">Google Preview</h4>
                            <SeoPreview
                                title={watchedValues.meta_title_en || watchedValues.title || "Your Post Title"}
                                description={watchedValues.meta_description_en || "Your post description will be shown here for the preview..."}
                                slug={`en/blog/${watchedValues.slug || "your-post-slug"}`}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

        </div>
        
        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>انتشار</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>وضعیت</FormLabel>
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
                </CardContent>
                 <div className="p-6 pt-0">
                    <Button type="submit" disabled={isPending} size="lg" className="w-full">
                        {isPending ? "در حال ذخیره..." : (post ? "به‌روزرسانی پست" : "ایجاد پست")}
                    </Button>
                 </div>
            </Card>
            
             <Card>
                 <CardHeader>
                    <CardTitle>تنظیمات پست</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                     <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>اسلاگ (Slug)</FormLabel>
                             <FormControl>
                                <Input dir="ltr" placeholder="a-unique-slug" {...field} />
                                </FormControl>
                             <FormDescription>شناسه منحصر به فرد پست در URL.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>تگ‌ها</FormLabel>
                            <FormControl>
                                <Input dir="ltr" placeholder="Next.js, AI, ..." {...field} />
                            </FormControl>
                            <FormDescription>تگ‌ها را با ویرگول (,) جدا کنید.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                     />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>تصاویر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                     <FormField
                        control={form.control}
                        name="featured_image"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>تصویر شاخص</FormLabel>
                            <FormControl>
                                <Input dir="ltr" placeholder="https://example.com/image.png" {...field} />
                            </FormControl>
                            <FormDescription>این تصویر در بالای پست و در لیست وبلاگ نمایش داده می‌شود.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="og_image"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>تصویر Open Graph</FormLabel>
                            <FormControl>
                                <Input dir="ltr" placeholder="https://example.com/social-image.png" {...field} />
                            </FormControl>
                            <FormDescription>
                                تصویر برای اشتراک‌گذاری در شبکه‌های اجتماعی (1200x630). اگر خالی باشد از تصویر شاخص استفاده می‌شود.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
        </div>

      </form>
    </Form>
  );
}
