import Link from "next/link"
import { getBlogPosts } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const publishedPosts = blogPosts.filter(p => p.status === 'published');

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">وبلاگ من</h1>
        <p className="mt-2 text-lg text-muted-foreground">نوشته‌هایی در مورد تکنولوژی، طراحی و توسعه.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {publishedPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors text-right">{post.title_fa}</CardTitle>
                <CardDescription className="text-right">
                  {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-right">{post.description_fa}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  ادامه مطلب <ArrowLeft className="mr-1 h-4 w-4" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
