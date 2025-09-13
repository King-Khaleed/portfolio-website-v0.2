import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function PostCard({ post }: { post: BlogPost }) {
  const supabase = createClient();
  const { data: { publicUrl } } = supabase.storage.from('blog_images').getPublicUrl(post.image);

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="flex flex-col h-full overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 transition-all group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
        {publicUrl && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={publicUrl}
              alt={post.title}
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
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} &middot; {post.reading_time} min read</span>
            <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardFooter>
      </Card>
    </Link>
  );
}
