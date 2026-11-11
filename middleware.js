import { NextResponse } from 'next/server';

const APEX_HOST = 'prestigeinkllc.com';

export function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase();
  const hostname = host.split(':')[0];

  // Keep production traffic on the parent/apex domain.
  if (hostname === `www.${APEX_HOST}`) {
    const url = request.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = 'https';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|site|vendor).*)'],
};
