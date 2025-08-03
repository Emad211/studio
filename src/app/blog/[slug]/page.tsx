import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { CodeBlock } from '@/components/ui/code-block';

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

const parseMarkdown = (markdown: string) => {
    const headings: { id: string; level: number; text: string }[] = [];
    const content = [];

    const lines = markdown.trim().split('\n');
    let inCodeBlock = false;
    let codeBlockContent = '';
    let codeBlockLang = '';

    for (const line of lines) {
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                content.push(<CodeBlock key={content.length} code={codeBlockContent.trim()} language={codeBlockLang} />);
                inCodeBlock = false;
                codeBlockContent = '';
                codeBlockLang = '';
            } else {
                inCodeBlock = true;
                codeBlockLang = line.substring(3);
            }
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent += line + '\n';
            continue;
        }

        const headingMatch = line.match(/^(#+)\s(.*)/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const text = headingMatch[2];
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            headings.push({ id, level, text });
            content.push(React.createElement(`h${level}`, { key: id, id, className: 'font-headline scroll-mt-20' }, text));
        } else if (line.trim() !== '') {
            content.push(<p key={content.length}>{line}</p>);
        }
    }

    return { headings, content: <>{content}</> };
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    const { headings, content } = parseMarkdown(post.content);

    return (
        <>
            <ReadingProgress />
            <div className="container py-12 md:py-20">
                <div className="grid lg:grid-cols-4 gap-12">
                    <article className="lg:col-span-3">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{post.title}</h1>
                            <p className="mt-2 text-muted-foreground">
                                Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            {content}
                        </div>
                    </article>

                    <aside className="lg:col-span-1 relative">
                        <TableOfContents headings={headings} />
                    </aside>
                </div>
            </div>
        </>
    );
}
