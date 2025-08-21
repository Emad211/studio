
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { SiteSettings } from "@/lib/data";
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
import { saveSiteSettings } from "@/lib/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Search, Share2, Shield, Plug } from "lucide-react";
import { Separator } from "../ui/separator";

const settingsSchema = z.object({
  en: z.object({
    siteName: z.string().min(1, "Site name is required."),
    authorName: z.string().min(1, "Author name is required."),
    metaTitle: z.string().min(1, "Default Meta Title is required."),
    metaDescription: z.string().min(1, "Default Meta Description is required."),
  }),
  fa: z.object({
    siteName: z.string().min(1, "نام سایت الزامی است."),
    authorName: z.string().min(1, "نام نویسنده الزامی است."),
    metaTitle: z.string().min(1, "عنوان متا پیش‌فرض الزامی است."),
    metaDescription: z.string().min(1, "توضیحات متا پیش‌فرض الزامی است."),
  }),
  seo: z.object({
    siteURL: z.string().url("Please enter a valid URL."),
    metaKeywords: z.string().optional(),
    twitterUsername: z.string().optional(),
    ogImage: z.string().url("Please enter a valid URL for the OG image.").optional().or(z.literal('')),
  }),
  socials: z.object({
      email: z.string().email("Please enter a valid email."),
      github: z.string().url("Please enter a valid GitHub URL."),
      telegram: z.string().url("Please enter a valid Telegram URL."),
  }),
  security: z.object({
      adminEmail: z.string().email("Please enter a valid admin email."),
      currentPassword: z.string().optional(),
      newPassword: z.string().optional(),
      confirmNewPassword: z.string().optional(),
  }),
  integrations: z.object({
    geminiApiKey: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
    cloudinary: z.object({
        cloudName: z.string().optional(),
        apiKey: z.string().optional(),
        apiSecret: z.string().optional(),
    })
  })
}).refine(data => {
    if (data.security.newPassword) {
        return data.security.newPassword === data.security.confirmNewPassword;
    }
    return true;
}, {
    message: "رمز عبور جدید و تکرار آن باید یکسان باشند.",
    path: ["security", "confirmNewPassword"],
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  settings: SiteSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      en: settings.en,
      fa: settings.fa,
      seo: settings.seo,
      socials: settings.socials,
      integrations: settings.integrations,
      security: {
        adminEmail: settings.advanced.adminEmail,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    startTransition(async () => {
      try {
        await saveSiteSettings(data);
        toast({
          title: "موفقیت",
          description: "تنظیمات با موفقیت ذخیره شد. برخی تغییرات ممکن است نیاز به بارگذاری مجدد صفحه داشته باشند.",
        });
        router.refresh();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: error.message || "خطا در ذخیره تنظیمات. لطفا دوباره تلاش کنید.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="general"><Globe className="w-4 h-4 ml-2" />عمومی</TabsTrigger>
            <TabsTrigger value="seo"><Search className="w-4 h-4 ml-2" />سئو</TabsTrigger>
            <TabsTrigger value="social"><Share2 className="w-4 h-4 ml-2" />شبکه‌های اجتماعی</TabsTrigger>
            <TabsTrigger value="security"><Shield className="w-4 h-4 ml-2" />امنیت</TabsTrigger>
            <TabsTrigger value="integrations"><Plug className="w-4 h-4 ml-2" />یکپارچه‌سازی</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات عمومی</CardTitle>
                <CardDescription>اطلاعات کلی سایت را در این بخش مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fa.siteName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>نام سایت (فارسی)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="en.siteName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Site Name (English)</FormLabel>
                            <FormControl><Input dir="ltr" {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fa.authorName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>نام نویسنده/صاحب سایت (فارسی)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="en.authorName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author Name (English)</FormLabel>
                            <FormControl><Input dir="ltr" {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                    )} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات سئو (SEO)</CardTitle>
                <CardDescription>تنظیمات مربوط به بهینه‌سازی موتورهای جستجو را در اینجا مدیریت کنید.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" dir="rtl">
                 <FormField control={form.control} name="seo.siteURL" render={({ field }) => (
                    <FormItem>
                        <FormLabel>آدرس کامل سایت (URL)</FormLabel>
                         <FormDescription>این آدرس برای ساختن لینک‌های صحیح در متادیتا استفاده می‌شود.</FormDescription>
                        <FormControl><Input dir="ltr" placeholder="https://example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fa.metaTitle" render={({ field }) => (
                        <FormItem>
                            <FormLabel>عنوان متا پیش‌فرض (فارسی)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="en.metaTitle" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Default Meta Title (English)</FormLabel>
                            <FormControl><Input dir="ltr" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fa.metaDescription" render={({ field }) => (
                        <FormItem>
                            <FormLabel>توضیحات متا پیش‌فرض (فارسی)</FormLabel>
                            <FormControl><Textarea {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="en.metaDescription" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Default Meta Description (English)</FormLabel>
                            <FormControl><Textarea dir="ltr" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                 <FormField control={form.control} name="seo.metaKeywords" render={({ field }) => (
                    <FormItem>
                        <FormLabel>کلمات کلیدی متا (جدا شده با ویرگول)</FormLabel>
                        <FormControl><Input dir="ltr" placeholder="AI, Next.js, Portfolio, ..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="seo.twitterUsername" render={({ field }) => (
                        <FormItem>
                            <FormLabel>نام کاربری توییتر (بدون @)</FormLabel>
                            <FormControl><Input dir="ltr" placeholder="username" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="seo.ogImage" render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL تصویر Open Graph</FormLabel>
                            <FormDescription>تصویری که هنگام اشتراک‌گذاری لینک سایت نمایش داده می‌شود (نسبت 1.91:1).</FormDescription>
                            <FormControl><Input dir="ltr" placeholder="https://example.com/og-image.png" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>شبکه‌های اجتماعی</CardTitle>
                <CardDescription>لینک‌های شبکه‌های اجتماعی که در فوتر سایت نمایش داده می‌شوند.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" dir="rtl">
                <FormField control={form.control} name="socials.email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>آدرس ایمیل</FormLabel>
                        <FormControl><Input dir="ltr" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="socials.github" render={({ field }) => (
                    <FormItem>
                        <FormLabel>لینک پروفایل گیت‌هاب</FormLabel>
                        <FormControl><Input dir="ltr" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="socials.telegram" render={({ field }) => (
                    <FormItem>
                        <FormLabel>لینک پروفایل تلگرام</FormLabel>
                        <FormControl><Input dir="ltr" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              </CardContent>
            </Card>
          </TabsContent>

           <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات امنیتی</CardTitle>
                <CardDescription>ایمیل و رمز عبور خود برای ورود به پنل مدیریت را تغییر دهید.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6" dir="rtl">
                <FormField control={form.control} name="security.adminEmail" render={({ field }) => (
                    <FormItem>
                        <FormLabel>ایمیل ادمین</FormLabel>
                        <FormDescription>این ایمیل برای ورود و دریافت نوتیفیکیشن‌ها استفاده می‌شود.</FormDescription>
                        <FormControl><Input dir="ltr" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Separator />
                 <h4 className="text-lg font-medium">تغییر رمز عبور</h4>
                 <FormDescription>برای تغییر رمز عبور، رمز فعلی خود را وارد کنید. اگر فیلدهای رمز عبور جدید را خالی بگذارید، رمز عبور فعلی بدون تغییر باقی خواهد ماند.</FormDescription>
                <FormField control={form.control} name="security.currentPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>رمز عبور فعلی</FormLabel>
                        <FormControl><Input type="password" dir="ltr" {...field} autoComplete="current-password" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="security.newPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>رمز عبور جدید</FormLabel>
                        <FormControl><Input type="password" dir="ltr" {...field} autoComplete="new-password"/></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="security.confirmNewPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>تکرار رمز عبور جدید</FormLabel>
                        <FormControl><Input type="password" dir="ltr" {...field} autoComplete="new-password" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              </CardContent>
            </Card>
          </TabsContent>

            <TabsContent value="integrations">
                <Card>
                    <CardHeader>
                        <CardTitle>یکپارچه‌سازی و API Keys</CardTitle>
                        <CardDescription>
                            کلیدهای API برای سرویس‌های خارجی را اینجا مدیریت کنید. این مقادیر به صورت امن در سرور ذخیره می‌شوند.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6" dir="rtl">
                        <FormField control={form.control} name="integrations.geminiApiKey" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gemini API Key</FormLabel>
                                <FormDescription>کلید برای استفاده از مدل‌های هوش مصنوعی Gemini در بخش‌هایی مانند چت‌بات و تولید محتوای وبلاگ.</FormDescription>
                                <FormControl><Input dir="ltr" type="password" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Separator />
                         <FormField control={form.control} name="integrations.googleAnalyticsId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Google Analytics ID</FormLabel>
                                <FormDescription>شناسه اندازه‌گیری گوگل آنالیتیکس برای ردیابی ترافیک سایت. (مثال: G-XXXXXXXXXX)</FormDescription>
                                <FormControl><Input dir="ltr" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <Separator />
                         <div className="space-y-4">
                            <h4 className="font-medium">Cloudinary</h4>
                             <FormField control={form.control} name="integrations.cloudinary.cloudName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cloudinary Cloud Name</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="integrations.cloudinary.apiKey" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cloudinary API Key</FormLabel>
                                    <FormControl><Input dir="ltr" type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name="integrations.cloudinary.apiSecret" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cloudinary API Secret</FormLabel>
                                    <FormControl><Input dir="ltr" type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

        </Tabs>

        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </form>
    </Form>
  );
}
