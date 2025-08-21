
"use client"

import Link from "next/link"
import { getBlogPosts } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { BlogPost } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
    },
  }),
};

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col h-full overflow-hidden border rounded-lg">
          <Skeleton className="aspect-video w-full" />
          <div className="p-6 flex-grow">
            <Skeleton className="h-4 w-2/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="p-6 pt-0 mt-auto">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const blogPosts = await getBlogPosts();
        const publishedPosts = blogPosts.filter(p => p.status === 'published');
        setPosts(publishedPosts);
      } catch (error) {
        console.error("Failed to fetch blog posts", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [])


  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">وبلاگ من</h1>
        <p className="mt-2 text-lg text-muted-foreground">نوشته‌هایی در مورد تکنولوژی، طراحی و توسعه.</p>
      </div>

      {isLoading ? (
        <BlogSkeleton />
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, i) => (
            <motion.div key={post.slug} variants={FADE_UP_ANIMATION_VARIANTS} custom={i}>
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title_fa}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint="post illustration"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <p className="text-sm text-muted-foreground mb-2 text-right">
                      {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors text-right mb-2">{post.title_fa}</CardTitle>
                    <p className="text-muted-foreground text-sm text-right line-clamp-3">{post.description_fa}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
