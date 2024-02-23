import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './i18n-config';

const getLocale = (request: NextRequest): string | undefined => {
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

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    if (locale) {
      // Construct redirect URL with the determined locale
      return NextResponse.redirect(
        new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
      );
    } else {
      // Handle case where no suitable locale could be determined
      // For example, redirect to a default locale or display an error page
      return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, request.url));
    }
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
