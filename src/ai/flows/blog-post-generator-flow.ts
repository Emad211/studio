
'use server';
/**
 * @fileOverview An AI agent that generates a full blog post from a given context.
 *
 * - generateBlogPost - A function that handles the blog post generation process.
 * - BlogPostGeneratorInput - The input type for the generateBlogPost function.
 * - BlogPostGeneratorOutput - The return type for the generateBlogPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BlogPostGeneratorInputSchema = z.object({
  context: z.string().describe('The main topic or a brief outline for the blog post.'),
  title: z.string().describe('The desired title for the blog post.'),
});
export type BlogPostGeneratorInput = z.infer<typeof BlogPostGeneratorInputSchema>;

const BlogPostGeneratorOutputSchema = z.object({
  content_fa: z.string().describe("The full blog post content in Persian, formatted in rich Markdown. It should include headings, lists, code blocks, etc. where appropriate."),
  content: z.string().describe("The full blog post content in English, formatted in rich Markdown. It should include headings, lists, code blocks, etc. where appropriate."),
  tags: z.array(z.string()).describe("An array of 3 to 5 relevant tags for the blog post."),
  meta_description_fa: z.string().describe("A concise, SEO-friendly meta description for the blog post in Persian (around 155 characters)."),
  meta_description_en: z.string().describe("A concise, SEO-friendly meta description for the blog post in English (around 155 characters)."),
});
export type BlogPostGeneratorOutput = z.infer<typeof BlogPostGeneratorOutputSchema>;

export async function generateBlogPost(input: BlogPostGeneratorInput): Promise<BlogPostGeneratorOutput> {
  const result = await blogPostGeneratorFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'blogPostGeneratorPrompt',
  input: { schema: BlogPostGeneratorInputSchema },
  output: { schema: BlogPostGeneratorOutputSchema },
  prompt: `You are an expert AI developer and a skilled technical writer. Your task is to generate a comprehensive and engaging blog post based on a given context. You must generate the content in both Persian and English.

The blog post should be well-structured, insightful, and formatted using rich Markdown. Use headings (##, ###), lists (bulleted or numbered), bold/italic text, and code blocks (\`\`\`) where appropriate to make the content readable and engaging.

You also need to provide SEO-friendly metadata for the post.

Context from the user:
"{{{context}}}"

Title for the post:
"{{{title}}}"

Based on the context and title, generate the following:
1.  **Persian Content (\`content_fa\`):** The full blog post in Persian.
2.  **English Content (\`content\`):** The full blog post in English.
3.  **Tags (\`tags\`):** A list of 3-5 relevant technical tags (e.g., 'Deep Learning', 'Next.js').
4.  **Persian Meta Description (\`meta_description_fa\`):** An SEO-optimized summary in Persian, about 155 characters.
5.  **English Meta Description (\`meta_description_en\`):** An SEO-optimized summary in English, about 155 characters.

Ensure the tone is professional yet accessible. The content should be technically accurate and provide real value to the reader.
`,
});

const blogPostGeneratorFlow = ai.defineFlow(
  {
    name: 'blogPostGeneratorFlow',
    inputSchema: BlogPostGeneratorInputSchema,
    outputSchema: BlogPostGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
