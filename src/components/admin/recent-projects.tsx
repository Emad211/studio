import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { FolderKanban } from "lucide-react";

interface RecentProjectsProps {
    projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  if (projects.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed rounded-lg">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderKanban className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">هنوز پروژه‌ای اضافه نشده است</h3>
            <p className="text-muted-foreground mt-1 text-sm">با اضافه کردن اولین پروژه، آن را در اینجا خواهید دید.</p>
            <Button asChild className="mt-4">
                <Link href="/admin/projects/new">ایجاد اولین پروژه</Link>
            </Button>
        </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.slug} className="flex items-center gap-4">
            <Image
                src={project.image}
                alt={project.title_fa}
                width={48}
                height={48}
                className="rounded-md object-cover"
                data-ai-hint="project screenshot"
            />
            <div className="flex-grow">
                <p className="text-sm font-medium leading-none">{project.title_fa}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                    {project.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                </div>
            </div>
            <Button asChild variant="outline" size="sm">
                <Link href={`/admin/projects/edit/${project.slug}`}>ویرایش</Link>
            </Button>
        </div>
      ))}
    </div>
  )
}
