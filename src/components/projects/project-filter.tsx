"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState, useMemo } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Search, Plus, X, Check, ChevronDown } from "lucide-react"

export function ProjectFilter({ allCategories, lang = 'en' }: { allCategories: string[], lang?: 'en' | 'fa' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isFa = lang === 'fa'

  const t = {
    searchPlaceholder: isFa ? "جستجو در پروژه‌ها..." : "Search projects...",
    category: isFa ? "دسته‌بندی" : "Category",
    noResults: isFa ? "نتیجه‌ای یافت نشد." : "No results found.",
    clearFilters: isFa ? "پاک کردن همه فیلترها" : "Clear all filters"
  }

  const selectedCategories = useMemo(() => new Set(searchParams.getAll('categories')), [searchParams]);
  const currentSearch = searchParams.get('search') || ''
  
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  const createQueryString = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    if(searchTerm.trim()){
      newSearchParams.set('search', searchTerm.trim());
    }
    if (selectedCategories.size > 0) {
      selectedCategories.forEach(c => newSearchParams.append('categories', c))
    }
    return newSearchParams.toString()
  }, [searchTerm, selectedCategories])

  useEffect(() => {
    const handler = setTimeout(() => {
      router.push(`${pathname}?${createQueryString()}`, { scroll: false })
    }, 300)

    return () => clearTimeout(handler)
  }, [searchTerm, selectedCategories, pathname, router, createQueryString])

  const handleSelectCategory = (category: string) => {
    const newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(category)) {
      newSelectedCategories.delete(category);
    } else {
      newSelectedCategories.add(category);
    }
    
    const params = new URLSearchParams()
    if(searchTerm.trim()) params.set('search', searchTerm.trim())
    newSelectedCategories.forEach(c => params.append('categories', c))
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    setSearchTerm('');
    router.push(pathname, { scroll: false });
  }
  
  const hasActiveFilters = selectedCategories.size > 0 || !!searchTerm;

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2 justify-center">
            <div className="relative flex-grow">
                <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isFa ? "right-3" : "left-3")} />
                <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn("h-11 w-full", isFa ? "pr-10" : "pl-10")}
                />
            </div>
             <FilterPopover 
                title={t.category} 
                options={allCategories} 
                selected={selectedCategories} 
                onSelect={handleSelectCategory} 
            />
        </div>

        {hasActiveFilters && (
            <div className={cn("flex flex-wrap items-center justify-center gap-2 pt-2 min-h-[2.5rem] transition-all")}>
                {[...selectedCategories].map(value => (
                    <Badge key={value} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                        {value}
                        <button onClick={() => handleSelectCategory(value)} className="rounded-full hover:bg-muted-foreground/20 p-0.5">
                        <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                <Button variant="ghost" onClick={clearAllFilters} className="h-auto px-2 py-1 text-xs flex-shrink-0">
                    {t.clearFilters}
                </Button>
            </div>
        )}
    </div>
  )
}

function FilterPopover({ title, options, selected, onSelect }: { title: string, options: string[], selected: Set<string>, onSelect: (value: string) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-11 w-full md:w-auto justify-between">
          <div className="flex items-center">
             {title}
            {selected.size > 0 && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{selected.size}</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="end">
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
