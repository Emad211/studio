
"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { saveProject } from "@/lib/actions";
import { services } from "@/lib/data";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Bot, Image as ImageIcon, Link } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MarkdownGuide } from "./markdown-guide";

const projectSchema = z.object({
  title: z.string().min(1, "عنوان انگلیسی الزامی است."),
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  slug: z.string().min(1, "اسلاگ الزامی است."),
  description: z.string().min(1, "توضیحات انگلیسی الزامی است."),
  description_fa: z.string().min(1, "توضیحات فارسی الزامی است."),
  image: z.string().url("باید یک URL معتبر باشد."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  categories: z.array(z.string()).min(1, "حداقل یک دسته‌بندی انتخاب کنید."),
  
  // Showcase fields
  showcaseType: z.enum(['links', 'simulator', 'ai_chatbot']),
  github: z.string().url("لینک گیت‌هاب باید یک URL معتبر باشد.").optional().or(z.literal('')),
  live: z.string().url("لینک پیش‌نمایش زنده باید یک URL معتبر باشد.").optional().or(z.literal('')),
  gallery: z.string().optional(),
  aiPromptContext: z.string().optional(),

  // Page Content fields
  about: z.string().min(1, "About content is required."),
  about_fa: z.string().min(1, "محتوای درباره پروژه الزامی است."),
  technical_details: z.string().min(1, "Technical details are required."),
  technical_details_fa: z.string().min(1, "جزئیات فنی الزامی است."),
  challenges: z.string().min(1, "Challenges content is required."),
  challenges_fa: z.string().min(1, "محتوای چالش‌ها الزامی است."),
  solution: z.string().min(1, "Solution content is required."),
  solution_fa: z.string().min(1, "محتوای راه‌حل الزامی است."),
  code_snippet: z.string().min(1, "Code snippet is required."),
  code_snippet_fa: z.string().min(1, "قطعه کد الزامی است."),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
}

const ShowcaseFields = ({ control }: { control: any }) => {
    const showcaseType = useWatch({
      control,
      name: "showcaseType",
    });
  
    return (
      <Card>
        <CardHeader>
            <CardTitle>ویترین پروژه</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
            <FormField
            control={control}
            name="showcaseType"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>نوع ویترین را انتخاب کنید</FormLabel>
                <FormControl>
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                    <FormItem>
                        <FormControl>
                            <RadioGroupItem value="links" id="links" className="sr-only" />
                        </FormControl>
                        <Label htmlFor="links" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <Link className="mb-2 h-6 w-6" />
                            لینک‌ها
                        </Label>
                    </FormItem>
                    <FormItem>
                        <FormControl>
                            <RadioGroupItem value="simulator" id="simulator" className="sr-only" />
                        </FormControl>
                        <Label htmlFor="simulator" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <ImageIcon className="mb-2 h-6 w-6" />
                            شبیه‌ساز (گالری)
                        </Label>
                    </FormItem>
                    <FormItem>
                        <FormControl>
                            <RadioGroupItem value="ai_chatbot" id="ai_chatbot" className="sr-only" />
                        </FormControl>
                        <Label htmlFor="ai_chatbot" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                            <Bot className="mb-2 h-6 w-6" />
                            چت‌بات AI
                        </Label>
                    </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {showcaseType === 'links' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                    control={control}
                    name="github"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>لینک گیت‌هاب</FormLabel>
                        <FormControl>
                            <Input dir="ltr" placeholder="https://github.com/..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={control}
                    name="live"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>لینک پیش‌نمایش زنده</FormLabel>
                        <FormControl>
                            <Input dir="ltr" placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            )}
            {showcaseType === 'simulator' && (
                <FormField
                control={control}
                name="gallery"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>گالری تصاویر/GIF شبیه‌ساز</FormLabel>
                    <FormDescription>
                        لیستی از URL های تصاویر یا GIF، که هر کدام با یک خط جدید از هم جدا شده‌اند.
                    </FormDescription>
                    <FormControl>
                        <Textarea dir="ltr" className="min-h-[150px] font-code" placeholder="https://.../image1.png\nhttps://.../animation.gif" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
            {showcaseType === 'ai_chatbot' && (
                <FormField
                control={control}
                name="aiPromptContext"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>متن زمینه برای چت‌بات هوش مصنوعی</FormLabel>
                    <FormDescription>
                        این متنی است که به عنوان دانش پایه به ربات داده می‌شود تا به سوالات کاربران پاسخ دهد.
                    </FormDescription>
                    <FormControl>
                        <Textarea className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            )}
        </CardContent>
      </Card>
    );
};


export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? { 
          ...project, 
          tags: project.tags.join(", "), 
          github: project.links.github, 
          live: project.links.live,
          gallery: project.gallery?.join("\n"),
        }
      : {
          title: "",
          title_fa: "",
          slug: "",
          description: "",
          description_fa: "",
          image: "https://placehold.co/600x400.png",
          tags: "",
          categories: [],
          showcaseType: 'links',
          github: "",
          live: "",
          gallery: "",
          aiPromptContext: "",
          about: "",
          about_fa: "",
          technical_details: "",
          technical_details_fa: "",
          challenges: "",
          challenges_fa: "",
          solution: "",
          solution_fa: "",
          code_snippet: "print('Hello from {project.title}!')",
          code_snippet_fa: "print('درود از طرف {project.title_fa}!')",
        },
  });

  const onSubmit = (data: ProjectFormValues) => {
    startTransition(async () => {
        try {
            await saveProject(data, project?.slug);
            toast({
              title: "موفقیت",
              description: `پروژه "${data.title_fa}" با موفقیت ذخیره شد.`,
            });
            router.push("/admin/projects");
            router.refresh();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "خطا",
                description: error.message || `خطا در ذخیره پروژه. لطفا دوباره تلاش کنید.`,
            });
        }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" dir="rtl">
        <Card>
            <CardHeader>
                <CardTitle>اطلاعات اصلی پروژه</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="title_fa"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>عنوان فارسی</FormLabel>
                            <FormControl>
                            <Input placeholder="عنوان پروژه..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>عنوان انگلیسی</FormLabel>
                            <FormControl>
                            <Input dir="ltr" placeholder="Project Title..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>اسلاگ (Slug)</FormLabel>
                        <FormDescription>
                            یک شناسه منحصر به فرد انگلیسی برای آدرس پروژه.
                        </FormDescription>
                        <FormControl>
                        <Input dir="ltr" placeholder="a-unique-english-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">دسته‌بندی‌ها</FormLabel>
                                <FormDescription>
                                یک یا چند دسته‌بندی مرتبط با پروژه را انتخاب کنید.
                                </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {services.map((item) => (
                                <FormField
                                key={item.title}
                                control={form.control}
                                name="categories"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.title}
                                        className="flex flex-row items-start space-x-0 space-x-reverse space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item.title)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), item.title])
                                                : field.onChange(
                                                    (field.value || [])?.filter(
                                                    (value) => value !== item.title
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal mr-2">
                                        {item.title}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                control={form.control}
                name="description_fa"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>توضیحات کوتاه فارسی</FormLabel>
                    <FormControl>
                        <Textarea placeholder="توضیحاتی که در کارت پروژه نمایش داده می‌شود..." {...field} />
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
                    <FormLabel>توضیحات کوتاه انگلیسی</FormLabel>
                    <FormControl>
                        <Textarea dir="ltr" placeholder="A short description for the project card..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL تصویر اصلی</FormLabel>
                        <FormControl>
                            <Input dir="ltr" {...field} />
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
                            <Input dir="ltr" placeholder="Next.js, AI, ..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </CardContent>
        </Card>

        <ShowcaseFields control={form.control} />

        <Card>
            <CardHeader>
                <CardTitle>محتوای صفحه پروژه</CardTitle>
                <FormDescription>
                    این محتوا در صفحه اختصاصی پروژه نمایش داده می‌شود و از Markdown پشتیبانی می‌کند.
                </FormDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <FormField
                control={form.control}
                name="about_fa"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>درباره پروژه (فارسی)</FormLabel>
                    <FormControl>
                        <Textarea className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>About Project (English)</FormLabel>
                    <FormControl>
                        <Textarea dir="ltr" className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                
                <FormField
                control={form.control}
                name="technical_details_fa"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>جزئیات فنی (فارسی)</FormLabel>
                    <FormControl>
                        <Textarea className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="technical_details"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Technical Details (English)</FormLabel>
                    <FormControl>
                        <Textarea dir="ltr" className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="challenges_fa"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>چالش‌ها (فارسی)</FormLabel>
                    <FormControl>
                        <Textarea className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="challenges"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Challenges (English)</FormLabel>
                    <FormControl>
                        <Textarea dir="ltr" className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="solution_fa"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>راه‌حل (فارسی)</FormLabel>
                    <FormControl>
                        <Textarea className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Solution (English)</FormLabel>
                    <FormControl>
                        <Textarea dir="ltr" className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="code_snippet_fa"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>قطعه کد نمایشی (فارسی)</FormLabel>
                    <FormDescription>می‌توانید از متغیر &#123;project.title_fa&#125; در اینجا استفاده کنید.</FormDescription>
                    <FormControl>
                        <Textarea className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="code_snippet"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Code Snippet (English)</FormLabel>
                    <FormDescription>You can use the &#123;project.title&#125; variable here.</FormDescription>
                    <FormControl>
                        <Textarea dir="ltr" className="min-h-[120px] font-code" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <MarkdownGuide />
            </CardContent>
        </Card>


        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? "در حال ذخیره..." : (project ? "به‌روزرسانی پروژه" : "ایجاد پروژه")}
        </Button>
      </form>
    </Form>
  );
}
