import { notFound } from 'next/navigation';
import { getProjects } from '@/lib/actions';
import { ProjectForm } from '@/components/admin/project-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function EditProjectPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ویرایش پروژه</CardTitle>
        <CardDescription>فرم زیر را برای ویرایش پروژه «{project.title_fa}» پر کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm project={project} />
      </CardContent>
    </Card>
  );
}
