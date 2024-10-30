import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import i18n from './i18n';
import log from 'loglevel';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname, searchParams } = request.nextUrl;
  const forceLogin = searchParams.get('force_login');
  const redirectTo = searchParams.get('redirectTo') || pathname;

  console.log('Received pathname:', pathname);
  console.log('SearchParams:', searchParams.toString());
  console.log('forceLogin:', forceLogin);
  console.log('redirectTo:', redirectTo);

  // Minimal fallback locale check
  if (!i18n.locales.some((locale) => pathname.startsWith(`/${locale}/`))) {
    const locale = i18n.defaultLocale;
    console.log(`Redirecting because locale is missing: /${locale}${pathname}`);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // Handle force login if required
  if (forceLogin && !token) {
    const signInPage = `/auth/signin?provider=keycloak&callbackUrl=${encodeURIComponent(redirectTo)}`;
    console.log('Force login required, no token found. Redirecting to:', signInPage);
    if (pathname !== signInPage) {
      return NextResponse.redirect(new URL(signInPage, request.url));
    }
  }

  console.log('No conditions met for redirection or force login. Proceeding with request.');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
