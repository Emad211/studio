"use client"

import { skillCategories } from "@/lib/data"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const levelColorMap: { [key: string]: string } = {
  Expert: "from-primary/70 to-purple-500/70",
  Advanced: "from-sky-500/70 to-blue-500/70",
  Intermediate: "from-emerald-500/70 to-green-500/70",
  Beginner: "from-gray-500/70 to-slate-500/70",
}

const levelValueMap: { [key: string]: number } = {
  Expert: 9,
  Advanced: 8,
  Intermediate: 7,
  Beginner: 6,
}

const SkillElementCard = ({
  skill,
  index,
}: {
  skill: { name: string; level: string };
  index: number
}) => {
  const getSymbol = (name: string) => {
    const parts = name.split(" ")
    if (parts.length > 1 && parts[0].length === 1 && parts[1].length > 0) {
      return parts[0][0] + parts[1][0]
    }
    if (name.length <= 2) return name
    // check for second uppercase char
    const secondUpper = name.substring(1).split("").find(c => c === c.toUpperCase())
    if (secondUpper) {
        return name[0] + secondUpper.toLowerCase()
    }
    return name.substring(0, 2)
  }

  const FADE_IN_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } },
  }

  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative aspect-square w-full max-w-[120px] rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r rounded-t-lg",
          levelColorMap[skill.level] || "from-gray-500 to-slate-500"
        )}
      />
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="absolute top-2 left-2 text-xs font-bold text-foreground/50">
          {levelValueMap[skill.level] || "0"}
        </div>
        <div className="text-4xl font-bold font-headline text-foreground">
          {getSymbol(skill.name)}
        </div>
        <div className="mt-1 text-xs font-medium text-foreground/90 truncate w-full">
          {skill.name}
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const allSkills = skillCategories.flatMap((category) => category.skills)

  return (
    <section id="skills" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> My Skills
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          A periodic table of my technical capabilities.
        </p>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
        {allSkills.map((skill, index) => (
          <SkillElementCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  )
}
