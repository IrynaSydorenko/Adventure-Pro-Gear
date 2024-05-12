import NextAuth from 'next-auth/next';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      surname: string;
      role?: 'admin' | 'user' | 'guest';
    } & DefaultSession['guest'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'admin' | 'user' | 'guest';
  }
}
