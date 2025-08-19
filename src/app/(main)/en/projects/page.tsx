import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { getProjects, getAllCategories } from "@/lib/actions";

export default async function ProjectsPage({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const categories = searchParams?.categories;
  const search = searchParams?.search;
  
  const selectedCategories = typeof categories === 'string' ? [categories] : (Array.isArray(categories) ? categories : []);
  const searchTerm = typeof search === 'string' ? search.toLowerCase() : '';

  const projects = await getProjects();
  const allCategories = await getAllCategories('en');

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategories.length > 0 
      ? selectedCategories.some(sc => project.categories.includes(sc))
      : true;
    const searchMatch = searchTerm
      ? project.title.toLowerCase().includes(searchTerm) || project.description.toLowerCase().includes(searchTerm)
      : true;
    return categoryMatch && searchMatch;
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">My Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">A collection of my work, from web apps to open source. Use the filters below to find projects that interest you.</p>
      </div>

      <ProjectFilter allCategories={allCategories} lang="en" />

      {filteredProjects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} lang="en"/>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold">No projects found for the selected filters.</p>
          <p className="text-muted-foreground mt-2">Try adjusting your filter selection.</p>
        </div>
      )}
    </div>
  );
}
