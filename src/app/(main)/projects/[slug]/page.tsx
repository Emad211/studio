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

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

const Showcase = ({ project }: { project: Project }) => {
  if (project.showcaseType === 'simulator' && project.gallery) {
    return <ProjectSimulator images={project.gallery} />;
  }

  if (project.showcaseType === 'ai_chatbot' && project.aiPromptContext) {
    return <ProjectAIChat projectContext={project.aiPromptContext} lang="en" />;
  }

  // Default to links
  return (
      <div className="mt-12 flex justify-center gap-4">
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
      <h1>Welcome to ${project.title}</h1>
      <Button>Get Started</Button>
    </div>
  )
}`

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
          <p>
            This project was developed to solve a specific problem in the industry. Leveraging modern technologies like React and Next.js, we built a scalable and efficient application. The primary goal was to create a user-friendly interface that simplifies complex workflows.
          </p>

          <h3 className="font-headline text-2xl text-foreground">Technical Details</h3>
          <p>
            The front-end is built with Next.js and styled using Tailwind CSS for a responsive and modern look. For state management, we used React's Context API. The back-end is powered by Node.js with an Express server, connecting to a PostgreSQL database.
          </p>

          <CodeBlock code={exampleCode} language="jsx" />

          <h3 className="font-headline text-2xl text-foreground">Challenges and Solutions</h3>
          <p>
            One of the main challenges was optimizing performance for large datasets. We implemented pagination, lazy loading for components and images, and server-side rendering to ensure fast load times. Another challenge was ensuring cross-browser compatibility, which we addressed through rigorous testing and polyfills.
          </p>
        </div>

        <Showcase project={project} />
      </div>
    </div>
  )
}
