import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BookOpen,
  Contact,
  LayoutDashboard,
  LogOut,
  Palette,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { logout } from './actions';
import { getSupabaseServerClient } from '@/lib/supabase/server';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Palette },
  { href: '/admin/quiz-responses', label: 'Quiz Responses', icon: Bot },
  { href: '/admin/contacts', label: 'Contacts', icon: Contact },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen w-full flex bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
        <div className="flex items-center">
          <Logo />
        </div>
        <nav className="flex-1 space-y-2 py-8">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              className="w-full justify-start"
              asChild
              disabled={link.href === '#'}
            >
              <Link href={link.href}>
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="mt-auto">
           {user && (
             <div className="mb-4 p-2 text-sm text-center text-muted-foreground rounded-md bg-muted">
                <p className="font-medium">Signed in as</p>
                <p className="truncate">{user.email}</p>
             </div>
           )}
           <form action={logout}>
              <Button variant="outline" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
              </Button>
           </form>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
