"use client"
import Link from "next/link"
import { Code, Book, Home, PanelLeft, Languages } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Code },
  { href: "/blog", label: "Blog", icon: Book },
]

export function Header() {
  const pathname = usePathname()
  const lang = pathname.startsWith("/fa") ? "fa" : "en";

  const renderNavLinks = (isMobile: boolean = false) =>
    navLinks.map((link) => (
      <Button
        key={link.href}
        variant="ghost"
        asChild
        className={cn(
          "justify-start text-base",
          pathname === (lang === 'fa' ? `/fa${link.href === '/' ? '' : link.href}`: link.href) ? "bg-accent text-accent-foreground" : "",
          isMobile ? "w-full" : ""
        )}
      >
        <Link href={lang === 'fa' ? `/fa${link.href === '/' ? '' : link.href}`: link.href}>
          <link.icon className="mr-2 h-4 w-4" />
          {lang === 'fa' ? (link.label === 'Home' ? 'خانه' : link.label === 'Projects' ? 'پروژه‌ها' : 'بلاگ') : link.label}
        </Link>
      </Button>
    ))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={lang === 'fa' ? '/fa' : '/'} className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block font-headline">
              CodeCanvas
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {renderNavLinks()}
          </nav>
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
          <SheetContent side="left" className="pr-0">
            <Link
              href={lang === 'fa' ? '/fa' : '/'}
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
        <div className="flex flex-1 items-center justify-end space-x-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={pathname.replace('/fa', '') || '/'} prefetch={false}>English</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/fa${pathname}`} prefetch={false}>فارسی</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
