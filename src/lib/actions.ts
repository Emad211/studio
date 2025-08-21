
"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { Project, BlogPost, SiteSettings, Credentials } from "./data";
import { getInitialData, services, getInitialCredentials } from "./data";
import { cookies } from 'next/headers'

const DATA_FILE = path.join(process.cwd(), "src", "lib", "_data.json");
const CREDENTIALS_FILE = path.join(process.cwd(), ".credentials.json");

type DbData = {
    projects: Project[];
    blogPosts: BlogPost[];
    settings: SiteSettings;
}

// Data Access Functions for Public Data (_data.json)
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

// Data Access Functions for Sensitive Data (.credentials.json)
async function readCredentials(): Promise<Credentials> {
    try {
        const fileContent = await fs.readFile(CREDENTIALS_FILE, "utf-8");
        return JSON.parse(fileContent);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log("Credentials file not found, initializing...");
            const initialCredentials = getInitialCredentials();
            await writeCredentials(initialCredentials);
            return initialCredentials;
        }
        console.error("Error reading credentials file:", error);
        throw error;
    }
}

async function writeCredentials(data: Credentials): Promise<void> {
    await fs.writeFile(CREDENTIALS_FILE, JSON.stringify(data, null, 2), "utf-8");
}


// Public Data Getters
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
    return data.settings || getInitialData().settings;
}

export async function getCredentials(): Promise<Credentials> {
    return await readCredentials();
}

export async function getAllCategories(lang: 'en' | 'fa') {
  if (lang === 'fa') {
    return services.map(s => s.title_fa);
  }
  return services.map(s => s.title);
}

// --- Authentication Actions ---
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function handleLogin(prevState: any, formData: FormData) {
  try {
    const { email, password } = loginSchema.parse(Object.fromEntries(formData));
    const credentials = await getCredentials();
    
    if (!credentials.adminEmail || !credentials.adminPasswordHash) {
      return { success: false, message: "تنظیمات ورود در سرور پیکربندی نشده است." };
    }
    
    const inputPasswordHash = Buffer.from(password).toString('base64');

    if (email === credentials.adminEmail && inputPasswordHash === credentials.adminPasswordHash) {
      const session = { user: { email: credentials.adminEmail }, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) };
      cookies().set("session", JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: session.expires,
        sameSite: 'lax',
        path: '/',
      });
      return { success: true, message: "ورود موفقیت‌آمیز بود." };
    } else {
      return { success: false, message: "ایمیل یا رمز عبور نامعتبر است." };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: "لطفاً ایمیل و رمز عبور معتبر وارد کنید." };
    }
    console.error("Login error:", error);
    return { success: false, message: "خطای ناشناخته‌ای رخ داد." };
  }
}

// --- Project Actions ---
const projectSchema = z.object({
  title: z.string().min(1, "عنوان انگلیسی الزامی است."),
  title_fa: z.string().min(1, "عنوان فارسی الزامی است."),
  slug: z.string().min(1, "اسلاگ الزامی است."),
  description: z.string().min(1, "توضیحات انگلیسی الزامی است."),
  description_fa: z.string().min(1, "توضیحات فارسی الزامی است."),
  image: z.string().url("باید یک URL معتبر باشد."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  categories: z.array(z.string()).min(1, "حداقل یک دسته‌بندی انتخاب کنید."),
  
  github: z.string().url("لینک گیت‌هاب باید یک URL معتبر باشد.").optional().or(z.literal('')),
  live: z.string().url("لینک پیش‌نمایش زنده باید یک URL معتبر باشد.").optional().or(z.literal('')),
  showcase_simulator: z.boolean(),
  gallery: z.string().optional(),
  showcase_ai_chatbot: z.boolean(),
  aiPromptContext: z.string().optional(),

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
    return service ? service.title_fa : categoryName;
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
  };

  if (existingSlug) {
    const projectIndex = data.projects.findIndex((p) => p.slug === existingSlug);
    if (projectIndex !== -1) {
      data.projects[projectIndex] = { ...data.projects[projectIndex], ...projectData };
    }
  } else {
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

// --- Blog Post Actions ---
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


export async function saveBlogPost(
  formData: z.infer<typeof blogPostSchema>,
  existingSlug?: string
) {
  const validatedData = blogPostSchema.parse(formData);
  const data = await readData();

  const blogPostData: Omit<BlogPost, 'description' | 'description_fa'> & { description?: string; description_fa?: string } = {
    ...validatedData,
    title: validatedData.title || validatedData.title_fa,
    content: validatedData.content || validatedData.content_fa,
    tags: validatedData.tags.split(",").map((t) => t.trim()),
  };

  blogPostData.description_fa = validatedData.meta_description_fa || blogPostData.content_fa.substring(0, 150);
  blogPostData.description = validatedData.meta_description_en || (blogPostData.content || '').substring(0, 150);


  if (existingSlug) {
    const postIndex = data.blogPosts.findIndex((p) => p.slug === existingSlug);
    if (postIndex !== -1) {
      data.blogPosts[postIndex] = blogPostData as BlogPost;
    }
  } else {
     if (data.blogPosts.some(p => p.slug === blogPostData.slug)) {
        throw new Error("اسلاگ تکراری است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
    }
    data.blogPosts.unshift(blogPostData as BlogPost);
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

// --- Site Settings Actions ---
const publicSettingsSchema = z.object({
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
});

export async function saveSiteSettings(formData: z.infer<typeof publicSettingsSchema>) {
    const validatedData = publicSettingsSchema.parse(formData);
    const data = await readData();
    data.settings = validatedData;
    await writeData(data);
    revalidatePath("/", "layout");
}

const credentialsSchema = z.object({
    adminEmail: z.string().email(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
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
    if (data.newPassword) {
        return data.newPassword === data.confirmNewPassword;
    }
    return true;
}, {
    message: "رمز عبور جدید و تکرار آن باید یکسان باشند.",
    path: ["confirmNewPassword"],
});


export async function saveCredentials(formData: z.infer<typeof credentialsSchema>) {
    const validatedData = credentialsSchema.parse(formData);
    const currentCredentials = await readCredentials();

    const newCredentials: Credentials = { ...currentCredentials };
    
    newCredentials.adminEmail = validatedData.adminEmail;
    newCredentials.integrations = validatedData.integrations;

    // Handle password change
    if (validatedData.newPassword) {
        if (!validatedData.currentPassword) {
            throw new Error("برای تغییر رمز عبور، باید رمز عبور فعلی خود را وارد کنید.");
        }
        
        const inputCurrentPasswordHash = Buffer.from(validatedData.currentPassword).toString('base64');
        
        if (inputCurrentPasswordHash !== currentCredentials.adminPasswordHash) {
            throw new Error("رمز عبور فعلی نادرست است.");
        }
        
        newCredentials.adminPasswordHash = Buffer.from(validatedData.newPassword).toString('base64');
    }
    
    await writeCredentials(newCredentials);

    revalidatePath("/admin/settings");
}
