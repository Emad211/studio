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
import { blogPosts } from "@/lib/data"
import { PlusCircle, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminBlogPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>پست‌های وبلاگ</CardTitle>
          <CardDescription>
            مدیریت پست‌های وبلاگ شما.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="gap-1">
          <Link href="/admin/blog/new">
            <PlusCircle className="h-4 w-4" />
            افزودن پست
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead className="hidden md:table-cell">اسلاگ</TableHead>
              <TableHead className="hidden md:table-cell">تگ‌ها</TableHead>
              <TableHead className="hidden md:table-cell">تاریخ</TableHead>
              <TableHead>
                <span className="sr-only">عملیات</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="hidden md:table-cell">{post.slug}</TableCell>
                <TableCell className="hidden md:table-cell">
                   <div className="flex gap-1">
                     {post.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                   </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {new Date(post.date).toLocaleDateString('fa-IR')}
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
  )
}
