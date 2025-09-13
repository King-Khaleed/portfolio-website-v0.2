'use client';

import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SocialShare({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'Twitter',
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      Icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
        name: 'Facebook',
        Icon: Facebook,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    }
  ];

  return (
    <div className="flex items-center gap-2">
        <p className="text-sm font-medium mr-2">Share this scroll:</p>
      {platforms.map(({ name, Icon, href }) => (
        <Button key={name} variant="outline" size="icon" asChild>
          <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`}>
            <Icon className="h-5 w-5" />
          </Link>
        </Button>
      ))}
    </div>
  );
}
