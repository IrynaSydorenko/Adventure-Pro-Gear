import type { NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import { signInService } from '@/services/axios';
import { Route } from '@/constants/routes';

export const options: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return;

        const { email, password } = credentials;

        try {
          const user = await signInService({ email, password });
          console.log("USER: ", user.data)
          return user.data;
        } catch (error) {
          console.error('Authentication failed:', error);
          return null;
        }
      },
    }),
  ],
  secret: 'by21t4673gr732eiw', // Provide a secret for session encryption (keep it secure)
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role,
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: Route.SIGNIN,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
};
