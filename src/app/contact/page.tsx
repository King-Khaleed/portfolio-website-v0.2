import { Suspense } from 'react';
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ContactFormWrapper() {
  return <ContactForm />;
}

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Contact the Wizard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or a question about the digital arts? Send a message through the ether. The wizard is listening.
        </p>
      </div>
      
      <div className="w-full max-w-lg flex flex-col sm:flex-row gap-6 justify-center text-center mb-12">
        <Button variant="ghost" asChild>
            <Link href="mailto:thewebwizard00@gmail.com" className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">thewebwizard00@gmail.com</span>
            </Link>
        </Button>
         <Button variant="ghost" asChild>
            <Link href="tel:09115966703" className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-muted-foreground">09115966703</span>
            </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading form...</div>}>
        <ContactFormWrapper />
      </Suspense>
    </div>
  );
}
