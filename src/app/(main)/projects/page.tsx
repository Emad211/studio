
"use client"

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";
import { getProjects, getAllCategories } from "@/lib/actions";
import { useEffect, useState, useMemo } from "react";
import type { Project } from "@/lib/data";
import { motion } from "framer-motion";

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

export default function ProjectsPage({ searchParams }: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const categories = searchParams?.categories;
  const search = searchParams?.search;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [fetchedProjects, fetchedCategories] = await Promise.all([
        getProjects(),
        getAllCategories('fa')
      ]);
      setProjects(fetchedProjects);
      setAllCategories(fetchedCategories);
    }
    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    const selectedCategories = typeof categories === 'string' ? [categories] : (Array.isArray(categories) ? categories : []);
    const searchTerm = typeof search === 'string' ? search.toLowerCase() : '';

    return projects.filter(project => {
      const categoryMatch = selectedCategories.length > 0 
        ? selectedCategories.some(sc => project.categories_fa.includes(sc)) 
        : true;
      const searchMatch = searchTerm
        ? project.title_fa.toLowerCase().includes(searchTerm) || project.description_fa.toLowerCase().includes(searchTerm)
        : true;
      return categoryMatch && searchMatch;
    });
  }, [projects, categories, search]);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">پروژه‌های من</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">مجموعه‌ای از کارهای من، از برنامه‌های وب تا پروژه‌های متن‌باز. برای یافتن پروژه‌های مورد علاقه خود از فیلترهای زیر استفاده کنید.</p>
      </div>

      <ProjectFilter allCategories={allCategories} lang="fa" />

      {filteredProjects.length > 0 ? (
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
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div key={project.slug} variants={FADE_UP_ANIMATION_VARIANTS} custom={i} className="h-full">
              <ProjectCard project={project} lang="fa" className="h-full"/>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold">پروژه‌ای برای فیلترهای انتخاب شده یافت نشد.</p>
          <p className="text-muted-foreground mt-2">انتخاب فیلتر خود را تغییر دهید.</p>
        </div>
      )}
    </div>
  );
}
