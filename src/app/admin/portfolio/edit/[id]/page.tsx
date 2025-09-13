import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectEditorForm } from './_components/project-editor-form';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/lib/types';

async function getProject(id: string): Promise<Project | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error('Error fetching project', error);
        return null;
    }

    return {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image_url || '',
        tags: data.tags || [],
        link: data.project_url || '',
    };
}


export default async function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/portfolio">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline">Edit Project</h1>
          <p className="text-muted-foreground">
            You are editing: <span className="font-medium text-foreground">{project.title}</span>
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
          <CardDescription>Update the details of your project below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectEditorForm project={project} />
        </CardContent>
      </Card>
    </div>
  );
}
