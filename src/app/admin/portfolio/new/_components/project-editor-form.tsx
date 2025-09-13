'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { createPortfolioProject } from '../actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

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
          Save Project
        </>
      )}
    </Button>
  );
}

export function ProjectEditorForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(createPortfolioProject, {
      message: null,
      errors: undefined
  });

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      router.push('/admin/portfolio');
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
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" name="title" placeholder="Your amazing project title" required />
         {state?.errors?.title && (
          <p className="text-sm text-destructive">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="A brief summary of your project."
          className="min-h-[100px]"
          required
        />
         {state?.errors?.description && (
          <p className="text-sm text-destructive">{state.errors.description[0]}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input id="tags" name="tags" placeholder="Web3, Next.js, AI" />
        <p className="text-xs text-muted-foreground">
            Enter tags separated by commas.
        </p>
         {state?.errors?.tags && (
          <p className="text-sm text-destructive">{state.errors.tags[0]}</p>
        )}
      </div>

       <div className="space-y-2">
        <Label htmlFor="project_url">Project URL</Label>
        <Input id="project_url" name="project_url" placeholder="https://your-project-link.com" />
         {state?.errors?.project_url && (
          <p className="text-sm text-destructive">{state.errors.project_url[0]}</p>
        )}
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
