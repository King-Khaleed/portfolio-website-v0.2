import { Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wizardfolio. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/firebase/studio" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <Twitter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
