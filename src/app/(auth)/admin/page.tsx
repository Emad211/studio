import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentProjects } from "@/components/admin/recent-projects"
import { StatsCard } from "@/components/admin/stats-card"
import { FolderKanban, FileText, Wrench } from "lucide-react"
import { getProjects, getBlogPosts } from "@/lib/actions"
import { skillCategories } from "@/lib/data"

export default async function AdminDashboardPage() {
  const projects = await getProjects();
  const blogPosts = await getBlogPosts();
  const totalSkills = skillCategories.reduce((acc, category) => acc + category.skills.length, 0);

  return (
      <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatsCard 
                title="تعداد پروژه‌ها" 
                value={projects.length.toString()}
                change="پروژه فعال"
                icon={FolderKanban}
              />
              <StatsCard 
                title="تعداد پست‌ها" 
                value={blogPosts.length.toString()}
                change="پست منتشر شده"
                icon={FileText}
              />
              <StatsCard 
                title="تعداد مهارت‌ها" 
                value={totalSkills.toString()}
                change="مهارت ثبت شده"
                icon={Wrench}
              />
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>پروژه‌های اخیر</CardTitle>
                  <CardDescription>
                      ۵ پروژه اخیری که به سایت اضافه کرده‌اید.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <RecentProjects projects={projects.slice(0, 5)} />
              </CardContent>
          </Card>
      </div>
  )
}
