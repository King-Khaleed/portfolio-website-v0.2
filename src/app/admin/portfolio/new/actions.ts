'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type State = {
  errors?: {
    title?: string[];
    description?: string[];
    tags?: string[];
    project_url?: string[];
  } | undefined;
  message?: string | null;
};

const schema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(tag => tag)),
  project_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

export async function createPortfolioProject(prevState: State, formData: FormData): Promise<State> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "Authentication error: You must be logged in to create a project.",
      errors: {}
    }
  }
  
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    tags: formData.get('tags'),
    project_url: formData.get('project_url'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Error: Please check the fields.',
    };
  }
  
  const { error } = await supabase.from('portfolio_projects').insert({
    ...validatedFields.data,
  });

  if (error) {
    console.error("Supabase Error:", error);
    return {
      message: 'Database Error: Failed to create project.',
      errors: {}
    };
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  
  return { message: 'Project created successfully!' };
}
