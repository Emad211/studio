
import { notFound } from 'next/navigation';
import { getBlogPosts, getSiteSettings } from '@/lib/actions';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';
import type { Metadata } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const ogImage = post.og_image || settings.seo.ogImage;

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

    return (
        <div className="flex flex-col min-h-screen">
            <ReadingProgress />
            <div className="container py-12 md:py-20 flex-grow">
                <article className="max-w-3xl mx-auto">
                     <div className="mb-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{post.title_fa}</h1>
                        <p className="mt-4 text-muted-foreground">
                            منتشر شده در {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
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
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({node, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        <div dir="ltr"><CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} /></div>
                                    ) : (
                                        <code className='font-code bg-muted text-primary rounded px-1.5 py-1' {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                img: ({ node, ...props }) => (
                                    <div className="relative my-6 aspect-video rounded-lg overflow-hidden border">
                                        <Image 
                                            src={props.src || ""} 
                                            alt={props.alt || "Image from blog post"} 
                                            fill 
                                            className="object-contain" 
                                        />
                                    </div>
                                ),
                            }}
                        >
                            {post.content_fa}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
}
