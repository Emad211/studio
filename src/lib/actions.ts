"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { Project, BlogPost, SiteSettings } from "./data";
import { getInitialData, services, servicesFa } from "./data";

// This is a mock database. In a real application, you would use a database
// like PostgreSQL, MongoDB, or Firebase.
const DATA_FILE = path.join(process.cwd(), "src", "lib", "_data.json");

type DbData = {
    projects: Project[];
    blogPosts: BlogPost[];
    settings: SiteSettings;
}

async function readData(): Promise<DbData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log("Data file not found, initializing...");
      const initialData = getInitialData();
      await writeData(initialData);
      return initialData;
    }
    console.error("Error reading data file:", error);
    throw error;
  }
}

async function writeData(data: DbData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}


// Data Access Functions
export async function getProjects(): Promise<Project[]> {
    const data = await readData();
    return data.projects || [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const data = await readData();
    return data.blogPosts || [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const data = await readData();
    // Return default settings if none are found
    return data.settings || getInitialData().settings;
}

export async function getAllCategories(lang: 'en' | 'fa') {
  if (lang === 'fa') {
    return servicesFa.map(s => s.title);
  }
  return services.map(s => s.title);
}


// Server Actions for Projects

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

export async function saveProject(
  formData: z.infer<typeof projectSchema>,
  existingSlug?: string
) {
  const validatedData = projectSchema.parse(formData);
  const data = await readData();

  const categories_fa = validatedData.categories.map(categoryName => {
    const service = services.find(s => s.title === categoryName);
    if (service) {
      const faService = servicesFa.find(s => s.icon === service.icon);
      return faService ? faService.title : categoryName;
    }
    return categoryName;
  });

  const projectData: Project = {
    ...validatedData,
    categories_fa: categories_fa,
    tags: validatedData.tags.split(",").map((t) => t.trim()),
    links: {
      github: validatedData.github,
      live: validatedData.live,
    },
    gallery: validatedData.gallery ? validatedData.gallery.split("\n").map(url => url.trim()).filter(url => url) : [],
    aiPromptContext: validatedData.aiPromptContext,
  };

  if (existingSlug) {
    const projectIndex = data.projects.findIndex((p) => p.slug === existingSlug);
    if (projectIndex !== -1) {
      data.projects[projectIndex] = { ...data.projects[projectIndex], ...projectData };
    }
  } else {
    // Check for duplicate slug
    if (data.projects.some(p => p.slug === projectData.slug)) {
        throw new Error("اسلاگ تکراری است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
    }
    data.projects.unshift(projectData);
  }

  await writeData(data);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/en/projects");
  revalidatePath(`/projects/${validatedData.slug}`);
  revalidatePath(`/en/projects/${validatedData.slug}`);
  revalidatePath("/");
  revalidatePath("/en");

}

export async function deleteProject(slug: string): Promise<void> {
  const data = await readData();
  data.projects = data.projects.filter((p) => p.slug !== slug);
  await writeData(data);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/en/projects");
  revalidatePath("/");
  revalidatePath("/en");
}

// Server Actions for Blog Posts

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


export async function saveBlogPost(
  formData: z.infer<typeof blogPostSchema>,
  existingSlug?: string
) {
  const validatedData = blogPostSchema.parse(formData);
  const data = await readData();

  const blogPostData: BlogPost = {
    ...validatedData,
    title: validatedData.title || validatedData.title_fa,
    description: validatedData.meta_description_en || '',
    description_fa: validatedData.meta_description_fa || '',
    content: validatedData.content || validatedData.content_fa,
    tags: validatedData.tags.split(",").map((t) => t.trim()),
  };

  if (existingSlug) {
    const postIndex = data.blogPosts.findIndex((p) => p.slug === existingSlug);
    if (postIndex !== -1) {
      data.blogPosts[postIndex] = blogPostData;
    }
  } else {
     if (data.blogPosts.some(p => p.slug === blogPostData.slug)) {
        throw new Error("اسلاگ تکراری است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
    }
    data.blogPosts.unshift(blogPostData);
  }

  await writeData(data);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/en/blog");
  revalidatePath(`/blog/${blogPostData.slug}`);
  revalidatePath(`/en/blog/${blogPostData.slug}`);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const data = await readData();
  data.blogPosts = data.blogPosts.filter((p) => p.slug !== slug);
  await writeData(data);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/en/blog");
}

// Server Actions for Settings
const settingsSchema = z.object({
  en: z.object({
    siteName: z.string().min(1),
    authorName: z.string().min(1),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
  }),
  fa: z.object({
    siteName: z.string().min(1),
    authorName: z.string().min(1),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
  }),
  seo: z.object({
    siteURL: z.string().url(),
    metaKeywords: z.string().optional(),
    twitterUsername: z.string().optional(),
    ogImage: z.string().url().optional().or(z.literal('')),
  }),
  socials: z.object({
      email: z.string().email(),
      github: z.string().url(),
      telegram: z.string().url(),
  }),
  advanced: z.object({
      adminEmail: z.string().email(),
  })
});

export async function saveSiteSettings(formData: z.infer<typeof settingsSchema>) {
    const validatedData = settingsSchema.parse(formData);
    const data = await readData();
    data.settings = validatedData;
    await writeData(data);

    // Revalidate all paths that might use settings
    revalidatePath("/", "layout");
}
