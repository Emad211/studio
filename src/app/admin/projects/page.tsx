import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { projects } from "@/lib/data"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AdminPageLayout from "@/components/layout/admin-page-layout"

export default function AdminProjectsPage() {
  return (
    <AdminPageLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>پروژه‌ها</CardTitle>
            <CardDescription>
              مدیریت پروژه‌های شما.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="gap-1">
            <Link href="/admin/projects/new">
              <PlusCircle className="h-4 w-4" />
              افزودن پروژه
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead className="hidden md:table-cell">اسلاگ</TableHead>
                <TableHead className="hidden md:table-cell">تگ‌ها</TableHead>
                <TableHead>
                  <span className="sr-only">عملیات</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.slug}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={project.title_fa}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={project.image}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title_fa}</TableCell>
                  <TableCell className="hidden md:table-cell">{project.slug}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu dir="rtl">
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                        <DropdownMenuItem>ویرایش</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">حذف</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminPageLayout>
  )
}
