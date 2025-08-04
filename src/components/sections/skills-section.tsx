"use client"

import {
  BrainCircuit,
  Code,
  Database,
  Languages,
  Book,
  Server,
  Wrench,
  Activity,
} from "lucide-react"
import { skillCategories } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const levelColorMap: { [key: string]: string } = {
  Expert: "bg-primary text-primary-foreground",
  Advanced: "bg-primary/80 text-primary-foreground",
  Intermediate: "bg-secondary text-secondary-foreground",
  Beginner: "bg-muted text-muted-foreground",
}

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
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
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={FADE_UP_ANIMATION_VARIANTS}>
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-xl">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-foreground/90">{skill.name}</span>
                      <Badge
                        className={`text-xs ${
                          levelColorMap[skill.level] || "bg-muted"
                        }`}
                      >
                        {skill.level}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}