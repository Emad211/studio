"use client"

import { usePathname, useRouter } from "next/navigation"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (newLang: 'en' | 'fa') => {
    const isFa = pathname.startsWith('/fa');
    let newPath = pathname;

    if (newLang === 'fa' && !isFa) {
        newPath = `/fa${pathname}`;
    } else if (newLang === 'en' && isFa) {
        newPath = pathname.substring(3) || '/';
    }
    
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('fa')}>
          فارسی
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
