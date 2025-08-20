
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
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  const title = `${project.title} | ${settings.en.siteName}`;
  const url = `${settings.seo.siteURL}/en/projects/${project.slug}`;

  return {
    title: title,
    description: project.description,
    openGraph: {
        title: title,
        description: project.description,
        type: 'article',
        url: url,
        authors: [settings.en.authorName],
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: project.description,
        creator: settings.seo.twitterUsername ? `@${settings.seo.twitterUsername}` : undefined,
    },
  };
}


const Showcase = ({ project }: { project: Project }) => {
  if (project.showcaseType === 'simulator' && project.gallery && project.gallery.length > 0) {
    return <ProjectSimulator images={project.gallery} lang="en" />;
  }

  if (project.showcaseType === 'ai_chatbot' && project.aiPromptContext) {
    return <ProjectAIChat projectContext={project.aiPromptContext} lang="en" />;
  }

  // Default to links
  return (
      <div className="flex justify-center gap-4">
        {project.links.github && (
          <Button asChild variant="outline">
            <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
        )}
        {project.links.live && (
          <Button asChild>
            <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
      </div>
  )
}

const MarkdownContent = ({ content }: { content: string }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            code({node, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                    <div dir="ltr"><CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} /></div>
                ) : (
                    <code className='font-code bg-muted text-primary rounded px-1.5 py-1' {...props}>
                        {children}
                    </code>
                )
            },
            img: ({ node, ...props }) => (
                <div className="relative my-6 aspect-video rounded-lg overflow-hidden border">
                    <Image 
                        src={props.src || ""} 
                        alt={props.alt || "Image from project details"} 
                        fill 
                        className="object-contain" 
                    />
                </div>
            ),
        }}
    >
        {content}
    </ReactMarkdown>
);

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const exampleCode = project.code_snippet.replace("{project.title}", project.title);

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{project.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint="project screenshot"
          />
        </div>

        <div className="prose prose-invert prose-lg mx-auto max-w-none">
          <h2 className="font-headline text-3xl text-foreground">About the Project</h2>
          <MarkdownContent content={project.about} />

          <h3 className="font-headline text-2xl text-foreground">Technical Details</h3>
          <MarkdownContent content={project.technical_details} />

          <div dir="ltr">
            <CodeBlock code={exampleCode} language="python" />
          </div>

          <h3 className="font-headline text-2xl text-foreground">Challenges and Solutions</h3>
           <MarkdownContent content={project.challenges} />
           <MarkdownContent content={project.solution} />
        </div>
        
        <Separator className="my-16" />

        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">Project Showcase</h2>
                <p className="mt-2 text-muted-foreground">Explore the project through the interactive showcase below.</p>
            </div>
            <Showcase project={project} />
        </div>

      </div>
    </div>
  )
}
