'use server';

/**
 * @fileOverview Uses AI to pre-qualify leads from a contact form submission.
 *
 * - preQualifyLeadsWithAI - A function that takes contact form data and returns a summary of services.
 * - PreQualifyLeadsInput - The input type for the preQualifyLeadsWithAI function.
 * - PreQualifyLeadsOutput - The return type for the preQualifyLeadsWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PreQualifyLeadsInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  company: z.string().optional().describe('The company of the person submitting the form, if applicable.'),
  message: z.string().describe('The message from the person submitting the form.'),
});

export type PreQualifyLeadsInput = z.infer<typeof PreQualifyLeadsInputSchema>;

const PreQualifyLeadsOutputSchema = z.object({
  summary: z.string().describe('A summary of the ways The Web3 Wizard by Khalid might be of service, based on the form submission.'),
});

export type PreQualifyLeadsOutput = z.infer<typeof PreQualifyLeadsOutputSchema>;

export async function preQualifyLeadsWithAI(input: PreQualifyLeadsInput): Promise<PreQualifyLeadsOutput> {
  return preQualifyLeadsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'preQualifyLeadsPrompt',
  input: {schema: PreQualifyLeadsInputSchema},
  output: {schema: PreQualifyLeadsOutputSchema},
  prompt: `You are The Web3 Wizard by Khalid, and you are reviewing a contact form submission from a potential client.

  Based on the following information, provide a summary of the ways you might be of service to them. Focus on the client's needs and how your services can address them.

  Name: {{{name}}}
  Email: {{{email}}}
  Company: {{{company}}}
  Message: {{{message}}}
  `,
});

const preQualifyLeadsFlow = ai.defineFlow(
  {
    name: 'preQualifyLeadsFlow',
    inputSchema: PreQualifyLeadsInputSchema,
    outputSchema: PreQualifyLeadsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
