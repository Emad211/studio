
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
  context: z.string().describe('The full source document, article, or documentation to be used as context for generating the blog post.'),
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
  prompt: `You are an expert AI developer, technical writer, and science communicator. Your task is to act as a high-level Retrieval-Augmented Generation (RAG) system. You will be given a full, potentially complex, source document (like a research paper) as context.

Your goal is to transform this dense source material into a long-form, comprehensive, and engaging blog post. You must not simply summarize; you need to explain, analyze, and re-contextualize the information for a technically-savvy blog audience. The final post must be well-structured, insightful, and formatted using rich Markdown.

**Source Context Document:**
"""
{{{context}}}
"""

**Title for the post:**
"{{{title}}}"

**Instructions for Generating the Blog Post:**

Based *only* on the provided context and title, generate a detailed blog post that follows this structure:

1.  **Introduction:**
    *   Start with a captivating hook related to the topic.
    *   Briefly introduce the problem or area the source document addresses.
    *   State the main contribution or solution presented in the document (e.g., the "TradingAgents" framework).
    *   Mention what the reader will learn from this post.

2.  **The Problem/Challenge:**
    *   Explain in detail the challenges or limitations of existing approaches that the source document identifies. (e.g., "Lack of Realistic Organizational Modeling" and "Inefficient Communication Interfaces").

3.  **The Proposed Solution:**
    *   Introduce the core solution from the document in detail.
    *   Explain its key features and how it works. (e.g., Describe the different agent roles like Analyst, Researcher, Trader, and Risk Manager).
    *   Describe the architecture or workflow of the solution (e.g., "Communication Protocol", "Backbone LLMs").

4.  **Experiments and Results Analysis:**
    *   Present the key findings from the experiments section of the document.
    *   Analyze any tables or figures. For instance, if there's a results table, explain what the metrics (like CR, SR, MDD) mean and what the results show.
    *   Compare the performance of the proposed solution against the baselines mentioned in the text.

5.  **Conclusion and Significance:**
    *   Summarize the main takeaways from the document.
    *   Discuss the overall significance and potential impact of this work.
    *   Provide a strong concluding thought.

**Formatting and Tone:**
*   Use rich Markdown: Headings (##, ###), lists (bulleted or numbered), **bold**/_italic_ text, and code blocks (\`\`\`) where appropriate.
*   The tone should be professional, authoritative, yet accessible and engaging for a blog format.
*   The output must be substantial and detailed. Do not provide a short summary.

**Required Outputs:**

Now, generate the following JSON object:
*   **content_fa:** The full, detailed blog post in Persian, following all instructions above.
*   **content:** The full, detailed blog post in English, following all instructions above.
*   **tags:** A list of 3-5 relevant technical tags based on the document.
*   **meta_description_fa:** An SEO-optimized summary in Persian, about 155 characters.
*   **meta_description_en:** An SEO-optimized summary in English, about 155 characters.
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
