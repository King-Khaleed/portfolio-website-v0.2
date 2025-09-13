import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogEditorForm } from './_components/blog-editor-form';

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4" />
            </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline">Create New Post</h1>
          <p className="text-muted-foreground">
            Fill out the form below to create a new blog post.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
            <CardDescription>Provide all the necessary information for your new post.</CardDescription>
        </CardHeader>
        <CardContent>
            <BlogEditorForm />
        </CardContent>
      </Card>
    </div>
  );
}
