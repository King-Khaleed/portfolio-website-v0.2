'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { createBlogPost } from '../actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BlogCategory } from '@/lib/types';
import { useRouter } from 'next/navigation';

const categories: BlogCategory[] = ["Introvert Chronicles", "Tech Insights", "Web3 Wizardry", "AI & Innovation"];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Post
        </>
      )}
    </Button>
  );
}


export function BlogEditorForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(createBlogPost, {
      message: null,
      errors: undefined
  });

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
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input id="title" name="title" placeholder="Your amazing blog post title" required />
         {state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" placeholder="your-amazing-blog-post-title" required />
        <p className="text-xs text-muted-foreground">
            This is the URL-friendly version of the title. Use lowercase letters and hyphens.
        </p>
         {state?.errors?.slug && (
          <p className="text-sm text-destructive">{state.errors.slug[0]}</p>
        )}
      </div>

       <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
           <Controller
            name="category"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                      {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            )}
           />
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

// Dummy Controller for useActionState with Select
function Controller({ name, render }: { name: string, render: (props: {field: any}) => React.ReactElement}) {
    return render({ field: {
        onChange: (value: string) => {
            // This is a bit of a hack for the form to register the Select value
            const hiddenInput = document.querySelector(`input[name=${name}]`) as HTMLInputElement;
            if (hiddenInput) {
                hiddenInput.value = value;
            }
        },
        value: undefined // The Select component will manage its own state
    }});
}
