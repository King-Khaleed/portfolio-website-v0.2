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

  // Protect admin routes: if user is not logged in and is trying to access an admin page (that isn't the login page), redirect to login.
  if (!user && url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    console.log('No user found, redirecting to /admin/login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is logged in and tries to access the login page, redirect to the dashboard.
  if (user && url.pathname === '/admin/login') {
     console.log('User is authenticated and on login page, redirecting to /admin/dashboard');
     return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  if (user) {
    console.log('User found, allowing access.');
  } else {
    console.log('No user found, but path is public or login page.');
  }

  return supabaseResponse
}
