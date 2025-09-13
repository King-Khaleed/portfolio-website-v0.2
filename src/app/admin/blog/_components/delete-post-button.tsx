'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteBlogPost } from '../actions';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <AlertDialogAction asChild>
        <Button type="submit" variant="destructive" disabled={pending}>
        {pending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <Trash2 className="mr-2 h-4 w-4" />
        )}
        {pending ? 'Deleting...' : 'Delete'}
        </Button>
    </AlertDialogAction>
  );
}


export function DeletePostButton({ postId }: { postId: string }) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(deleteBlogPost, { message: null, errors: undefined });

  useEffect(() => {
    if (state?.message) {
        if(state.errors) {
            toast({
                title: 'Error',
                description: state.message,
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'Success!',
                description: state.message,
            });
        }
    }
  }, [state, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={formAction}>
            <input type="hidden" name="id" value={postId} />
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the blog post
                and remove its data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <SubmitButton />
            </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
