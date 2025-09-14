import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  console.log(`Middleware check on: ${url.pathname}`);

  // Protect admin routes
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    if (!user) {
      console.log('No user found, redirecting to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
     console.log('User found, allowing access to admin route.');
  }

  // Redirect authenticated users from login page to dashboard
  if (url.pathname === '/admin/login' && user) {
     console.log('User is authenticated and on login page, redirecting to /admin/dashboard');
     return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return supabaseResponse
}
