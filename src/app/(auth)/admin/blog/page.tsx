import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { getBlogPosts } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteBlogPost } from "@/lib/actions"

export default async function AdminBlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">پست‌های وبلاگ</h1>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="ml-2 h-4 w-4" />
            افزودن پست جدید
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>لیست پست‌ها</CardTitle>
          <CardDescription>
            در اینجا می‌توانید پست‌های وبلاگ خود را مدیریت کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان</TableHead>
                <TableHead className="hidden md:table-cell">تاریخ</TableHead>
                <TableHead className="hidden md:table-cell">تگ‌ها</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(post.date).toLocaleDateString('fa-IR')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/blog/edit/${post.slug}`}>ویرایش</Link>
                       </Button>
                       <DeleteButton itemType="پست وبلاگ" itemName={post.title} deleteAction={async () => { "use server"; await deleteBlogPost(post.slug)}} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
