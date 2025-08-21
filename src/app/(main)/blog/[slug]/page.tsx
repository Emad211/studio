
import { notFound } from 'next/navigation';
import { getBlogPosts, getSiteSettings } from '@/lib/actions';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { calculateReadingTime } from '@/lib/reading-time';
import { Clock } from 'lucide-react';
import { SocialShare } from '@/components/ui/social-share';
import { MarkdownContent } from '@/components/ui/markdown-content';

type BlogPostPageProps = {
    params: { slug: string };
};

export async function generateStaticParams() {
    const blogPosts = await getBlogPosts();
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find(p => p.slug === slug);
  const settings = await getSiteSettings();

  if (!post) {
    return {};
  }

  const title = post.meta_title_fa || `${post.title_fa} | ${settings.fa.siteName}`;
  const description = post.meta_description_fa || post.description_fa;
  const url = `${settings.seo.siteURL}/blog/${slug}`;
  const ogImage = post.og_image || post.featured_image || settings.seo.ogImage;

  return {
    title: title,
    description: description,
    openGraph: {
        title: title,
        description: description,
        type: 'article',
        url: url,
        images: ogImage ? [ogImage] : [],
        authors: [settings.fa.authorName],
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        creator: settings.seo.twitterUsername ? `@${settings.seo.twitterUsername}` : undefined,
        images: ogImage ? [ogImage] : [],
    },
  };
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
    const blogPosts = await getBlogPosts();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post || post.status === 'draft') {
        notFound();
    }
    
    const readingTime = calculateReadingTime(post.content_fa);
    const settings = await getSiteSettings();
    const shareUrl = `${settings.seo.siteURL}/blog/${slug}`;

    return (
        <div className="flex flex-col min-h-screen">
            <ReadingProgress />
            <div className="container py-12 md:py-20 flex-grow">
                <article className="max-w-3xl mx-auto">
                     <div className="mb-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{post.title_fa}</h1>
                         <div className="mt-4 text-muted-foreground flex items-center justify-center gap-x-4 gap-y-2 flex-wrap">
                            <span>
                                منتشر شده در {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className='flex items-center gap-1.5'>
                                <Clock className="w-4 h-4" />
                                <span>زمان مطالعه: {readingTime} دقیقه</span>
                            </span>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2 justify-center">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    {post.featured_image && (
                        <div className="relative aspect-video mb-12 rounded-lg overflow-hidden border">
                            <Image 
                                src={post.featured_image} 
                                alt={post.title_fa} 
                                fill 
                                className="object-cover"
                                data-ai-hint="post illustration"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg max-w-none mx-auto text-right">
                       <MarkdownContent content={post.content_fa} />
                    </div>

                    <div className="mt-16">
                        <SocialShare url={shareUrl} title={post.title_fa} lang="fa" />
                    </div>
                </article>
            </div>
        </div>
    );
}
