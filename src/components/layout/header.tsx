"use client"
import Link from "next/link"
import { Code, Book, Home, PanelLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LanguageSwitcher } from "./language-switcher"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Code },
  { href: "/blog", label: "Blog", icon: Book },
]

const faNavLinks = [
    { href: "/fa", label: "خانه", icon: Home },
    { href: "/fa/projects", label: "پروژه‌ها", icon: Code },
    { href: "/fa/blog", label: "وبلاگ", icon: Book },
]

export function Header() {
  const pathname = usePathname()
  const isFa = pathname.startsWith('/fa')

  const currentNavLinks = isFa ? faNavLinks : navLinks

  const renderNavLinks = (isMobile: boolean = false) =>
    currentNavLinks.map((link) => (
      <Button
        key={link.href}
        variant="ghost"
        asChild
        className={cn(
          "justify-start text-base",
          pathname === link.href ? "bg-accent text-accent-foreground" : "",
          isMobile ? "w-full" : ""
        )}
      >
        <Link href={link.href}>
          <link.icon className={isFa && !isMobile ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
          {link.label}
        </Link>
      </Button>
    ))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto md:hidden">
            <LanguageSwitcher />
        </div>
        <div className="hidden md:flex items-center">
          <Link href={isFa ? "/fa" : "/"} className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block font-headline">
              CodeCanvas
            </span>
          </Link>
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="hidden md:block">
                <LanguageSwitcher />
            </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={isFa ? "right" : "left"} className="pr-0">
               <SheetHeader className="hidden">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <Link
                href="/"
                className="mr-6 flex items-center space-x-2 mb-6"
              >
                <Logo />
                <span className="font-bold font-headline">
                  CodeCanvas
                </span>
              </Link>
              <div className="flex flex-col space-y-2">
                {renderNavLinks(true)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
