"use server";

import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { Project, BlogPost } from "./data";
import { getInitialData } from "./data";

// This is a mock database. In a real application, you would use a database
// like PostgreSQL, MongoDB, or Firebase.
const DATA_FILE = path.join(process.cwd(), "src", "lib", "_data.json");

async function readData(): Promise<{ projects: Project[]; blogPosts: BlogPost[] }> {
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

async function writeData(data: { projects: Project[]; blogPosts: BlogPost[] }): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}


// Data Access Functions
export async function getProjects(): Promise<Project[]> {
    const data = await readData();
    return data.projects;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const data = await readData();
    return data.blogPosts;
}

export async function getAllTags(): Promise<string[]> {
    const data = await readData();
    const allTags = [...new Set(data.projects.flatMap(p => p.tags))].sort();
    return allTags;
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
  github: z.string().url("لینک گیت‌هاب باید یک URL معتبر باشد.").optional().or(z.literal('')),
  live: z.string().url("لینک پیش‌نمایش زنده باید یک URL معتبر باشد.").optional().or(z.literal('')),
});

export async function saveProject(
  formData: z.infer<typeof projectSchema>,
  existingSlug?: string
) {
  const validatedData = projectSchema.parse(formData);
  const data = await readData();

  const projectData: Project = {
    ...validatedData,
    tags: validatedData.tags.split(",").map((t) => t.trim()),
    links: {
      github: validatedData.github,
      live: validatedData.live,
    },
  };

  if (existingSlug) {
    const projectIndex = data.projects.findIndex((p) => p.slug === existingSlug);
    if (projectIndex !== -1) {
      data.projects[projectIndex] = projectData;
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
  revalidatePath("/fa/projects");
  revalidatePath(`/projects/${projectData.slug}`);
  revalidatePath(`/fa/projects/${projectData.slug}`);
  revalidatePath("/");
  revalidatePath("/fa");

}

export async function deleteProject(slug: string): Promise<void> {
  const data = await readData();
  data.projects = data.projects.filter((p) => p.slug !== slug);
  await writeData(data);
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/fa/projects");
  revalidatePath("/");
  revalidatePath("/fa");
}

// Server Actions for Blog Posts

const blogPostSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است."),
  slug: z.string().min(1, "اسلاگ الزامی است."),
  description: z.string().min(1, "توضیحات الزامی است."),
  date: z.string().min(1, "تاریخ الزامی است."),
  tags: z.string().min(1, "حداقل یک تگ الزامی است."),
  content: z.string().min(10, "محتوا باید حداقل 10 کاراکتر باشد."),
});


export async function saveBlogPost(
  formData: z.infer<typeof blogPostSchema>,
  existingSlug?: string
) {
  const validatedData = blogPostSchema.parse(formData);
  const data = await readData();

  const blogPostData: BlogPost = {
    ...validatedData,
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
  revalidatePath("/fa/blog");
  revalidatePath(`/blog/${blogPostData.slug}`);
  revalidatePath(`/fa/blog/${blogPostData.slug}`);
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const data = await readData();
  data.blogPosts = data.blogPosts.filter((p) => p.slug !== slug);
  await writeData(data);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/fa/blog");
}
