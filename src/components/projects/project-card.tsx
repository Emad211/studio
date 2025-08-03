import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

export function ProjectCard({ project, className }: { project: Project, className?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className={cn(
        "h-full flex flex-col transition-all duration-300 border-2 border-transparent hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className)}>
        <CardHeader>
          <div className="aspect-video relative overflow-hidden rounded-md">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="project screenshot"
            />
             <div className="absolute top-2 right-2 p-1.5 bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <ArrowUpRight className="text-foreground h-5 w-5"/>
             </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="font-headline text-lg mb-2">{project.title}</CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
