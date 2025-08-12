"use client"
import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { LayoutDashboard, LogOut, UserCircle, FolderKanban, FileText, Settings } from "lucide-react"
import { Logo } from "@/components/logo"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const adminNavLinks = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/projects", label: "پروژه‌ها", icon: FolderKanban },
  { href: "/admin/blog", label: "وبلاگ", icon: FileText },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pageTitle = adminNavLinks.find(link => pathname.startsWith(link.href) && (link.href.length > 5 || link.href === pathname))?.label || "داشبورد"

  const getHeaderTitle = () => {
    if (pathname === '/admin/projects/new') return 'افزودن پروژه جدید';
    if (pathname === '/admin/blog/new') return 'افزودن پست جدید';
    return pageTitle;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold font-headline text-lg">پنل ادمین</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} className="w-full">
                  <SidebarMenuButton isActive={pathname.startsWith(link.href) && (link.href.length > 5 || link.href === pathname)} tooltip={link.label}>
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton tooltip="پروفایل">
                <UserCircle />
                <span>عماد کریمی</span>
               </SidebarMenuButton>
             </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton tooltip="خروج">
                <LogOut />
                <span>خروج</span>
               </SidebarMenuButton>
             </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
           <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-lg font-semibold font-headline">{getHeaderTitle()}</h1>
           </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
