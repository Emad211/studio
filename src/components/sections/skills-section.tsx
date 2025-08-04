"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { skillCategories } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const levelColorMap: { [key: string]: string } = {
  Expert: "bg-primary text-primary-foreground",
  Advanced: "bg-primary/80 text-primary-foreground",
  Intermediate: "bg-secondary text-secondary-foreground",
  Beginner: "bg-muted text-muted-foreground",
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
      <div className="mt-12 max-w-3xl mx-auto">
         <Accordion type="single" collapsible defaultValue={skillCategories[0].title}>
          {skillCategories.map((category) => (
            <AccordionItem key={category.title} value={category.title}>
              <AccordionTrigger className="text-lg hover:no-underline">
                <div className="flex items-center gap-4">
                  <category.icon className="h-6 w-6 text-primary" />
                  <span className="font-headline">{category.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                 <ul className="space-y-4 pt-4 pl-4">
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
