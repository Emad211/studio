"use client"

import { skillCategories } from "@/lib/data"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: "easeOut",
    },
  }),
}

const SkillCategoryCard = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0]
  index: number
}) => {
  const Icon = category.icon

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial="hidden"
      whileInView="show"
      whileHover={{ y: -5, scale: 1.05, shadow: "0 25px 50px -12px rgba(var(--primary-rgb), 0.25)" }}
      custom={index}
      viewport={{ once: true }}
      className="relative aspect-square w-full max-w-[150px] rounded-xl border border-white/10 bg-background/50 p-4 backdrop-blur-lg shadow-lg"
    >
      <div className="absolute top-3 left-3 text-lg font-bold text-foreground/50">
        {category.skills.length.toString().padStart(2, "0")}
      </div>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Icon className="h-12 w-12 text-primary" />
        <div className="mt-3 text-sm font-semibold text-foreground">
          {category.title}
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> My Skills
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          A collection of my technical capabilities.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
        {skillCategories.map((category, index) => (
          <SkillCategoryCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </section>
  )
}
