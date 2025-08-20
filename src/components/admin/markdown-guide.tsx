
"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CodeBlock } from "../ui/code-block"
import { BookText } from "lucide-react"

const markdownExamples = {
    headings: `# Heading 1\n## Heading 2\n### Heading 3`,
    textStyles: `*Italic Text*\n**Bold Text**\n***Bold & Italic***\n~~Strikethrough~~`,
    lists: `**Unordered List**\n* Item 1\n* Item 2\n  * Nested Item 2.1\n\n**Ordered List**\n1. First Item\n2. Second Item`,
    linksAndImages: `**Link**\n[Visit My Website](https://example.com)\n\n**Image**\n![alt text for image](https://placehold.co/300x150.png)`,
    blockquotes: `> This is a blockquote. It's great for highlighting a quote or a note.`,
    code: "```python\n@ai.defineFlow()\ndef my_flow(input):\n  print(input)\n```",
    table: `| Header 1 | Header 2 | Header 3 |\n|:---------|:--------:|---------:|\n| Align L  | Center   | Align R  |\n| Cell 1   | Cell 2   | Cell 3   |`
}

export function MarkdownGuide() {
    return (
        <div className="rounded-lg border bg-card/50 p-4" dir="rtl">
             <h3 className="flex items-center gap-2 font-semibold text-primary">
                <BookText className="w-5 h-5" />
                <span>راهنمای سریع Markdown</span>
             </h3>
             <p className="text-sm text-muted-foreground mt-2">
                از سینتکس مارک‌داون برای قالب‌بندی متن‌های خود استفاده کنید. در زیر چند مثال پرکاربرد آورده شده است.
             </p>
            <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="item-1">
                    <AccordionTrigger>عناوین (Headings)</AccordionTrigger>
                    <AccordionContent>
                        <CodeBlock code={markdownExamples.headings} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>استایل‌های متن</AccordionTrigger>
                    <AccordionContent>
                        <CodeBlock code={markdownExamples.textStyles} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>لیست‌ها</AccordionTrigger>
                    <AccordionContent>
                        <CodeBlock code={markdownExamples.lists} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>لینک و تصویر</AccordionTrigger>
                    <AccordionContent>
                         <CodeBlock code={markdownExamples.linksAndImages} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>نقل قول</AccordionTrigger>
                    <AccordionContent>
                        <CodeBlock code={markdownExamples.blockquotes} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-6">
                    <AccordionTrigger>بلوک کد</AccordionTrigger>
                    <AccordionContent>
                         <CodeBlock code={markdownExamples.code} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger>جدول</AccordionTrigger>
                    <AccordionContent>
                         <CodeBlock code={markdownExamples.table} language="markdown" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
