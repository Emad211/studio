import Link from "next/link"
import { blogPosts } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container py-12" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">وبلاگ من</h1>
        <p className="mt-2 text-lg text-muted-foreground">نوشته‌هایی در مورد تکنولوژی، طراحی و توسعه.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {blogPosts.map((post) => (
          <Link href={`/fa/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  ادامه مطلب <ArrowLeft className="mr-1 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
