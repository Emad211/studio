
import { notFound } from "next/navigation"
import { getProjects, getSiteSettings } from "@/lib/actions"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import { ProjectSimulator } from "@/components/projects/project-simulator"
import { ProjectAIChat } from "@/components/projects/project-ai-chat"
import type { Project } from "@/lib/data"
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"
import { SocialShare } from "@/components/ui/social-share"
import { MarkdownContent } from "@/components/ui/markdown-content"

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const projects = await getProjects();
  const project = projects.find(p => p.slug === params.slug);
  const settings = await getSiteSettings();

  if (!project) {
    return {};
  }

  const title = `${project.title_fa} | ${settings.fa.siteName}`;
  const url = `${settings.seo.siteURL}/projects/${project.slug}`;
  const ogImage = project.image || settings.seo.ogImage;

  return {
    title: title,
    description: project.description_fa,
    openGraph: {
        title: title,
        description: project.description_fa,
        type: 'article',
        url: url,
        images: ogImage ? [ogImage] : [],
        authors: [settings.fa.authorName],
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: project.description_fa,
        creator: settings.seo.twitterUsername ? `@${settings.seo.twitterUsername}` : undefined,
        images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const exampleCode = project.code_snippet_fa.replace("{project.title_fa}", project.title_fa);
  const settings = await getSiteSettings();
  const shareUrl = `${settings.seo.siteURL}/projects/${project.slug}`;

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
           <MarkdownContent content={project.about_fa} />

          <h3 className="font-headline text-2xl text-foreground">جزئیات فنی</h3>
           <MarkdownContent content={project.technical_details_fa} />
          
          <div dir="ltr">
            <CodeBlock code={exampleCode} language="python" />
          </div>

          <h3 className="font-headline text-2xl text-foreground">چالش‌ها و راه‌حل‌ها</h3>
          <MarkdownContent content={project.challenges_fa} />
          <MarkdownContent content={project.solution_fa} />
        </div>

        <Separator className="my-16" />

        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">ویترین پروژه</h2>
                <p className="mt-2 text-muted-foreground">پروژه را از طریق لینک‌ها یا ویترین‌های تعاملی زیر کاوش کنید.</p>
            </div>
            
             <div className="flex justify-center gap-4">
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

            {project.showcase_simulator && project.gallery && project.gallery.length > 0 && (
                <div dir="ltr"><ProjectSimulator images={project.gallery} lang="fa" /></div>
            )}

            {project.showcase_ai_chatbot && project.aiPromptContext && (
                <ProjectAIChat projectContext={project.aiPromptContext} lang="fa" />
            )}
        </div>

        <div className="mt-16">
            <SocialShare url={shareUrl} title={project.title_fa} lang="fa" />
        </div>
        
      </div>
    </div>
  )
}
