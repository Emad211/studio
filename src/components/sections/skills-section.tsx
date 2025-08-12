
"use client"

import { useState, useEffect } from "react"
import { skillCategories, skillCategoriesFa } from "@/lib/data"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type SkillCategory = (typeof skillCategories)[0]

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
  onClick,
}: {
  category: SkillCategory
  index: number
  onClick: () => void
}) => {
  const Icon = category.icon as LucideIcon

  return (
    <motion.button
      onClick={onClick}
      variants={FADE_IN_VARIANTS}
      initial="hidden"
      whileInView="show"
      whileHover={{ y: -5, scale: 1.05, shadow: "0 25px 50px -12px rgba(var(--primary-rgb), 0.25)" }}
      custom={index}
      viewport={{ once: true }}
      className="relative aspect-square w-full rounded-xl border border-white/10 bg-background/50 p-4 backdrop-blur-lg shadow-lg text-left"
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
    </motion.button>
  )
}

const skillLevelToValue = (level: "Expert" | "Advanced" | "Intermediate" | "Beginner" | "متخصص" | "پیشرفته" | "متوسط" | "مبتدی") => {
  switch (level) {
    case "Expert":
    case "متخصص":
        return 100;
    case "Advanced":
    case "پیشرفته":
        return 80;
    case "Intermediate":
    case "متوسط":
        return 60;
    case "Beginner":
    case "مبتدی":
        return 40;
    default: return 0;
  }
}

const SkillsDialogContent = ({ category, lang }: { category: SkillCategory | null, lang: 'en' | 'fa' }) => {
    if (!category) {
        return null;
    }
    const isFa = lang === 'fa';

    return (
        <DialogContent className="bg-background/80 backdrop-blur-lg border-white/10" dir={isFa ? "rtl" : "ltr"}>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                    <category.icon className="h-8 w-8" />
                    {category.title}
                </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-6">
                {category.skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between items-end mb-1">
                            <h4 className="font-semibold">{skill.name}</h4>
                            <p className="text-sm text-muted-foreground">{skill.level}</p>
                        </div>
                        <Progress value={skillLevelToValue(skill.level)} className="h-2" />
                    </div>
                ))}
            </div>
        </DialogContent>
    );
};

export function SkillsSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null)
  const [isMounted, setIsMounted] = useState(false);
  const isFa = lang === 'fa';
  
  const currentSkillCategories = isFa ? skillCategoriesFa : skillCategories;

  useEffect(() => {
      setIsMounted(true);
  }, []);

  const t = {
      title: isFa ? "مهارت‌های من" : "My Skills",
      subtitle: isFa ? "مجموعه‌ای از توانایی‌های فنی من. برای دیدن جزئیات روی هر دسته کلیک کنید." : "A collection of my technical capabilities. Click on a category to see details.",
      number: "03."
  }

  return (
    <section id="skills" className="container">
      <div className={cn("mb-12", isFa ? "text-right" : "text-left", "md:text-center")}>
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          <span className="font-mono text-xl md:text-2xl text-secondary">{t.number}</span> {t.title}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {t.subtitle}
        </p>
      </div>
        {isMounted ? (
            <Dialog>
                <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {currentSkillCategories.map((category, index) => (
                    <DialogTrigger key={category.title} asChild>
                    <SkillCategoryCard
                        category={category}
                        index={index}
                        onClick={() => setSelectedCategory(category)}
                    />
                    </DialogTrigger>
                ))}
                </div>
                <SkillsDialogContent category={selectedCategory} lang={lang} />
            </Dialog>
        ) : (
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {currentSkillCategories.map((category, index) => (
                     <SkillCategoryCard
                        key={category.title}
                        category={category}
                        index={index}
                        onClick={() => {}}
                    />
                ))}
            </div>
        )}
    </section>
  )
}
