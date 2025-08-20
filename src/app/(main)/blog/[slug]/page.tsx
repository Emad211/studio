
import { notFound } from 'next/navigation';
import { getBlogPosts, getSiteSettings } from '@/lib/actions';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';
import type { Metadata } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { List } from 'lucide-react';

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

// Function to extract headings for TOC
const extractHeadings = (markdown: string) => {
    const headings: { id: string; level: number; text: string }[] = [];
    const lines = markdown.split('\n');
    lines.forEach((line, index) => {
        const match = line.match(/^(#+)\s+(.*)/);
        if (match) {
            const level = match[1].length;
            const text = match[2];
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + '-' + index;
            headings.push({ id, level, text });
        }
    });
    return headings;
};


export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
    const blogPosts = await getBlogPosts();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post || post.status === 'draft') {
        notFound();
    }

    const headings = extractHeadings(post.content_fa);

    return (
        <>
            <ReadingProgress />
            <div className="container py-12 md:py-20">
                <div className="grid lg:grid-cols-4 gap-12">
                    <aside className="hidden lg:block lg:col-span-1 relative order-last lg:order-first">
                        <TableOfContents headings={headings} />
                    </aside>
                    <article className="lg:col-span-3">
                         <div className="mb-8 text-right">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{post.title_fa}</h1>
                            <p className="mt-2 text-muted-foreground">
                                منتشر شده در {new Date(post.date).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-end">
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
                                />
                            </div>
                        )}

                        <div className="lg:hidden mb-8">
                             <Accordion type="single" collapsible>
                                <AccordionItem value="toc">
                                    <AccordionTrigger className="text-lg font-headline">
                                        <div className='flex items-center gap-2'>
                                            <List className="h-5 w-5" />
                                            فهرست مطالب
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <TableOfContents headings={headings} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-right">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({node, ...props}) => {
                                        const text = props.children?.toString() || '';
                                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        return <h1 id={id} className='font-headline scroll-mt-20' {...props} />;
                                    },
                                    h2: ({node, ...props}) => {
                                        const text = props.children?.toString() || '';
                                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        return <h2 id={id} className='font-headline scroll-mt-20' {...props} />;
                                    },
                                    h3: ({node, ...props}) => {
                                        const text = props.children?.toString() || '';
                                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        return <h3 id={id} className='font-headline scroll-mt-20' {...props} />;
                                    },
                                    h4: ({node, ...props}) => {
                                        const text = props.children?.toString() || '';
                                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        return <h4 id={id} className='font-headline scroll-mt-20' {...props} />;
                                    },
                                    h5: ({node, ...props}) => {
                                        const text = props.children?.toString() || '';
                                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        return <h5 id={id} className='font-headline scroll-mt-20' {...props} />;
                                    },
                                    h6: ({node, ...props}) => {
                                        const text = props.children?.toString() || '';
                                        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        return <h6 id={id} className='font-headline scroll-mt-20' {...props} />;
                                    },
                                    code({node, className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return match ? (
                                            <div dir="ltr"><CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} /></div>
                                        ) : (
                                            <code className='font-code bg-muted text-primary rounded px-1.5 py-1' {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {post.content_fa}
                            </ReactMarkdown>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
