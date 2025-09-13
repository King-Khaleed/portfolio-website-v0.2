import { Wand2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold", className)}>
      <Wand2 className="h-6 w-6 text-accent" />
      <span className="font-headline text-foreground">Wizardfolio</span>
    </Link>
  );
}
