
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/ui/code-block';
import Image from 'next/image';

export function MarkdownContent({ content }: { content: string }) {
    return (
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
                            alt={props.alt || "Image from content"} 
                            fill 
                            className="object-contain" 
                            data-ai-hint="illustration"
                        />
                    </div>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
