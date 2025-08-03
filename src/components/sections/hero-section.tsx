'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from "@/components/type-animation"
import { ArrowDown } from "lucide-react"

const specializations = ["Computer Engineer", "AI Specialist"]

export function HeroSection() {

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
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
          <motion.h1 
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60"
          >
            Emad Karimi
          </motion.h1>
          <motion.h2 
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-4 text-xl sm:text-2xl font-bold md:text-3xl lg:text-4xl text-foreground/70 font-headline h-10 md:h-12"
          >
            <TypeAnimation sequence={specializations} />
          </motion.h2>
          <motion.p 
             variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground"
          >
            Shaping the intelligence of tomorrow, one line of code at a time.
          </motion.p>
          <motion.div 
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-8 flex justify-center"
          >
            <Button size="lg" asChild className="group">
              <Link href="/projects">
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
