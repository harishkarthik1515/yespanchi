import { NextResponse, type NextRequest } from 'next/server';

/**
 * Admin console lives at a secret URL: https://<site>/<ADMIN_PATH>.
 * The real route (/console-internal) is never reachable directly, it always 404s.
 * The URL only hides the door; Firebase Auth + the "admins" allowlist + security rules are what protect the data.
 */
const INTERNAL = '/console-internal';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === INTERNAL || pathname.startsWith(`${INTERNAL}/`)) {
    return NextResponse.rewrite(new URL('/not-found-page', req.url));
  }
  const secret = (process.env.ADMIN_PATH ?? '').replace(/^\/+|\/+$/g, '');
  // Short or placeholder secrets are refused so the console is never exposed by accident.
  if (secret.length >= 12 && !secret.startsWith('YOUR_') && pathname === `/${secret}`) {
    const res = NextResponse.rewrite(new URL(INTERNAL, req.url));
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
