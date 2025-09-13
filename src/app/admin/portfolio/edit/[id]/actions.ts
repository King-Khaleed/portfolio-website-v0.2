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
  id: z.string().uuid(),
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(tag => tag)),
  project_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});


export async function updatePortfolioProject(prevState: State, formData: FormData): Promise<State> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "Authentication error: You must be logged in to update a project.",
      errors: {}
    }
  }

  const validatedFields = schema.safeParse({
    id: formData.get('id'),
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

  const { id, ...projectData } = validatedFields.data;

  const { error } = await supabase
    .from('portfolio_projects')
    .update({
      ...projectData,
    })
    .eq('id', id);

  if (error) {
    console.error("Supabase Update Error:", error);
    return {
      message: 'Database Error: Failed to update project.',
      errors: {}
    };
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  
  // The redirect will be handled on the client after showing a toast
  return { message: 'Project updated successfully!' };
}
