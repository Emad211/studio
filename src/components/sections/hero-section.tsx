'use client'

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const specializations = ["Full-Stack Developer", "UI/UX Designer", "Creative Coder"]

export function HeroSection() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)

  const type = useCallback(() => {
    if (subIndex === specializations[index].length + 1 && !reverse) {
      setReverse(true)
      return
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % specializations.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, Math.max(reverse ? 75 : subIndex === specializations[index].length ? 1000 : 150, Math.random() * 350))

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse])

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearTimeout(timeout2)
  }, [blink])

  useEffect(() => {
    const cleanup = type()
    return cleanup
  }, [type])

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-gray-900/50 to-background opacity-70 dark:opacity-100"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      <div className="container relative z-10">
        <p className="mb-2 text-lg font-medium text-primary font-headline">
          Hi, my name is
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl font-headline text-foreground/90">
          Alex Doe.
        </h1>
        <h2 className="mt-4 text-3xl font-bold md:text-5xl lg:text-6xl text-foreground/70 font-headline">
          I am a {`${specializations[index].substring(0, subIndex)}`}
          <span className="animate-blink">|</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          I specialize in building exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/projects">View My Work</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
