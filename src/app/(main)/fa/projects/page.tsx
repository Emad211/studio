import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { getProjects, getAllTags, getAllCategories } from "@/lib/actions";

export default async function ProjectsPage({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const selectedCategories = typeof searchParams?.categories === 'string' ? [searchParams.categories] : (Array.isArray(searchParams?.categories) ? searchParams.categories : []);
  const selectedTags = typeof searchParams?.tags === 'string' ? [searchParams.tags] : (Array.isArray(searchParams?.tags) ? searchParams.tags : []);
  const searchTerm = typeof searchParams?.search === 'string' ? searchParams.search.toLowerCase() : '';

  const projects = await getProjects();
  const allTags = await getAllTags();
  const allCategories = await getAllCategories('fa');

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategories.length > 0 ? selectedCategories.includes(project.category_fa) : true;
    const tagsMatch = selectedTags.length > 0 ? selectedTags.every(tag => project.tags.includes(tag)) : true;
    const searchMatch = searchTerm
      ? project.title_fa.toLowerCase().includes(searchTerm) || project.description_fa.toLowerCase().includes(searchTerm)
      : true;
    return categoryMatch && tagsMatch && searchMatch;
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">پروژه‌های من</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">مجموعه‌ای از کارهای من، از برنامه‌های وب تا پروژه‌های متن‌باز. برای یافتن پروژه‌های مورد علاقه خود از فیلترهای زیر استفاده کنید.</p>
      </div>

      <ProjectFilter allTags={allTags} allCategories={allCategories} lang="fa" />

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
