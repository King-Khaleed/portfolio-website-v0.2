'use server';

/**
 * @fileOverview A flow that generates personalized explanations for the Digital Magic Level quiz results.
 *
 * - generatePersonalizedExplanation - A function that generates personalized explanations based on quiz results.
 * - PersonalizedExplanationInput - The input type for the generatePersonalizedExplanation function.
 * - PersonalizedExplanationOutput - The return type for the generatePersonalizedExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedExplanationInputSchema = z.object({
  personalPreferencesScore: z
    .number()
    .describe('The score obtained in the personal preferences category.'),
  webDevelopmentScore: z
    .number()
    .describe('The score obtained in the web development category.'),
  businessUnderstandingScore: z
    .number()
    .describe('The score obtained in the business understanding category.'),
  web3KnowledgeScore: z
    .number()
    .describe('The score obtained in the web3 knowledge category.'),
});
export type PersonalizedExplanationInput = z.infer<
  typeof PersonalizedExplanationInputSchema
>;

const PersonalizedExplanationOutputSchema = z.object({
  explanation: z.string().describe('The personalized explanation of the quiz results.'),
});
export type PersonalizedExplanationOutput = z.infer<
  typeof PersonalizedExplanationOutputSchema
>;

export async function generatePersonalizedExplanation(
  input: PersonalizedExplanationInput
): Promise<PersonalizedExplanationOutput> {
  return personalizedExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedExplanationPrompt',
  input: {schema: PersonalizedExplanationInputSchema},
  output: {schema: PersonalizedExplanationOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized explanations for a user's "Digital Magic Level" quiz results. The quiz assesses skills and preferences across several categories:

*   Personal Preferences
*   Web Development
*   Business Understanding
*   Web3 Knowledge

Based on the user's scores in each category, provide a concise and encouraging explanation of their strengths and potential areas for growth. Tailor the explanation to be relevant to the overall theme of web development, AI, and Web3.

Here are the user's scores:

Personal Preferences: {{personalPreferencesScore}}
Web Development: {{webDevelopmentScore}}
Business Understanding: {{businessUnderstandingScore}}
Web3 Knowledge: {{web3KnowledgeScore}}

Explanation:`,
});

const personalizedExplanationFlow = ai.defineFlow(
  {
    name: 'personalizedExplanationFlow',
    inputSchema: PersonalizedExplanationInputSchema,
    outputSchema: PersonalizedExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
