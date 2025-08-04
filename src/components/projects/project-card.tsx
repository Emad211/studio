import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

export function ProjectCard({ project, className, lang = 'en' }: { project: Project, className?: string, lang?: 'en' | 'fa' }) {
  const isFa = lang === 'fa';
  const title = isFa ? project.title_fa : project.title;
  const description = isFa ? project.description_fa : project.description;
  const href = isFa ? `/fa/projects/${project.slug}` : `/projects/${project.slug}`;

  return (
    <Link href={href} className="group block h-full">
      <Card className={cn(
        "h-full flex flex-col transition-all duration-300 border bg-card/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2",
        className)}>
        <CardHeader className="p-0">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="project screenshot"
            />
             <div className="absolute top-2 right-2 p-1.5 bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <ArrowUpRight className="text-foreground h-5 w-5"/>
             </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className={cn("font-headline text-lg mb-2", isFa && "text-right")}>{title}</CardTitle>
          <p className={cn("text-muted-foreground text-sm line-clamp-2", isFa && "text-right")}>{description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
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
