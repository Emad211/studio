
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getBlogPosts } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBlogPost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { BlogSearch } from "@/components/admin/blog-search";
import { Pagination } from "@/components/ui/pagination-controls"; // Assuming a generic pagination component

const ITEMS_PER_PAGE = 10;

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // We will modify getBlogPosts to accept query and pagination params
  const { posts, totalPages } = await getBlogPosts({
    query,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">پست‌های وبلاگ</h1>
          <p className="text-muted-foreground">
            پست‌های خود را جستجو، مشاهده و مدیریت کنید.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <PlusCircle className="ml-2 h-4 w-4" />
            افزودن پست جدید
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
             <div>
                <CardTitle>لیست پست‌ها</CardTitle>
                <CardDescription>
                    در اینجا می‌توانید پست‌های وبلاگ خود را مدیریت کنید.
                </CardDescription>
             </div>
             <div className="w-full max-w-sm">
                <BlogSearch placeholder="جستجو بر اساس عنوان..." />
             </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان (فارسی)</TableHead>
                <TableHead className="hidden md:table-cell">وضعیت</TableHead>
                <TableHead className="hidden md:table-cell">تاریخ</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post.slug}>
                    <TableCell className="font-medium">{post.title_fa}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className={cn(
                          post.status === "published"
                            ? "border-green-500 text-green-500"
                            : "border-yellow-500 text-yellow-500"
                        )}
                      >
                        {post.status === "published"
                          ? "منتشر شده"
                          : "پیش‌نویس"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(post.date).toLocaleDateString("fa-IR")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/blog/edit/${post.slug}`}>
                            ویرایش
                          </Link>
                        </Button>
                        <DeleteButton
                          itemType="پست وبلاگ"
                          itemName={post.title_fa}
                          deleteAction={async () => {
                            "use server";
                            await deleteBlogPost(post.slug);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    هیچ پستی یافت نشد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
