import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { projects, blogPosts } from "@/lib/data"
import { FolderKanban, FileText, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-headline">پروژه‌ها</CardTitle>
                <FolderKanban className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">پروژه در حال حاضر موجود است</p>
            </CardContent>
            <CardContent>
              <Button asChild size="sm">
                  <Link href="/admin/projects/new">
                      <PlusCircle className="ml-2 h-4 w-4" />
                      افزودن پروژه جدید
                  </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-headline">پست‌های وبلاگ</CardTitle>
                  <FileText className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{blogPosts.length}</div>
              <p className="text-xs text-muted-foreground">پست وبلاگ در حال حاضر موجود است</p>
            </CardContent>
            <CardContent>
              <Button asChild size="sm">
                  <Link href="/admin/blog/new">
                      <PlusCircle className="ml-2 h-4 w-4" />
                      افزودن پست جدید
                  </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold font-headline mb-4">دسترسی سریع</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <Card className="hover:bg-accent transition-colors">
                  <Link href="/admin/projects" className="block p-6">
                      <h4 className="font-semibold">مدیریت پروژه‌ها</h4>
                      <p className="text-sm text-muted-foreground mt-1">ویرایش یا حذف پروژه‌های موجود</p>
                  </Link>
              </Card>
              <Card className="hover:bg-accent transition-colors">
                  <Link href="/admin/blog" className="block p-6">
                      <h4 className="font-semibold">مدیریت وبلاگ</h4>
                      <p className="text-sm text-muted-foreground mt-1">ویرایش یا حذف پست‌های وبلاگ</p>
                  </Link>
              </Card>
              <Card className="hover:bg-accent transition-colors">
                  <Link href="/admin/settings" className="block p-6">
                      <h4 className="font-semibold">تنظیمات سایت</h4>
                      <p className="text-sm text-muted-foreground mt-1">مدیریت تنظیمات کلی سایت</p>
                  </Link>
              </Card>
          </div>
        </div>
      </div>
  )
}
