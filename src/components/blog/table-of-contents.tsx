"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Heading = {
  id: string
  level: number
  text: string
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24">
      <h3 className="font-headline text-lg font-semibold mb-4 lg:text-right">On this page</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className="lg:text-right" style={{ paddingRight: `${(heading.level - 1) * 1}rem` }}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "text-sm text-muted-foreground hover:text-foreground transition-colors",
                activeId === heading.id && "text-primary font-semibold"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
