import Link from "next/link"
import { getBlogPosts } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const publishedPosts = blogPosts.filter(p => p.status === 'published');
  
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">My Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Thoughts on technology, design, and development.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedPosts.map((post) => (
          <Link href={`/en/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
               <CardHeader className="p-0">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={post.featured_image} 
                      alt={post.title} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint="post illustration"
                      />
                  </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                 <p className="text-sm text-muted-foreground mb-2">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-3">{post.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0,3).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
