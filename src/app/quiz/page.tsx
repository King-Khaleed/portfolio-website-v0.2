import { QuizForm } from "@/components/quiz/quiz-form";

export default function QuizPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Discover Your Digital Magic Level
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Answer a few questions to understand your project's needs and uncover your place in the digital realm.
        </p>
      </div>
      <QuizForm />
    </div>
  );
}
