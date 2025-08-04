"use client"

import { motion } from "framer-motion"
import { skillCategories } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export function SkillsSection() {
    return (
        <section id="skills" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">03.</span> My Skills
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    A breakdown of my technical capabilities.
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
                            staggerChildren: 0.15,
                        },
                    },
                }}
                className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {skillCategories.map((category) => (
                    <motion.div key={category.name} variants={FADE_UP_ANIMATION_VARIANTS}>
                        <Card className="h-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl text-primary flex items-center gap-3">
                                    <category.icon className="w-6 h-6" />
                                    {category.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-5">
                                    {category.skills.map((skill) => (
                                        <li key={skill.name}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium text-foreground/90">{skill.name}</span>
                                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                            </div>
                                            <Progress value={skill.level} />
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}