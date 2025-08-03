import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projects } from "@/lib/data"
import { ProjectCard } from "../projects/project-card"
import { ArrowRight } from "lucide-react"

export function ProjectsSection() {
  const recentProjects = projects.slice(0, 3)

  return (
    <section id="projects" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">04.</span> Featured Projects
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">Some of the projects I'm proud to have worked on.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
