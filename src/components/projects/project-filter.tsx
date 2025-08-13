"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState, useMemo } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Search, Plus, X, Check } from "lucide-react"

export function ProjectFilter({ allTags, allCategories, lang = 'en' }: { allTags: string[], allCategories: string[], lang?: 'en' | 'fa' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isFa = lang === 'fa'

  const t = {
    searchPlaceholder: isFa ? "جستجو در پروژه‌ها..." : "Search projects...",
    filterBy: isFa ? "فیلتر بر اساس..." : "Filter by...",
    category: isFa ? "دسته‌بندی" : "Category",
    tags: isFa ? "تگ‌ها" : "Tags",
    noResults: isFa ? "نتیجه‌ای یافت نشد." : "No results found.",
    clearFilters: isFa ? "پاک کردن همه فیلترها" : "Clear all filters"
  }

  const selectedCategories = useMemo(() => new Set(searchParams.getAll('categories')), [searchParams]);
  const selectedTags = useMemo(() => new Set(searchParams.getAll('tags')), [searchParams]);
  const currentSearch = searchParams.get('search') || ''
  
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  const createQueryString = useCallback((params: Record<string, string[] | string>) => {
    const newSearchParams = new URLSearchParams()
    if(searchTerm.trim()){
      newSearchParams.set('search', searchTerm.trim());
    }
    for (const [key, value] of Object.entries(params)) {
      if(key === 'search') continue;
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(v => newSearchParams.append(key, v))
      }
    }
    return newSearchParams.toString()
  }, [searchParams, searchTerm])

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchTerm.trim()) {
        params.set('search', searchTerm)
      } else {
        params.delete('search')
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)

    return () => clearTimeout(handler)
  }, [searchTerm, pathname, router, searchParams])

  const handleSelect = (type: 'categories' | 'tags', value: string) => {
    const currentParams = {
        categories: Array.from(selectedCategories),
        tags: Array.from(selectedTags),
        search: searchTerm,
    };
    
    const currentSet = type === 'categories' ? selectedCategories : selectedTags;

    if (currentSet.has(value)) {
      currentSet.delete(value);
    } else {
      currentSet.add(value);
    }
    
    currentParams[type] = Array.from(currentSet);
    
    router.push(`${pathname}?${createQueryString(currentParams)}`, { scroll: false })
  }

  const clearAllFilters = () => {
    setSearchTerm('');
    router.push(pathname, { scroll: false });
  }
  
  const hasActiveFilters = selectedCategories.size > 0 || selectedTags.size > 0 || searchTerm;

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2">
              <FilterPopover title={t.category} options={allCategories} selected={selectedCategories} onSelect={(value) => handleSelect('categories', value)} />
              <FilterPopover title={t.tags} options={allTags} selected={selectedTags} onSelect={(value) => handleSelect('tags', value)} />
            </div>
            <div className="relative w-full md:w-auto">
                <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isFa ? "right-3" : "left-3")} />
                <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn("h-10 w-full md:w-64", isFa ? "pr-10" : "pl-10")}
                />
            </div>
        </div>
        <div className={cn("flex flex-wrap gap-2 pt-2 transition-all", (selectedCategories.size === 0 && selectedTags.size === 0) ? "h-0 opacity-0" : "h-auto opacity-100")}>
            {[...selectedCategories, ...selectedTags].map(value => (
                <Badge key={value} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                    {value}
                    <button onClick={() => handleSelect(allCategories.includes(value) ? 'categories' : 'tags', value)} className="rounded-full hover:bg-muted-foreground/20 p-0.5">
                       <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
             {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearAllFilters} className="h-auto px-2 py-1 text-xs">
                      {t.clearFilters}
                  </Button>
              )}
        </div>
    </div>
  )
}

function FilterPopover({ title, options, selected, onSelect }: { title: string, options: string[], selected: Set<string>, onSelect: (value: string) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 border-dashed w-full sm:w-auto justify-start text-left font-normal">
          <Plus className="mr-2 h-4 w-4" />
          <span className="flex-grow">{title}</span>
          {selected.size > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-border" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">{selected.size}</Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.has(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => onSelect(option)}
                  >
                    <div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary", isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible")}>
                        <Check className="h-4 w-4" />
                    </div>
                    <span>{option}</span>
                    {isSelected && (
                      <Check className="ml-auto h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selected.size > 0 && (
                 <>
                    <CommandSeparator />
                    <CommandGroup>
                        <CommandItem onSelect={() => selected.forEach(s => onSelect(s))} className="justify-center text-center">
                            Clear filters
                        </CommandItem>
                    </CommandGroup>
                 </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
