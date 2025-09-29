// middleware.ts (in project root)
import authConfig from '@/auth/auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log('🔥 Middleware running:', {
    pathname: nextUrl.pathname,
    isLoggedIn,
    userEmail: req.auth?.user?.email,
    timestamp: new Date().toISOString(),
  });

  // Define your routes
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/verify-email',
  ].includes(nextUrl.pathname);

  const isAuthRoute = nextUrl.pathname.startsWith('/auth');

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Always allow API auth routes
  if (isApiAuthRoute) {
    console.log('✅ Allowing API auth route');
    return;
  }

  // Redirect authenticated users away from auth pages
  if (
    isAuthRoute &&
    isLoggedIn &&
    !nextUrl.pathname.startsWith('/auth/error')
  ) {
    console.log('🔄 Redirecting logged-in user away from auth page');
    return Response.redirect(new URL('/dashboard', nextUrl.origin));
  }

  // Protect routes that require authentication
  if (isProtectedRoute && !isLoggedIn) {
    console.log('🚫 Redirecting unauthenticated user to login');
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl.origin)
    );
  }

  console.log('✅ Allowing request to continue');
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
