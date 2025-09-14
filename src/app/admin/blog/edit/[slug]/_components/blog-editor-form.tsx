'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateBlogPost } from '../actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BlogCategory, BlogPost } from '@/lib/types';
import { useRouter } from 'next/navigation';

const categories: BlogCategory[] = ["Introvert Chronicles", "Tech Insights", "Web3 Wizardry", "AI & Innovation"];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Updating...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Update Post
        </>
      )}
    </Button>
  );
}

export function BlogEditorForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [state, formAction] = useActionState(updateBlogPost, {
    message: null,
    errors: undefined
  });

  const [category, setCategory] = useState(post.category);

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      router.push('/admin/blog');
    } else if (state.message && state.errors) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, router]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="category" value={category} />

      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input id="title" name="title" placeholder="Your amazing blog post title" defaultValue={post.title} required />
        {state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" placeholder="your-amazing-blog-post-title" defaultValue={post.slug} required />
        <p className="text-xs text-muted-foreground">
          This is the URL-friendly version of the title. Use lowercase letters and hyphens.
        </p>
        {state?.errors?.slug && (
          <p className="text-sm text-destructive">{state.errors.slug[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-select">Category</Label>
        <Select onValueChange={(value) => setCategory(value as BlogCategory)} defaultValue={post.category} name="category-select">
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.category && (
          <p className="text-sm text-destructive">{state.errors.category[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="A brief summary of your post for previews and social media."
          className="min-h-[100px]"
          defaultValue={post.description}
          required
        />
        {state?.errors?.description && (
          <p className="text-sm text-destructive">{state.errors.description[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Main Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your full blog post here. Markdown is supported."
          className="min-h-[300px]"
          defaultValue={post.content}
          required
        />
        {state?.errors?.content && (
          <p className="text-sm text-destructive">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
