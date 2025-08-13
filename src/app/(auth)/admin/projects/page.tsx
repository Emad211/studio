import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { getProjects } from "@/lib/actions"
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
import { deleteProject } from "@/lib/actions"
import Image from "next/image"

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="grid flex-1 items-start gap-4">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">پروژه‌ها</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <PlusCircle className="ml-2 h-4 w-4" />
            افزودن پروژه جدید
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>لیست پروژه‌ها</CardTitle>
          <CardDescription>
            در اینجا می‌توانید پروژه‌های خود را مدیریت کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead className="hidden md:table-cell">تگ‌ها</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
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
                   <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/projects/edit/${project.slug}`}>ویرایش</Link>
                       </Button>
                       <DeleteButton itemType="پروژه" itemName={project.title_fa} deleteAction={async () => { "use server"; await deleteProject(project.slug)}} />
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
