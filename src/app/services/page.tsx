import Link from 'next/link';
import { services, faqs } from '@/lib/services-data';
import { PricingCard } from '@/components/services/pricing-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="flex flex-col items-center space-y-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          The Wizard's Offerings
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your spell. Each package is crafted to bring your digital vision to life with a touch of magic.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <PricingCard key={service.title} service={service} />
        ))}
      </div>

      {/* Quiz Callout */}
      <div className="w-full max-w-4xl text-center p-8 bg-card/50 backdrop-blur-sm border-primary/20 rounded-lg">
        <h2 className="text-2xl font-headline font-bold">Not Sure Which Spell to Cast?</h2>
        <p className="mt-2 text-muted-foreground">Let my AI companion guide you. Take the quiz to discover your Digital Magic Level and find the perfect package for your quest.</p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/quiz">Discover Your Magic Level</Link>
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="p-6 bg-card/50 rounded-lg">
            <h3 className="text-xl font-headline font-bold">My Process</h3>
            <p className="text-muted-foreground mt-2">A 5-step journey from consultation to launch, ensuring your project is forged to perfection.</p>
        </div>
        <div className="p-6 bg-card/50 rounded-lg">
            <h3 className="text-xl font-headline font-bold">My Guarantee</h3>
            <p className="text-muted-foreground mt-2">Your satisfaction is paramount. I provide dedicated support to ensure your digital artifact performs flawlessly.</p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
