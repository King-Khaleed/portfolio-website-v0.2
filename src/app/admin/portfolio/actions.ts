'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function deletePortfolioProject(previousState: any, formData: FormData) {
  const supabase = createClient();
  
  const schema = z.object({
    id: z.string().uuid(),
  });

  const validatedFields = schema.safeParse({
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid project ID.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  // First, delete the associated image from storage if it exists.
  const { data: project, error: fetchError } = await supabase
    .from('portfolio_projects')
    .select('image_url')
    .eq('id', id)
    .single();

  if (fetchError || !project) {
    console.error('Error fetching project for deletion:', fetchError);
    return { message: 'Failed to find project to delete.' };
  }

  if (project.image_url) {
    const { error: storageError } = await supabase.storage
      .from('portfolio_images')
      .remove([project.image_url]);
    
    if (storageError) {
      // Log the error but don't block deletion of the project record itself
      console.error('Error deleting image from storage:', storageError);
    }
  }

  // Now, delete the project record from the database
  const { error: dbError } = await supabase.from('portfolio_projects').delete().eq('id', id);

  if (dbError) {
    console.error('Supabase delete error:', dbError);
    return { message: 'Database Error: Failed to delete project.' };
  }

  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  
  return { message: 'Project deleted successfully!' };
}
