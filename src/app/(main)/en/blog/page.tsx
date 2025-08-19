import Link from "next/link"
import { getBlogPosts } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">My Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Thoughts on technology, design, and development.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        {blogPosts.map((post) => (
          <Link href={`/en/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
