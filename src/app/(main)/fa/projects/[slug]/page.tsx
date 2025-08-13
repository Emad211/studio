import { notFound } from "next/navigation"
import { getProjects } from "@/lib/actions"
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

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

const Showcase = ({ project }: { project: Project }) => {
  if (project.showcaseType === 'simulator' && project.gallery && project.gallery.length > 0) {
    return <ProjectSimulator images={project.gallery} />;
  }

  if (project.showcaseType === 'ai_chatbot' && project.aiPromptContext) {
    return <ProjectAIChat projectContext={project.aiPromptContext} lang="fa" />;
  }

  // Default to links
  return (
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
  )
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const exampleCode = project.code_snippet_fa.replace("{project.title_fa}", project.title_fa);

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
          <p>{project.about_fa}</p>

          <h3 className="font-headline text-2xl text-foreground">جزئیات فنی</h3>
          <p>{project.technical_details_fa}</p>

          <div dir="ltr">
            <CodeBlock code={exampleCode} language="jsx" />
          </div>

          <h3 className="font-headline text-2xl text-foreground">چالش‌ها و راه‌حل‌ها</h3>
          <p>{project.challenges_fa}</p>
          <p>{project.solution_fa}</p>
        </div>

        <Separator className="my-16" />

        <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-center text-primary">ویترین پروژه</h2>
            <Showcase project={project} />
        </div>
        
      </div>
    </div>
  )
}
