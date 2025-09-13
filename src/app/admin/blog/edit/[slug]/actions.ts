'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  slug: z.string().regex(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters.' }),
  category: z.enum(["Introvert Chronicles", "Tech Insights", "Web3 Wizardry", "AI & Innovation"], {
    errorMap: () => ({ message: "Please select a valid category." })
  }),
});

type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
    content?: string[];
    category?: string[];
  } | undefined;
  message?: string | null;
};

export async function updateBlogPost(prevState: State, formData: FormData): Promise<State> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "Authentication error: You must be logged in to update a post.",
      errors: {}
    }
  }

  const validatedFields = schema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    content: formData.get('content'),
    category: formData.get('category'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation Error: Please check the fields.',
    };
  }

  const { id, ...postData } = validatedFields.data;

  // Check if slug is unique (and not the current post's slug)
  const { data: existingPost, error: slugCheckError } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', postData.slug)
    .neq('id', id)
    .single();

  if (slugCheckError && slugCheckError.code !== 'PGRST116') { // Ignore 'exact one row' error
    console.error('Slug check error:', slugCheckError);
    return { message: 'Database error checking for slug uniqueness.' };
  }

  if (existingPost) {
    return {
      errors: { slug: ['This slug is already in use by another post. Please choose a unique one.'] },
      message: 'Slug is not unique.'
    }
  }

  const { error } = await supabase
    .from('blog_posts')
    .update({
      ...postData,
      reading_time: Math.ceil(postData.content.split(' ').length / 200),
    })
    .eq('id', id);

  if (error) {
    console.error("Supabase Update Error:", error);
    return {
      message: 'Database Error: Failed to update blog post.',
      errors: {}
    };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  revalidatePath(`/blog/${postData.slug}`);
  
  // The redirect will be handled on the client after showing a toast
  return { message: 'Blog post updated successfully!' };
}
