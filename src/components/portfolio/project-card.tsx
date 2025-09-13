import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function ProjectCard({ project }: { project: Project }) {
  const supabase = createClient();
  const { data: { publicUrl } } = supabase.storage.from('portfolio_images').getPublicUrl(project.image);

  return (
    <Card className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      {publicUrl && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={publicUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary-foreground/80">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full" disabled={!project.link}>
            {project.link ? (
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                View Project <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <span>
                Coming Soon <ArrowUpRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
      </CardFooter>
    </Card>
  );
}
