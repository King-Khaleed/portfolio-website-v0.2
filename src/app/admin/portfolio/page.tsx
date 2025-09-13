import Link from 'next/link';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Edit } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DeleteProjectButton } from './_components/delete-project-button';

export default async function AdminPortfolioPage() {
  const supabase = getSupabaseServerClient();
  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select('id, title, project_url, tags')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Portfolio Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all your portfolio projects.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/portfolio/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>A list of all the projects in your grimoire.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    {project.project_url ? (
                        <Link href={project.project_url} className="hover:underline" target="_blank">
                            {project.title}
                        </Link>
                    ) : (
                        project.title
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                        {project.tags?.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                           <Link href={`/admin/portfolio/edit/${project.id}`} className="flex items-center">
                              <Edit className="mr-2 h-4 w-4"/>
                              Edit
                           </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteProjectButton projectId={project.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
