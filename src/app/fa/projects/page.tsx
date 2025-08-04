import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { projects, allTags } from "@/lib/data";

export default function ProjectsPage({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const selectedTags = typeof searchParams?.tags === 'string' ? [searchParams.tags] : (Array.isArray(searchParams?.tags) ? searchParams.tags : []);

  const filteredProjects = selectedTags.length > 0
    ? projects.filter(project => selectedTags.every(tag => project.tags.includes(tag)))
    : projects;

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">پروژه‌های من</h1>
        <p className="mt-2 text-lg text-muted-foreground">مجموعه‌ای از کارهای من، از برنامه‌های وب تا پروژه‌های متن‌باز.</p>
      </div>

      <ProjectFilter allTags={allTags} />

      {filteredProjects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} lang="fa"/>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold">پروژه‌ای برای فیلترهای انتخاب شده یافت نشد.</p>
          <p className="text-muted-foreground mt-2">انتخاب فیلتر خود را تغییر دهید.</p>
        </div>
      )}
    </div>
  );
}
