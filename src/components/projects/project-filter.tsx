"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

export function ProjectFilter({ allTags }: { allTags: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedTags = new Set(searchParams.getAll('tags'))

  const handleTagClick = useCallback(
    (tag: string) => {
      const newTags = new Set(selectedTags)
      if (newTags.has(tag)) {
        newTags.delete(tag)
      } else {
        newTags.add(tag)
      }

      const params = new URLSearchParams(searchParams.toString())
      params.delete('tags')
      newTags.forEach(t => params.append('tags', t))
      
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams, selectedTags]
  )

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {allTags.map((tag) => {
        const isSelected = selectedTags.has(tag)
        return (
          <button key={tag} onClick={() => handleTagClick(tag)}>
            <Badge
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors text-sm px-3 py-1",
                isSelected ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground hover:bg-accent"
              )}
            >
              {tag}
            </Badge>
          </button>
        )
      })}
    </div>
  )
}
