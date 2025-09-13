import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogEditorForm } from './_components/blog-editor-form';

export default async function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline">Edit Post</h1>
          <p className="text-muted-foreground">
            You are editing: <span className="font-medium text-foreground">{post.title}</span>
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>Update the details of your blog post below.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogEditorForm post={post} />
        </CardContent>
      </Card>
    </div>
  );
}
