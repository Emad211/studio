"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projects } from "@/lib/data"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/projects/project-card"
import { cn } from "@/lib/utils"

export function ProjectsSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
  const recentProjects = projects.slice(0, 3)
  const isFa = lang === 'fa'

  const t = {
    title: isFa ? "پروژه‌های ویژه" : "Featured Projects",
    subtitle: isFa ? "برخی از پروژه‌هایی که به انجام آن‌ها افتخار می‌کنم." : "Some of the projects I'm proud to have worked on.",
    buttonText: isFa ? "مشاهده همه پروژه‌ها" : "View All Projects",
    number: "04."
  }

  return (
    <section id="projects" className="container">
      <div className={cn("mb-12", isFa ? "text-right" : "text-left", "md:text-center")}>
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">{t.number}</span> {t.title}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">{t.subtitle}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} lang={lang} />
        ))}
      </div>
       <div className="mt-16 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href={isFa ? "/fa/projects" : "/projects"}>
            {t.buttonText}
            {isFa ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Link>
        </Button>
      </div>
    </section>
  )
}
