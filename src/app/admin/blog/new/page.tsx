import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewBlogPage() {
  return (
      <div className="grid flex-1 items-start gap-4 md:gap-8">
          <form className="grid gap-6">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                  <CardHeader>
                      <CardTitle>جزئیات پست</CardTitle>
                      <CardDescription>
                          اطلاعات پست وبلاگ جدید خود را اینجا وارد کنید.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="grid gap-6">
                          <div className="grid gap-3">
                              <Label htmlFor="title">عنوان</Label>
                              <Input
                              id="title"
                              type="text"
                              className="w-full"
                              placeholder="مثلا: تسلط بر یادگیری عمیق"
                              />
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="slug">اسلاگ (Slug)</Label>
                              <Input
                              id="slug"
                              type="text"
                              className="w-full"
                              placeholder="مثلا: mastering-deep-learning"
                              />
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="description">توضیحات کوتاه</Label>
                              <Textarea
                              id="description"
                              placeholder="یک توضیح کوتاه برای نمایش در لیست پست‌ها وارد کنید."
                              />
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="tags">تگ‌ها (جدا شده با ویرگول)</Label>
                              <Input
                              id="tags"
                              type="text"
                              className="w-full"
                              placeholder="مثلا: AI, Python, Deep Learning"
                              />
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="content">محتوای اصلی (Markdown)</Label>
                              <Textarea
                              id="content"
                              placeholder="محتوای کامل پست را اینجا با فرمت مارک‌داون بنویسید."
                              className="min-h-64"
                              />
                          </div>
                      </div>
                  </CardContent>
              </Card>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                      لغو
                  </Button>
                  <Button size="sm">ذخیره پست</Button>
              </div>
              <div className="hidden items-center justify-center gap-2 md:flex">
                  <Button variant="outline">
                      لغو
                  </Button>
                  <Button>ذخیره پست</Button>
              </div>
          </form>
      </div>
  )
}
