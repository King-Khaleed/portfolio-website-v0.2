'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  console.log('Login action initiated.');
  const supabase = getSupabaseServerClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    console.log('Login failed: Email or password missing.');
    return { error: 'Email and password are required.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error from Supabase:', error.message);
    return { error: 'Could not authenticate user. Please check your credentials.' };
  }
  
  console.log('User successfully signed in. Revalidating path and redirecting to dashboard.');
  revalidatePath('/', 'layout');
  redirect('/admin/dashboard');
}

export async function logout() {
  const supabase = getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
