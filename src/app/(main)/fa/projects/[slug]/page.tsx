import { notFound } from "next/navigation"
import { getProjects } from "@/lib/actions"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const exampleCode = `import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <div>
      <h1>به ${project.title_fa} خوش آمدید</h1>
      <Button>شروع کنید</Button>
    </div>
  )
}`

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{project.title_fa}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.description_fa}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden border">
          <Image
            src={project.image}
            alt={project.title_fa}
            fill
            className="object-cover"
            data-ai-hint="project screenshot"
          />
        </div>

        <div className="prose prose-invert prose-lg mx-auto max-w-none text-right">
          <h2 className="font-headline text-3xl text-foreground">درباره پروژه</h2>
          <p>
            این پروژه برای حل یک مشکل خاص در صنعت توسعه داده شد. با بهره‌گیری از فناوری‌های مدرن مانند React و Next.js، ما یک برنامه مقیاس‌پذیر و کارآمد ساختیم. هدف اصلی ایجاد یک رابط کاربری کاربرپسند بود که گردش کارهای پیچیده را ساده کند.
          </p>

          <h3 className="font-headline text-2xl text-foreground">جزئیات فنی</h3>
          <p>
            فرانت‌اند با Next.js ساخته شده و با استفاده از Tailwind CSS برای ظاهری مدرن و واکنش‌گرا استایل‌دهی شده است. برای مدیریت وضعیت، ما از Context API ری‌اکت استفاده کردیم. بک‌اند توسط Node.js با یک سرور Express قدرت گرفته و به یک پایگاه داده PostgreSQL متصل است.
          </p>

          <div dir="ltr">
            <CodeBlock code={exampleCode} language="jsx" />
          </div>

          <h3 className="font-headline text-2xl text-foreground">چالش‌ها و راه‌حل‌ها</h3>
          <p>
            یکی از چالش‌های اصلی بهینه‌سازی عملکرد برای مجموعه داده‌های بزرگ بود. ما صفحه‌بندی، بارگذاری تنبل برای کامپوننت‌ها و تصاویر، و رندر سمت سرور را برای اطمینان از زمان بارگذاری سریع پیاده‌سازی کردیم. چالش دیگر اطمینان از سازگاری بین مرورگرها بود که از طریق تست‌های دقیق و پالی‌فیل‌ها به آن پرداختیم.
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {project.links.github && (
            <Button asChild variant="outline">
              <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="ml-2 h-4 w-4" /> گیت‌هاب
              </Link>
            </Button>
          )}
          {project.links.live && (
            <Button asChild>
              <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="ml-2 h-4 w-4" /> پیش‌نمایش زنده
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
