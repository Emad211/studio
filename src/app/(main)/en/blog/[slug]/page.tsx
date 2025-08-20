import { notFound } from 'next/navigation';
import { getBlogPosts, getSiteSettings } from '@/lib/actions';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { Badge } from '@/components/ui/badge';
import React, { createElement } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { CodeBlock } from '@/components/ui/code-block';
import type { Metadata } from 'next';
import Image from 'next/image';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

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

  const title = post.meta_title_en || `${post.title} | ${settings.en.siteName}`;
  const description = post.meta_description_en || post.description;
  const url = `${settings.seo.siteURL}/en/blog/${slug}`;
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
        authors: [settings.en.authorName],
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

const renderContent = (markdown: string) => {
    const headings: { id: string; level: number; text: string }[] = [];
    
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeReact, {
            createElement,
            Fragment,
            jsx,
            jsxs,
            components: {
                h1: (props: any) => {
                    const text = props.children[0];
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    headings.push({ id, level: 1, text });
                    return <h1 id={id} className='font-headline scroll-mt-20' {...props} />;
                },
                h2: (props: any) => {
                    const text = props.children[0];
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    headings.push({ id, level: 2, text });
                    return <h2 id={id} className='font-headline scroll-mt-20' {...props} />;
                },
                h3: (props: any) => {
                    const text = props.children[0];
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    headings.push({ id, level: 3, text });
                    return <h3 id={id} className='font-headline scroll-mt-20' {...props} />;
                },
                h4: (props: any) => {
                    const text = props.children[0];
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    headings.push({ id, level: 4, text });
                    return <h4 id={id} className='font-headline scroll-mt-20' {...props} />;
                },
                h5: (props: any) => {
                    const text = props.children[0];
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    headings.push({ id, level: 5, text });
                    return <h5 id={id} className='font-headline scroll-mt-20' {...props} />;
                },
                h6: (props: any) => {
                    const text = props.children[0];
                    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    headings.push({ id, level: 6, text });
                    return <h6 id={id} className='font-headline scroll-mt-20' {...props} />;
                },
                code: (props: any) => {
                    if (props.className) {
                        const language = props.className.replace('language-', '');
                        return <CodeBlock code={props.children} language={language} />;
                    }
                    return <code {...props} />;
                },
                pre: (props: any) => <div {...props} />, // Prevent nested <pre>
            },
        });

    const content = processor.processSync(markdown).result;
    return { headings, content };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
    const blogPosts = await getBlogPosts();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post || post.status === 'draft') {
        notFound();
    }

    const { headings, content } = renderContent(post.content);

    return (
        <>
            <ReadingProgress />
            <div className="container py-12 md:py-20">
                <div className="grid lg:grid-cols-4 gap-8 md:gap-12">
                    <article className="lg:col-span-3">
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary">{post.title}</h1>
                            <p className="mt-2 text-muted-foreground">
                                Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </div>

                        {post.featured_image && (
                            <div className="relative aspect-video mb-12 rounded-lg overflow-hidden border">
                                <Image 
                                    src={post.featured_image} 
                                    alt={post.title} 
                                    fill 
                                    className="object-cover"
                                    data-ai-hint="post illustration"
                                />
                            </div>
                        )}

                        <div className="prose prose-invert prose-lg max-w-none">
                            {content}
                        </div>
                    </article>

                    <aside className="hidden lg:block lg:col-span-1 relative">
                        <TableOfContents headings={headings} />
                    </aside>
                </div>
            </div>
        </>
    );
}
