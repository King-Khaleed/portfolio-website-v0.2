import { createClient } from '@/lib/supabase/server';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { QuizTier } from '@/lib/types';
import { MAX_SCORE } from '@/lib/quiz-data';

function getQuizTier(score: number): QuizTier {
  const percentage = (score / MAX_SCORE) * 100;
  if (percentage <= 40) return 'Apprentice Wizard';
  if (percentage <= 70) return 'Digital Sorcerer';
  if (percentage <= 90) return 'Web3 Archmage';
  return 'Legendary Tech Wizard';
}

export default async function AdminQuizResponsesPage() {
  const supabase = createClient();
  const { data: responses } = await supabase
    .from('quiz_responses')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Quiz Responses</h1>
        <p className="text-muted-foreground">
          A log of all submitted quiz results.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Responses</CardTitle>
          <CardDescription>Review the magic levels discovered by your visitors.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Total Score</TableHead>
                <TableHead className="text-right">Preferences</TableHead>
                <TableHead className="text-right">Web Dev</TableHead>
                <TableHead className="text-right">Business</TableHead>
                <TableHead className="text-right">Web3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses?.map((response) => {
                const totalScore = response.personal_preferences_score + response.web_development_score + response.business_understanding_score + response.web3_knowledge_score;
                const tier = getQuizTier(totalScore);
                return (
                  <TableRow key={response.id}>
                    <TableCell>
                      {new Date(response.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tier}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold">{totalScore}</TableCell>
                    <TableCell className="text-right">{response.personal_preferences_score}</TableCell>
                    <TableCell className="text-right">{response.web_development_score}</TableCell>
                    <TableCell className="text-right">{response.business_understanding_score}</TableCell>
                    <TableCell className="text-right">{response.web3_knowledge_score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
