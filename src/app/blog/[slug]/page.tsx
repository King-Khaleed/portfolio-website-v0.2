import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPost, getRelatedBlogPosts, getAdjacentPosts, getAllPostSlugs } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostCard } from '@/components/blog/post-card';
import { SocialShare } from '@/components/blog/social-share';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  const supabase = createClient();
  const { data: { publicUrl } } = supabase.storage.from('blog_images').getPublicUrl(post.image);


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | The Web3 Wizard Blog`,
    description: post.meta.description,
    keywords: post.meta.keywords,
    openGraph: {
      title: post.title,
      description: post.meta.description,
      url: fullUrl,
      type: 'article',
      images: [
        {
          url: publicUrl || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta.description,
      images: [publicUrl || ''],
    },
  };
}

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map(item => ({
        slug: item.slug
    }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.category, post.id);
  const { prevPost, nextPost } = await getAdjacentPosts(post.date);
  
  const supabase = createClient();
  const { data: { publicUrl: imageUrl } } = supabase.storage.from('blog_images').getPublicUrl(post.image);


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = `${siteUrl}/blog/${post.slug}`;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: imageUrl || '',
    author: {
      '@type': 'Person',
      name: 'Khalid',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wizardfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: post.date,
    description: post.meta.description,
  };


  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <article className="max-w-4xl mx-auto">
      <header className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 border-accent text-accent">{post.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-muted-foreground">
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} &middot; {post.reading_time} min read</span>
        </div>
      </header>

      {imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden mb-12 shadow-lg shadow-primary/10">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert prose-lg max-w-none mx-auto
                   prose-headings:font-headline prose-headings:text-foreground prose-headings:font-bold
                   prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground
                   prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
      
      <div className="my-12 border-t border-b border-border/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="The Web3 Wizard" />
                <AvatarFallback>WZ</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-foreground">The Web3 Wizard by Khalid</p>
                <p className="text-sm text-muted-foreground">Conjuring digital experiences with code and creativity.</p>
            </div>
          </div>
          <SocialShare url={fullUrl} title={post.title} />
      </div>

      <div className="my-12 grid grid-cols-2 gap-4">
        {prevPost ? (
            <Button asChild variant="outline" className="justify-start">
                <Link href={`/blog/${prevPost.slug}`}>
                    <ArrowLeft className="mr-2"/>
                    Previous Post
                </Link>
            </Button>
        ) : <div />}
        {nextPost && (
            <Button asChild variant="outline" className="justify-end col-start-2">
                <Link href={`/blog/${nextPost.slug}`}>
                    Next Post
                    <ArrowRight className="ml-2"/>
                </Link>
            </Button>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl font-headline font-bold text-center mb-8">Related Scrolls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map(relatedPost => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
    </>
  );
}
