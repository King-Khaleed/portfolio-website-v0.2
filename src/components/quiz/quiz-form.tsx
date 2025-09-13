'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { quizQuestions } from '@/lib/quiz-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  answers: z.array(z.string()).length(quizQuestions.length, "Please answer all questions."),
});

type FormData = z.infer<typeof schema>;

export function QuizForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const { control, handleSubmit, watch, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      answers: Array(quizQuestions.length).fill(''),
    },
  });

  const answers = watch('answers');
  const progress = (currentStep / quizQuestions.length) * 100;

  const handleNext = async () => {
    const isValid = await trigger(`answers.${currentStep}`);
    if (isValid) {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const onSubmit = (data: FormData) => {
    const scores = {
      personalPreferencesScore: 0,
      webDevelopmentScore: 0,
      businessUnderstandingScore: 0,
      web3KnowledgeScore: 0,
    };

    data.answers.forEach((answer, index) => {
      const question = quizQuestions[index];
      const selectedOption = question.options.find(opt => opt.text === answer);
      if (selectedOption) {
        scores[question.category as keyof typeof scores] += selectedOption.points;
      }
    });

    const query = new URLSearchParams(Object.entries(scores).map(([k, v]) => [k, String(v)]));
    router.push(`/quiz/results?${query.toString()}`);
  };

  return (
    <Card className="w-full max-w-2xl bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <Progress value={progress} className="mb-4 h-2" />
        <CardTitle className="font-headline text-2xl">
          Question {currentStep + 1}/{quizQuestions.length}
        </CardTitle>
        <CardDescription className="text-lg min-h-[3em]">
          {quizQuestions[currentStep].question}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={`answers.${currentStep}`}
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="space-y-4"
              >
                {quizQuestions[currentStep].options.map((option) => (
                  <Label
                    key={option.text}
                    className={cn(
                      "flex items-center space-x-3 p-4 rounded-md border transition-all cursor-pointer",
                      field.value === option.text
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <RadioGroupItem value={option.text} id={option.text} />
                    <span>{option.text}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
          {errors.answers?.[currentStep] && (
            <p className="mt-2 text-sm text-destructive">{errors.answers[currentStep]?.message}</p>
          )}

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep < quizQuestions.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">
                Reveal My Magic <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
