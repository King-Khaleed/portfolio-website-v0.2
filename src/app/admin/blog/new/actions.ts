'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({
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

export async function createBlogPost(prevState: State, formData: FormData): Promise<State> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "Authentication error: You must be logged in to create a post.",
      errors: {}
    }
  }
  
  const validatedFields = schema.safeParse({
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
  
  // Check if slug is unique
  const { data: existingPost } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', validatedFields.data.slug)
    .single();

  if (existingPost) {
    return {
      errors: { slug: ['This slug is already in use. Please choose a unique one.'] },
      message: 'Slug is not unique.'
    }
  }
  
  const { error } = await supabase.from('blog_posts').insert({
    ...validatedFields.data,
    // Add other fields with default or calculated values if needed
    reading_time: Math.ceil(validatedFields.data.content.split(' ').length / 200),
  });

  if (error) {
    console.error("Supabase Error:", error);
    return {
      message: 'Database Error: Failed to create blog post.',
      errors: {}
    };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  
  // The redirect will be handled on the client after showing a toast
  return { message: 'Blog post created successfully!' };
}
