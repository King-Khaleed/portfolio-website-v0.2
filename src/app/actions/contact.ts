'use server';

import { z } from 'zod';
import { preQualifyLeadsWithAI } from '@/ai/flows/pre-qualify-leads-with-ai';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    company?: string[];
  };
  message?: string | null;
  summary?: string | null;
};

export async function qualifyLeadAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Submit.',
    };
  }

  try {
    const result = await preQualifyLeadsWithAI(validatedFields.data);
    return { 
        message: 'Your message has been sent to the wizard!', 
        summary: result.summary 
    };
  } catch (error) {
    console.error('AI Qualification Error:', error);
    return {
      message: 'An error occurred while consulting the oracle. Please try again.',
    };
  }
}
