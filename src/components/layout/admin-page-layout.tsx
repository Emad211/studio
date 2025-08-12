"use client"
import Link from "next/link"
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Settings,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

const adminNavLinks = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/projects", label: "پروژه‌ها", icon: FolderKanban },
  { href: "/admin/blog", label: "وبلاگ", icon: FileText },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
]

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-[220px_1fr] gap-12">
        <aside className="hidden md:flex flex-col gap-2">
          <nav className="flex flex-col gap-1">
            {adminNavLinks.map((link) => (
              <Button
                key={link.href}
                variant={isActive(link.href) ? "secondary" : "ghost"}
                asChild
                className="justify-start"
              >
                <Link href={link.href}>
                  <link.icon className="ml-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
