import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AppRoutes } from '@/constants/routes';
import { getSession, GetSessionParams } from 'next-auth/react';
import { i18n } from './i18n-config';

console.log('Middleware is called!');
const publicRoutes = [
  `${AppRoutes.HOME}`,
  `${AppRoutes.SIGNIN}`,
  `${AppRoutes.SIGN_UP}`,
  '/contacts/',
  '/about_us/',
  '/policy/',
];

const filterUserRoutes = (arrayOfRoutes: string[]) => {
  return arrayOfRoutes.filter(
    route => route !== `${AppRoutes.SIGNIN}` && route !== `${AppRoutes.SIGN_UP}`
  );
};

const filteredPublicRoutes = filterUserRoutes(publicRoutes);

console.log('filteredPublicRoutes: ', filteredPublicRoutes);

const protectedUserRoutes = [...filteredPublicRoutes, '/user', '/blog/', '/personal_account/'];
const protectedAdminRoutes = [...protectedUserRoutes, '/admin'];

const convertToGetSessionParams = (req: NextRequest): GetSessionParams => ({
  req: {
    headers: {
      cookie: req.headers.get('cookie') ?? undefined,
    },
  },
});

export const getLocale = (request: NextRequest): string | undefined => {
  console.log('This function is called!');
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  console.log('negotiator headers: ', negotiatorHeaders);
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
};

export function hasLocale(pathname: string) {
  return i18n.locales.some(locale => pathname.startsWith(`/${locale}/`));
}

export async function getSessionAndRole(req: NextRequest) {
  const session = await getSession(convertToGetSessionParams(req));
  return session?.user?.role || 'guest';
}

export function checkAccess(role: string, pathname: string) {
  if (role === 'ADMIN') return true;
  if (role === 'USER' && protectedUserRoutes.includes(pathname)) return true;
  if (publicRoutes.includes(pathname)) {
    console.log('Includes: ', publicRoutes.includes(pathname));
    return true;
  }
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const pathNameWithQueryParams = req.url;
  console.log('pathNameWithQueryParams: ', pathNameWithQueryParams);
  console.log('PATH_NAME: ', pathname); // PATH_NAME:  /uk-UA/contacts/;

  // Check access rights first
  const role = await getSessionAndRole(req);
  console.log('ROLE: ', role);
  const isLocale = hasLocale(pathname);
  console.log('Has locale: ', isLocale);
  let parts = pathname.split('/'); // [ '', 'uk-UA', 'contacts', '' ]
  console.log(parts);
  const locale = parts.splice(1, 1)[0];
  let newPathname = parts.join('/');
  newPathname = newPathname === '//' ? '/' : newPathname;
  console.log('NewPathName', newPathname);
  const pathnameCleaned = isLocale ? newPathname : pathname;

  const isAllowed = checkAccess(role, pathnameCleaned);
  console.log('Is allowed: ', isAllowed);

  // http://localhost:3000/uk-UA/?auth=signin
  // http://localhost:3000/uk-UA/?auth=signin

  if (!isAllowed && isLocale) {
    const targetUrl = role === 'guest' ? `/${locale}${AppRoutes.SIGNIN}` : `/${locale}/error`;
    return NextResponse.redirect(new URL(targetUrl, req.url));
  } else if (!isAllowed) {
    const targetUrl =
      role === 'guest'
        ? `/${i18n.defaultLocale}${AppRoutes.SIGNIN}`
        : `/${i18n.defaultLocale}/error`;

    return NextResponse.redirect(new URL(targetUrl, req.url));
  }

  // Then handle locale redirection for authorized users
  if (!isLocale) {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}/${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
