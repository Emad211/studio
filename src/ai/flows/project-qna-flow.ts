
'use server';
/**
 * @fileOverview An AI agent that answers questions about a project.
 *
 * - answerProjectQuestion - A function that handles answering questions about a project.
 * - ProjectQnAInput - The input type for the answerProjectQuestion function.
 * - ProjectQnAOutput - The return type for the answerProjectQuestion function.
 */

import { ai, initPromise } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectQnAInputSchema = z.object({
  context: z.string().describe('Detailed, non-confidential information about the project. This is the sole source of truth for the AI.'),
  question: z.string().describe('The user\'s question about the project.'),
});
export type ProjectQnAInput = z.infer<typeof ProjectQnAInputSchema>;

const ProjectQnAOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question, based *only* on the provided context.'),
});
export type ProjectQnAOutput = z.infer<typeof ProjectQnAOutputSchema>;

export async function answerProjectQuestion(input: ProjectQnAInput): Promise<ProjectQnAOutput> {
  await initPromise; // Ensure Genkit is initialized
  const result = await projectQnAFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'projectQnAPrompt',
  input: { schema: ProjectQnAInputSchema },
  output: { schema: ProjectQnAOutputSchema },
  prompt: `You are a specialized AI assistant acting as a subject matter expert for a specific project. Your entire knowledge base for this project is the text provided below in the 'Project Context'. You must adhere to the following rules strictly:

**Rules:**
1.  **Context is King:** You MUST base all of your answers *exclusively* on the information found within the 'Project Context'. Do not use any external knowledge or prior training.
2.  **No Speculation:** If the answer to a question is not present in the context, you must clearly state that you do not have enough information to answer. Do not try to guess or infer information that isn't there.
3.  **Be Precise:** Your primary job is to accurately retrieve and present information from the context. Be helpful, insightful, and concise.
4.  **Language Matching:** If the user's question is in Persian, your entire answer must also be in Persian. Otherwise, answer in English.

**Project Context:**
"""
{{{context}}}
"""

**User Question:**
"""
{{{question}}}
"""

Based *only* on the context provided, generate a helpful answer to the user's question.
`,
});

const projectQnAFlow = ai.defineFlow(
  {
    name: 'projectQnAFlow',
    inputSchema: ProjectQnAInputSchema,
    outputSchema: ProjectQnAOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
