'use server';
/**
 * @fileOverview An AI agent that answers questions about a project.
 *
 * - answerProjectQuestion - A function that handles answering questions about a project.
 * - ProjectQnAInput - The input type for the answerProjectQuestion function.
 * - ProjectQnAOutput - The return type for the answerProjectQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectQnAInputSchema = z.object({
  context: z.string().describe('Detailed, non-confidential information about the project.'),
  question: z.string().describe('The user\'s question about the project.'),
});
export type ProjectQnAInput = z.infer<typeof ProjectQnAInputSchema>;

const ProjectQnAOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the user\'s question.'),
});
export type ProjectQnAOutput = z.infer<typeof ProjectQnAOutputSchema>;

export async function answerProjectQuestion(input: ProjectQnAInput): Promise<ProjectQnAOutput> {
  const result = await projectQnAFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'projectQnAPrompt',
  input: { schema: ProjectQnAInputSchema },
  output: { schema: ProjectQnAOutputSchema },
  prompt: `You are an expert AI developer and you are presenting one of your projects. You will be given context about the project and a user's question. Your task is to answer the question based on the provided context in a helpful and insightful way.

Keep your answers concise and to the point. If the question is in Persian, answer in Persian.

Project Context:
{{{context}}}

User Question:
{{{question}}}
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
