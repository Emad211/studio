"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/lib/data";
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
import { saveProject } from "@/lib/actions";

const projectSchema = z.object({
  title: z.string().min(1, "عنوان انگلیسی الزامی است."),
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  slug: z.string().min(1, "اسلاگ الزامی است."),
  description: z.string().min(1, "توضیحات انگلیسی الزامی است."),
  description_fa: z.string().min(1, "توضیحات فارسی الزامی است."),
  image: z.string().url("باید یک URL معتبر باشد."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  github: z.string().url("لینک گیت‌هاب باید یک URL معتبر باشد.").optional().or(z.literal('')),
  live: z.string().url("لینک پیش‌نمایش زنده باید یک URL معتبر باشد.").optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? { ...project, tags: project.tags.join(", "), github: project.links.github, live: project.links.live }
      : {
          title: "",
          title_fa: "",
          slug: "",
          description: "",
          description_fa: "",
          image: "https://placehold.co/600x400.png",
          tags: "",
          github: "",
          live: "",
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
        } catch (error) {
            toast({
                variant: "destructive",
                title: "خطا",
                description: `خطا در ذخیره پروژه. لطفا دوباره تلاش کنید.`,
            });
        }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" dir="rtl">
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
                <FormLabel>URL تصویر</FormLabel>
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
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
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
            control={form.control}
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

        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره پروژه"}
        </Button>
      </form>
    </Form>
  );
}
