import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectEditorForm } from './_components/project-editor-form';

export default function NewPortfolioProjectPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/portfolio">
                <ArrowLeft className="h-4 w-4" />
            </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline">Create New Project</h1>
          <p className="text-muted-foreground">
            Fill out the form below to add a new project to your portfolio.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Provide all the necessary information for your new project.</CardDescription>
        </CardHeader>
        <CardContent>
            <ProjectEditorForm />
        </CardContent>
      </Card>
    </div>
  );
}
