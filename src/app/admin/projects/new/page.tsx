import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function NewProjectPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
        <form className="grid gap-6">
            <div className="grid auto-rows-max items-start gap-4 lg:grid-cols-2 lg:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>جزئیات پروژه</CardTitle>
                    <CardDescription>
                        اطلاعات پروژه جدید خود را اینجا وارد کنید.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-3">
                             <div className="grid gap-3">
                                <Label htmlFor="title_fa">عنوان (فارسی)</Label>
                                <Input id="title_fa" type="text" placeholder="مثلا: پلتفرم فروشگاهی" />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="title">عنوان (انگلیسی)</Label>
                                <Input id="title" type="text" placeholder="e.g., E-commerce Platform" />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="slug">اسلاگ (Slug)</Label>
                            <Input
                            id="slug"
                            type="text"
                            className="w-full"
                            placeholder="مثلا: ai-ecommerce-platform"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="description_fa">توضیحات (فارسی)</Label>
                                <Textarea
                                id="description_fa"
                                placeholder="توضیح کوتاهی در مورد پروژه به فارسی بنویسید."
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">توضیحات (انگلیسی)</Label>
                                <Textarea
                                id="description"
                                placeholder="Write a short description in English."
                                />
                            </div>
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="tags">تگ‌ها (جدا شده با ویرگول)</Label>
                            <Input
                            id="tags"
                            type="text"
                            className="w-full"
                            placeholder="مثلا: Next.js, React, AI"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                             <div className="grid gap-3">
                                <Label htmlFor="github_link">لینک گیت‌هاب</Label>
                                <Input id="github_link" type="url" placeholder="https://github.com/..." />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="live_link">لینک نسخه زنده</Label>
                                <Input id="live_link" type="url" placeholder="https://example.com" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>تصویر پروژه</CardTitle>
                      <CardDescription>
                        یک تصویر برای کاور پروژه خود آپلود کنید.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                           <div
                            className="flex w-full h-48 items-center justify-center rounded-md border-2 border-dashed"
                            >
                            <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    برای آپلود کلیک کنید یا فایل را بکشید و رها کنید
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    لغو
                </Button>
                <Button size="sm">ذخیره پروژه</Button>
            </div>
             <div className="hidden items-center justify-center gap-2 md:flex">
                <Button variant="outline">
                    لغو
                </Button>
                <Button>ذخیره پروژه</Button>
            </div>
        </form>
    </div>
  )
}
