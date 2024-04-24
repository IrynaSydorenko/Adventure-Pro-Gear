import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { Routes } from '@/constants/routes'
import { i18n } from './i18n-config';
import { getSession, GetSessionParams } from 'next-auth/react';


const publicRoutes = [`${Routes.HOME}`, `${Routes.SIGNIN}`, `${Routes.SIGN_UP}`, '/contacts/', '/about_us/'];
const protectedUserRoutes = [...publicRoutes, '/user', '/blog/'];
const protectedAdminRoutes = ['/admin'];

const convertToGetSessionParams = (req: NextRequest): GetSessionParams => ({
  req: {
      headers: {
          cookie: req.headers.get('cookie') ?? undefined
      }
  }
});

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
    console.log("Includes: ", publicRoutes.includes(pathname))
    return true
  };
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("PATH_NAME: ", pathname) // PATH_NAME:  /uk-UA/contacts/;

  // Check access rights first
  const role = await getSessionAndRole(req);
  console.log('ROLE: ', role)
  const isLocale = hasLocale(pathname);
  let parts = pathname.split('/'); // [ '', 'uk-UA', 'contacts', '' ]
  console.log(parts)
  const locale = parts.splice(1, 1); 
  let newPathname = parts.join('/'); 
  newPathname = newPathname === "//" ? "/" : newPathname;
  console.log(newPathname);
  const pathnameCleaned = isLocale ? newPathname : pathname;

  const isAllowed = checkAccess(role, pathnameCleaned);
  console.log("Is allowed: ", isAllowed)

  // http://localhost:3000/uk-UA/?auth=signin
  // http://localhost:3000/uk-UA/?auth=signin

  if (!isAllowed && isLocale) {
    const targetUrl = role === 'guest' ? ('/' + locale + Routes.SIGNIN) :  ('/' + locale + '/error');
    return NextResponse.redirect(new URL(targetUrl, req.url));
  } else if (!isAllowed) {
    const targetUrl = role === 'guest' ? ('/' + i18n.defaultLocale + Routes.SIGNIN) :  ('/' + i18n.defaultLocale + '/error');
    return NextResponse.redirect(new URL(targetUrl, req.url));
  }

  // Then handle locale redirection for authorized users
  if (!isLocale) {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};













// export const config = {
//   matcher: ['/:path*'],
// };



// const getUserStatus = (role: string | null) => {
//   if (role === 'ADMIN') {
//     return 'admin'
//   } else if (role === "USER") {
//     return 'user'
//   } else {
//     return 'guest'
//   }
// }

// const getRequiredStatus = (pathname: string) => {
//   if (protectedAdminRoutes.includes(pathname)) {
//     return 'admin'
//   } else if (protectedUserRoutes.includes(pathname)) {
//     return 'user'
//   } else {
//     console.log('PATH_NAME: ', pathname)
//     return 'guest'
//   }
// }

// export const middleware = async (req: NextRequest) => {
//   const pathname = req.nextUrl.pathname;
//   console.log('REQUEST: ', req);
//   // const token = await getToken( req );
//   // console.log('Token from middleware: ', token)
//   const session = await getSession(convertToGetSessionParams(req));
//   console.log('Session from request: ', session)
//   const userStatus = getUserStatus(session?.user?.role);
//   console.log('UserStatus: ', userStatus)
//   const requiredStatus = getRequiredStatus(req.nextUrl.pathname);
//   console.log("Required status: ", requiredStatus)

//   // if (userStatus !== requiredStatus) {
//   //   if (userStatus === 'guest' || userStatus === 'user' || userStatus === 'admin') {
//   //     return NextResponse.redirect('http://localhost:3000/uk-UA/')
//   //   } else {
//   //     return NextResponse.redirect('http://localhost:3000/uk-UA/error')
//   //   }
//   // }

//   // Check if there is any supported locale in the pathname
//   const pathnameIsMissingLocale = i18n.locales.every(
//     locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(req);

//     // e.g. incoming request is /products
//     // The new URL is now /en-US/products
//     if (locale) {
//       // Construct redirect URL with the determined locale
//       return NextResponse.redirect(
//         new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, req.url)
//       );
//     } else {
//       // Handle case where no suitable locale could be determined
//       // For example, redirect to a default locale or display an error page
//       return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${pathname}`, req.url));
//     }
//   }
// };

// export const getRole = async (req: NextRequest) => {
//   const pathname = req.nextUrl.pathname;
//   console.log('REQUEST: ', req);
//   // const token = await getToken( req );
//   // console.log('Token from middleware: ', token)
//   const session = await getSession(convertToGetSessionParams(req));
//   console.log('Session from request: ', session)
//   const userStatus = getUserStatus(session?.user?.role);
//   console.log('UserStatus: ', userStatus)
//   const requiredStatus = getRequiredStatus(pathname);
//   console.log("Required status: ", requiredStatus)

//   if (userStatus !== requiredStatus) {
//     if (userStatus === 'guest') {
//       return NextResponse.redirect('http://localhost:3000/')
//     } else {
//       return NextResponse.redirect('http://localhost:3000/error')
//     }
//   }
// }


