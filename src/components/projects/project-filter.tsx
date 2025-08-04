"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Search } from "lucide-react"

export function ProjectFilter({ allTags, lang = 'en' }: { allTags: string[], lang?: 'en' | 'fa' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedTags = new Set(searchParams.getAll('tags'))
  const currentSearch = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  const t = {
    searchPlaceholder: lang === 'fa' ? "جستجو در پروژه‌ها..." : "Search projects..."
  }

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }
      return newSearchParams.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString())
        if (searchTerm) {
          params.set('search', searchTerm)
        } else {
          params.delete('search')
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchTerm, currentSearch, pathname, router, searchParams])

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
    <div className="flex flex-col items-center gap-6">
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
            />
        </div>
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
    </div>
  )
}
