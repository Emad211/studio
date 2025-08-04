'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from "@/components/type-animation"
import { ArrowRight, Mail } from "lucide-react"

const specializations = ["Computer Engineer", "AI Specialist"]

export function HeroSection() {

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden">
      <div className="relative z-10">
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
          className="flex flex-col items-center"
        >
          <motion.h1 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl font-headline"
          >
            Emad Karimi
          </motion.h1>
          <motion.h2 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-4 text-xl sm:text-2xl font-bold md:text-3xl lg:text-4xl text-foreground/80 font-headline h-10 md:h-12"
          >
            <TypeAnimation sequence={specializations} />
          </motion.h2>
          <motion.p 
             variants={FADE_UP_ANIMATION_VARIANTS}
            className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground px-4"
          >
             Shaping the intelligence of tomorrow, one line of code at a time. I build and deploy advanced AI solutions that drive innovation.
          </motion.p>
          <motion.div 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="mt-8 flex w-full flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0"
          >
            <Button size="lg" asChild className="group w-full sm:w-auto">
              <Link href="/projects">
                Explore My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
               <Link href="#contact">
                 <Mail className="mr-2 h-4 w-4" />
                 Get In Touch
               </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
