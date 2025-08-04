"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projects } from "@/lib/data"
import { ArrowRight, Code, Folder } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

const ProjectDisplay = ({ project }: { project: typeof projects[0] }) => {
  return (
    <motion.div
      key={project.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="relative aspect-video rounded-t-lg overflow-hidden border-b">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint="project screenshot"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-headline text-xl mb-2 text-primary">{project.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
            ))}
        </div>
      </div>
       <div className="p-6 border-t mt-auto">
         <Button asChild>
            <Link href={`/projects/${project.slug}`}>
              View Case Study <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
       </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const recentProjects = projects.slice(0, 4)

  return (
    <section id="projects" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">04.</span> Featured Projects
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">Some of the projects I'm proud to have worked on.</p>
      </div>
      <div className="mt-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[550px]">
          {/* Left Panel: Project List */}
          <div className="lg:col-span-1 bg-card/50 rounded-lg border p-4">
             <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4 px-2">
                <Folder size={16} />
                <span>Projects</span>
             </div>
             <ul className="space-y-1">
                {recentProjects.map(project => (
                    <li key={project.slug}>
                       <button 
                         onClick={() => setSelectedProject(project)}
                         className={cn(
                           "w-full text-left flex items-center gap-3 p-2 rounded-md text-sm transition-colors",
                           selectedProject.slug === project.slug 
                             ? "bg-primary/10 text-primary font-medium" 
                             : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                         )}
                       >
                         <Code size={16} className={cn(selectedProject.slug === project.slug ? "text-primary" : "")}/>
                         <span className="truncate">{project.title}</span>
                       </button>
                    </li>
                ))}
             </ul>
          </div>

          {/* Right Panel: Project Display */}
          <div className="lg:col-span-2 bg-card/50 rounded-lg border overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedProject && <ProjectDisplay project={selectedProject} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
       <div className="mt-16 text-center">
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
