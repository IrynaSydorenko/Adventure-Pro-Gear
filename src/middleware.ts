import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import Negotiator from 'negotiator';
import { i18n } from './i18n-config';
import { getSession } from 'next-auth/react';

// export { default } from 'next-auth/middleware';

const protectedAdminRoutes = ['/admin'];
const protectedUserRoutes = ['/user'];

const getUserStatus = (role: string | null) => {
  if (role === 'admin') {
    return 'admin'
  } else if (role === 'user') {
    return 'user'
  } else {
    return 'guest'
  }
}

const getRequiredStatus = (pathname: string) => {
  if (protectedAdminRoutes.includes(pathname)) {
    return 'admin'
  } else if (protectedUserRoutes.includes(pathname)) {
    return 'user'
  } else {
    return 'guest'
  }
}

export const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  console.log(negotiatorHeaders);

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
};

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  // @ts-ignore
  const session = await getSession(req);
  const userStatus = getUserStatus(session?.user?.role);
  const requiredStatus = getRequiredStatus(req.nextUrl.pathname);

  if (userStatus !== requiredStatus) {
    if (userStatus === 'guest') {
      return NextResponse.redirect('/')
    } else {
      return NextResponse.redirect('/error')
    }
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    if (locale) {
      // Construct redirect URL with the determined locale
      return NextResponse.redirect(
        new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url)
      );
    } else {
      // Handle case where no suitable locale could be determined
      // For example, redirect to a default locale or display an error page
      return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, req.url));
    }
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
