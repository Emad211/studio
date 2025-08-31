
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { SiteSettings, Credentials } from "@/lib/data";
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
import { saveSiteSettings, saveCredentials } from "@/lib/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Search, Share2, Shield, Plug } from "lucide-react";
import { Separator } from "../ui/separator";

const publicSettingsSchema = z.object({
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
});

const credentialsSchema = z.object({
  adminEmail: z.string().email("Please enter a valid admin email."),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
  integrations: z.object({
    geminiApiKey: z.string().optional(),
  })
}).refine(data => {
    if (data.newPassword) {
        return data.newPassword === data.confirmNewPassword;
    }
    return true;
}, {
    message: "رمز عبور جدید و تکرار آن باید یکسان باشند.",
    path: ["confirmNewPassword"],
});

type PublicSettingsFormValues = z.infer<typeof publicSettingsSchema>;
type CredentialsFormValues = z.infer<typeof credentialsSchema>;

interface SettingsFormProps {
  settings: SiteSettings;
  credentials: Credentials;
}

export function SettingsForm({ settings, credentials }: SettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPublicPending, startPublicTransition] = useTransition();
  const [isCredentialsPending, startCredentialsTransition] = useTransition();

  const publicForm = useForm<PublicSettingsFormValues>({
    resolver: zodResolver(publicSettingsSchema),
    defaultValues: settings,
  });

  const credentialsForm = useForm<CredentialsFormValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
        adminEmail: credentials.adminEmail,
        integrations: credentials.integrations,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    }
  });

  const onPublicSubmit = (data: PublicSettingsFormValues) => {
    startPublicTransition(async () => {
      try {
        await saveSiteSettings(data);
        toast({
          title: "موفقیت",
          description: "تنظیمات عمومی با موفقیت ذخیره شد.",
        });
        router.refresh();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: error.message || "خطا در ذخیره تنظیمات عمومی. لطفا دوباره تلاش کنید.",
        });
      }
    });
  };

  const onCredentialsSubmit = (data: CredentialsFormValues) => {
    startCredentialsTransition(async () => {
      try {
        await saveCredentials(data);
        toast({
          title: "موفقیت",
          description: "اطلاعات حساس با موفقیت ذخیره شد.",
        });
        credentialsForm.reset({
            ...credentialsForm.getValues(),
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        });
        router.refresh();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: error.message || "خطا در ذخیره اطلاعات حساس. لطفا دوباره تلاش کنید.",
        });
      }
    });
  }

  return (
    <div className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="general"><Globe className="w-4 h-4 ml-2" />عمومی</TabsTrigger>
            <TabsTrigger value="seo"><Search className="w-4 h-4 ml-2" />سئو</TabsTrigger>
            <TabsTrigger value="social"><Share2 className="w-4 h-4 ml-2" />شبکه‌های اجتماعی</TabsTrigger>
            <TabsTrigger value="security"><Shield className="w-4 h-4 ml-2" />امنیت و API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
             <Form {...publicForm}>
                <form onSubmit={publicForm.handleSubmit(onPublicSubmit)} className="space-y-8">
                    <Card>
                    <CardHeader>
                        <CardTitle>تنظیمات عمومی</CardTitle>
                        <CardDescription>اطلاعات کلی سایت را در این بخش مدیریت کنید.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6" dir="rtl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={publicForm.control} name="fa.siteName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>نام سایت (فارسی)</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="en.siteName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Site Name (English)</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={publicForm.control} name="fa.authorName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>نام نویسنده/صاحب سایت (فارسی)</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="en.authorName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Name (English)</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </CardContent>
                    </Card>
                    <Button type="submit" disabled={isPublicPending} size="lg">
                        {isPublicPending ? "در حال ذخیره..." : "ذخیره تنظیمات عمومی"}
                    </Button>
                </form>
            </Form>
          </TabsContent>

           <TabsContent value="seo">
             <Form {...publicForm}>
                <form onSubmit={publicForm.handleSubmit(onPublicSubmit)} className="space-y-8">
                    <Card>
                    <CardHeader>
                        <CardTitle>تنظیمات سئو (SEO)</CardTitle>
                        <CardDescription>تنظیمات مربوط به بهینه‌سازی موتورهای جستجو را در اینجا مدیریت کنید.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6" dir="rtl">
                        <FormField control={publicForm.control} name="seo.siteURL" render={({ field }) => (
                            <FormItem>
                                <FormLabel>آدرس کامل سایت (URL)</FormLabel>
                                <FormDescription>این آدرس برای ساختن لینک‌های صحیح در متادیتا استفاده می‌شود.</FormDescription>
                                <FormControl><Input dir="ltr" placeholder="https://example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={publicForm.control} name="fa.metaTitle" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>عنوان متا پیش‌فرض (فارسی)</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="en.metaTitle" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Default Meta Title (English)</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={publicForm.control} name="fa.metaDescription" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>توضیحات متا پیش‌فرض (فارسی)</FormLabel>
                                    <FormControl><Textarea {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="en.metaDescription" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Default Meta Description (English)</FormLabel>
                                    <FormControl><Textarea dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={publicForm.control} name="seo.metaKeywords" render={({ field }) => (
                            <FormItem>
                                <FormLabel>کلمات کلیدی متا (جدا شده با ویرگول)</FormLabel>
                                <FormControl><Input dir="ltr" placeholder="AI, Next.js, Portfolio, ..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={publicForm.control} name="seo.twitterUsername" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>نام کاربری توییتر (بدون @)</FormLabel>
                                    <FormControl><Input dir="ltr" placeholder="username" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="seo.ogImage" render={({ field }) => (
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
                    <Button type="submit" disabled={isPublicPending} size="lg">
                        {isPublicPending ? "در حال ذخیره..." : "ذخیره تنظیمات عمومی"}
                    </Button>
                </form>
            </Form>
          </TabsContent>

           <TabsContent value="social">
            <Form {...publicForm}>
                <form onSubmit={publicForm.handleSubmit(onPublicSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>شبکه‌های اجتماعی</CardTitle>
                            <CardDescription>لینک‌های شبکه‌های اجتماعی که در فوتر سایت نمایش داده می‌شوند.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6" dir="rtl">
                            <FormField control={publicForm.control} name="socials.email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>آدرس ایمیل</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="socials.github" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>لینک پروفایل گیت‌هاب</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={publicForm.control} name="socials.telegram" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>لینک پروفایل تلگرام</FormLabel>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                    </Card>
                     <Button type="submit" disabled={isPublicPending} size="lg">
                        {isPublicPending ? "در حال ذخیره..." : "ذخیره تنظیمات عمومی"}
                    </Button>
                </form>
            </Form>
          </TabsContent>

           <TabsContent value="security">
            <Form {...credentialsForm}>
                <form onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>اطلاعات کاربری ادمین</CardTitle>
                            <CardDescription>ایمیل و رمز عبور خود برای ورود به پنل مدیریت را تغییر دهید.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6" dir="rtl">
                            <FormField control={credentialsForm.control} name="adminEmail" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ایمیل ادمین</FormLabel>
                                    <FormDescription>این ایمیل برای ورود استفاده می‌شود.</FormDescription>
                                    <FormControl><Input dir="ltr" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Separator />
                            <h4 className="text-lg font-medium">تغییر رمز عبور</h4>
                            <FormDescription>برای تغییر رمز عبور، رمز فعلی خود را وارد کنید. اگر فیلدهای رمز عبور جدید را خالی بگذارید، رمز عبور فعلی بدون تغییر باقی خواهد ماند.</FormDescription>
                            <FormField control={credentialsForm.control} name="currentPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>رمز عبور فعلی</FormLabel>
                                    <FormControl><Input type="password" dir="ltr" {...field} autoComplete="current-password" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={credentialsForm.control} name="newPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>رمز عبور جدید</FormLabel>
                                    <FormControl><Input type="password" dir="ltr" {...field} autoComplete="new-password"/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={credentialsForm.control} name="confirmNewPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>تکرار رمز عبور جدید</FormLabel>
                                    <FormControl><Input type="password" dir="ltr" {...field} autoComplete="new-password" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>کلیدهای API</CardTitle>
                            <CardDescription>
                                کلیدهای API برای سرویس‌های خارجی را اینجا مدیریت کنید. این مقادیر به صورت امن ذخیره می‌شوند.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6" dir="rtl">
                            <FormField control={credentialsForm.control} name="integrations.geminiApiKey" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gemini API Key</FormLabel>
                                    <FormDescription>کلید برای استفاده از مدل‌های هوش مصنوعی Gemini در بخش‌هایی مانند چت‌بات و تولید محتوای وبلاگ.</FormDescription>
                                    <FormControl><Input dir="ltr" type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </CardContent>
                    </Card>
                    <Button type="submit" disabled={isCredentialsPending} size="lg">
                        {isCredentialsPending ? "در حال ذخیره..." : "ذخیره اطلاعات امنیتی"}
                    </Button>
                </form>
            </Form>
          </TabsContent>
        </Tabs>
    </div>
  );
}
