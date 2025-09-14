import { getSupabaseServerClient, getSupabaseServerClientReadOnly } from '@/lib/supabase/server';
import type { BlogPost } from './types';

export async function getBlogPosts(): Promise<BlogPost[]> {
    const supabase = getSupabaseServerClientReadOnly();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return data.map(post => ({
        ...post,
        id: post.id.toString(), // Ensure id is a string
        image: post.image_url || '',
        meta: {
            description: post.meta_description || '',
            keywords: post.meta_keywords || [],
        },
    }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const supabase = getSupabaseServerClientReadOnly();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        return null;
    }

    return {
        ...data,
        id: data.id.toString(),
        image: data.image_url || '',
        meta: {
            description: data.meta_description || '',
            keywords: data.meta_keywords || [],
        },
    };
}

export async function getRelatedBlogPosts(category: string, currentPostId: string): Promise<BlogPost[]> {
    const supabase = getSupabaseServerClientReadOnly();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .neq('id', currentPostId)
        .limit(3);

    if (error) {
        console.error('Error fetching related blog posts:', error);
        return [];
    }

    return data.map(post => ({
        ...post,
        id: post.id.toString(),
        image: post.image_url || '',
        meta: {
            description: post.meta_description || '',
            keywords: post.meta_keywords || [],
        },
    }));
}

export async function getAdjacentPosts(currentPostDate: string): Promise<{ prevPost: { slug: string } | null, nextPost: { slug: string } | null }> {
    const supabase = getSupabaseServerClientReadOnly();

    const { data: prevData } = await supabase
        .from('blog_posts')
        .select('slug')
        .lt('date', currentPostDate)
        .order('date', { ascending: false })
        .limit(1)
        .single();
    
    const { data: nextData } = await supabase
        .from('blog_posts')
        .select('slug')
        .gt('date', currentPostDate)
        .order('date', { ascending: true })
        .limit(1)
        .single();

    return {
        prevPost: prevData,
        nextPost: nextData
    };
}

export async function getAllPostSlugs() {
    const supabase = getSupabaseServerClientReadOnly();
    const { data, error } = await supabase.from('blog_posts').select('slug');
    if (error) {
        console.error('Error fetching slugs', error);
        return [];
    }
    return data;
}
