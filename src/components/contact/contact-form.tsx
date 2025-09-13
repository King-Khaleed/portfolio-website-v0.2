'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { qualifyLeadAction } from '@/app/actions/contact';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Consulting the Oracle...
        </>
      ) : (
        <>
          Send Message <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const initialState = { message: null, errors: {}, summary: null };
  const [state, dispatch] = useFormState(qualifyLeadAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get('package');

  useEffect(() => {
    if (state.message && state.summary) {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && state.errors) {
       toast({
        title: "Submission Error",
        description: state.message,
        variant: 'destructive'
      });
    }
  }, [state, toast]);

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="w-full bg-card/50 backdrop-blur-sm border-primary/20">
        <form action={dispatch} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline">Send a Message</CardTitle>
            <CardDescription>Fill out the form below to reach out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" aria-describedby="name-error" required />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name && state.errors.name.map((error: string) => (
                  <p className="text-sm text-destructive" key={error}>{error}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" aria-describedby="email-error" required />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email && state.errors.email.map((error: string) => (
                  <p className="text-sm text-destructive" key={error}>{error}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input id="company" name="company" placeholder="Your company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                name="message" 
                placeholder="Tell me about your project or question..." 
                className="min-h-[120px]" 
                aria-describedby="message-error"
                defaultValue={selectedPackage ? `I'm interested in the "${selectedPackage}" package.` : ''}
                required
              />
              <div id="message-error" aria-live="polite" aria-atomic="true">
                {state.errors?.message && state.errors.message.map((error: string) => (
                  <p className="text-sm text-destructive" key={error}>{error}</p>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="flex items-center justify-center">
        {state.summary ? (
             <Card className="w-full bg-primary/10 border-primary/30">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-accent" />
                        <CardTitle className="font-headline">AI Pre-Qualification</CardTitle>
                    </div>
                    <CardDescription>Based on your message, here's how The Web3 Wizard might be of service:</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{state.summary}</p>
                </CardContent>
             </Card>
        ) : (
            <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Bot className="mx-auto h-12 w-12 mb-4" />
                <h3 className="font-headline text-lg text-foreground">AI Analysis Awaits</h3>
                <p>After you send a message, our AI will provide an initial analysis of your request here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
