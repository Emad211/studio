import Link from 'next/link'
import {
  FileText,
  FolderKanban,
  LayoutDashboard,
  PanelLeft,
  Settings,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const adminNavLinks = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'پروژه‌ها', icon: FolderKanban },
  { href: '/admin/blog', label: 'وبلاگ', icon: FileText },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const navContent = (
    <nav className="grid items-start gap-2 px-4 text-sm font-medium">
      {adminNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            // Simple active state for now
            // isActive(link.href) && 'bg-muted text-primary'
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 right-0 z-10 hidden w-60 flex-col border-l bg-background sm:flex">
          <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6" />
              <span>پنل مدیریت</span>
          </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
              {navContent}
          </div>
      </aside>
      <div className="flex flex-col sm:pr-60">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
              <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
              </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-xs">
              <div className="flex h-[60px] items-center px-6">
                  <Link href="/admin" className="flex items-center gap-2 font-semibold">
                      <LayoutDashboard className="h-6 w-6" />
                      <span>پنل مدیریت</span>
                  </Link>
              </div>
              <div className="mt-2">
                  {navContent}
              </div>
              </SheetContent>
          </Sheet>
          <div className="flex-1"></div>
          <Button asChild variant="outline" size="icon">
              <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">بازگشت به سایت</span>
              </Link>
          </Button>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
