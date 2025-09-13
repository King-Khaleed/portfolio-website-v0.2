import { ContactForm } from "@/components/contact/contact-form";

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
      <ContactForm />
    </div>
  );
}
