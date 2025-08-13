import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات عمومی</CardTitle>
          <CardDescription>تنظیمات کلی سایت خود را در اینجا مدیریت کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">نام سایت</Label>
              <Input id="site-name" defaultValue="CodeCanvas Portfolio" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="admin-email">ایمیل ادمین</Label>
              <Input id="admin-email" type="email" defaultValue="admin@example.com" />
            </div>
            <Button type="submit">ذخیره تغییرات</Button>
          </form>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>تنظیمات SEO</CardTitle>
          <CardDescription>تنظیمات پیش‌فرض SEO را برای سایت خود مدیریت کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="meta-title">عنوان متا پیش‌فرض</Label>
              <Input id="meta-title" defaultValue="CodeCanvas Portfolio | A modern portfolio for developers" />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="meta-description">توضیحات متا پیش‌فرض</Label>
              <Input id="meta-description" defaultValue="Showcase your projects and skills with this modern, AI-powered portfolio website." />
            </div>
            <Button type="submit">ذخیره تغییرات</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
