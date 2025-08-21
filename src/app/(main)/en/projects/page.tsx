
"use client"

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { getProjects, getAllCategories } from "@/lib/actions";
import { useEffect, useState, useMemo } from "react";
import type { Project } from "@/lib/data";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
    },
  }),
};

function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col h-full overflow-hidden border rounded-lg">
          <Skeleton className="aspect-video w-full" />
          <div className="p-6 flex-grow">
             <div className="flex flex-wrap items-center gap-2 mb-3">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
             </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProjectsPage({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const categories = searchParams?.categories;
  const search = searchParams?.search;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedProjects, fetchedCategories] = await Promise.all([
          getProjects(),
          getAllCategories('en')
        ]);
        setProjects(fetchedProjects);
        setAllCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch project data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    const selectedCategories = typeof categories === 'string' ? [categories] : (Array.isArray(categories) ? categories : []);
    const searchTerm = typeof search === 'string' ? search.toLowerCase() : '';

    return projects.filter(project => {
      const categoryMatch = selectedCategories.length > 0 
        ? selectedCategories.some(sc => project.categories.includes(sc))
        : true;
      const searchMatch = searchTerm
        ? project.title.toLowerCase().includes(searchTerm) || project.description.toLowerCase().includes(searchTerm)
        : true;
      return categoryMatch && searchMatch;
    });
  }, [projects, categories, search]);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">My Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">A collection of my work, from web apps to open source. Use the filters below to find projects that interest you.</p>
      </div>

      <ProjectFilter allCategories={allCategories} lang="en" />

      <div className="mt-8">
        {isLoading ? (
          <ProjectSkeleton />
        ) : filteredProjects.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div key={project.slug} variants={FADE_UP_ANIMATION_VARIANTS} custom={i} className="h-full">
                <ProjectCard project={project} lang="en" className="h-full"/>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-xl font-semibold">No projects found for the selected filters.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your filter selection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
