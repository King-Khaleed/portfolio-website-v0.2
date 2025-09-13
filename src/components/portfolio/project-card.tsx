import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Project } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  const placeholder = PlaceHolderImages.find(p => p.id === project.image);

  return (
    <Card className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      {placeholder && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            data-ai-hint={placeholder.imageHint}
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
        <Button asChild variant="outline" className="w-full">
          <Link href={project.link}>
            View Project <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
