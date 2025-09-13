import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { BlogPost } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

export function PostCard({ post }: { post: BlogPost }) {
  const placeholder = PlaceHolderImages.find(p => p.id === post.image);

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="flex flex-col h-full overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 transition-all group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
        {placeholder && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={placeholder.imageUrl}
              alt={placeholder.description}
              data-ai-hint={placeholder.imageHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <Badge variant="outline" className="w-fit mb-2 border-accent text-accent">{post.category}</Badge>
          <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">{post.description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-0 text-xs text-muted-foreground">
            <span>{post.date} &middot; {post.readingTime} min read</span>
            <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardFooter>
      </Card>
    </Link>
  );
}
