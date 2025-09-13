import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, BookOpen, Bot, MessageSquare } from 'lucide-react';
import { getSupabaseServerClient } from '@/lib/supabase/server';

async function getStats() {
    const supabase = getSupabaseServerClient();

    const { count: blogPostsCount } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true });

    const { count: quizResponsesCount } = await supabase
        .from('quiz_responses')
        .select('*', { count: 'exact', head: true });

    const { count: contactSubmissionsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });
    
    return {
        blogPostsCount: blogPostsCount ?? 0,
        quizResponsesCount: quizResponsesCount ?? 0,
        contactSubmissionsCount: contactSubmissionsCount ?? 0
    }
}


export default async function AdminDashboardPage() {
  const { blogPostsCount, quizResponsesCount, contactSubmissionsCount } = await getStats();

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your digital realm.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPostsCount}</div>
            <p className="text-xs text-muted-foreground">
              Total published posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quiz Responses
            </CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizResponsesCount}</div>
            <p className="text-xs text-muted-foreground">
              Submissions recorded
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Submissions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactSubmissionsCount}</div>
            <p className="text-xs text-muted-foreground">
              New messages received
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Site Views
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Analytics not yet implemented
            </p>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Welcome, Wizard!</CardTitle>
            <CardDescription>
              From this dashboard, you can manage all aspects of your digital grimoire. Use the sidebar to navigate to different content sections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your journey as a content creator begins now. Let's conjure some magic!</p>
          </CardContent>
        </Card>
    </div>
  );
}
