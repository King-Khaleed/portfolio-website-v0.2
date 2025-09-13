'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function deleteBlogPost(formData: FormData) {
  const supabase = getSupabaseServerClient();
  
  const schema = z.object({
    id: z.string().uuid(),
  });

  const validatedFields = schema.safeParse({
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid post ID.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  // First, delete the associated image from storage if it exists.
  const { data: post, error: fetchError } = await supabase
    .from('blog_posts')
    .select('image_url')
    .eq('id', id)
    .single();

  if (fetchError || !post) {
    console.error('Error fetching post for deletion:', fetchError);
    return { message: 'Failed to find post to delete.' };
  }

  if (post.image_url) {
    const { error: storageError } = await supabase.storage
      .from('blog_images')
      .remove([post.image_url]);
    
    if (storageError) {
      // Log the error but don't block deletion of the post record itself
      console.error('Error deleting image from storage:', storageError);
    }
  }

  // Now, delete the post record from the database
  const { error: dbError } = await supabase.from('blog_posts').delete().eq('id', id);

  if (dbError) {
    console.error('Supabase delete error:', dbError);
    return { message: 'Database Error: Failed to delete blog post.' };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  
  return { message: 'Blog post deleted successfully!' };
}
