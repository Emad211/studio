'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from "@/components/type-animation"

const specializations = ["Computer Engineer & AI Specialist", "Machine Learning Expert"]

export function HeroSection() {

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center">
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="container relative z-10"
        >
          <motion.p 
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mb-2 text-lg font-medium text-primary font-headline"
          >
            Hi, my name is
          </motion.p>
          <motion.h1 
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60"
          >
            Emad Karimi.
          </motion.h1>
          <motion.h2 
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mt-4 text-3xl font-bold md:text-5xl lg:text-6xl text-foreground/70 font-headline h-16 md:h-20"
          >
            I am a <TypeAnimation sequence={specializations} />
          </motion.h2>
          <motion.p 
             variants={FADE_IN_ANIMATION_VARIANTS}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            I specialize in building exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products.
          </motion.p>
          <motion.div 
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mt-8 flex justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
