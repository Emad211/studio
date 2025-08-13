import { ProjectForm } from "@/components/admin/project-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد پروژه جدید</CardTitle>
        <CardDescription>فرم زیر را برای ایجاد یک پروژه جدید پر کنید.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm />
      </CardContent>
    </Card>
  );
}
