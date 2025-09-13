import { createClient } from '@/lib/supabase/server';
import type { Project } from './types';

export async function getProjects(): Promise<Project[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image_url || '',
        tags: project.tags || [],
        link: project.project_url || '',
    }));
}
