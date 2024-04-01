import type { NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import { signUpService } from '@/services/axios';
import { Route } from '@/constants/routes';

export const options: NextAuthOptions = {
  providers: [
    credentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'Name' },
        surname: { label: 'Surname', type: 'text', placeholder: 'Surname' },
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        try {
          // Call signUpService to register the user
          const user = await signUpService(credentials);
          // Return the user data upon successful registration
          return user.data;
        } catch (error) {
          // Handle authentication failures
          console.error('Authentication failed:', error);
          return null;
        }
      },
    }),
  ],
  secret: '', // Provide a secret for session encryption (keep it secure)
  callbacks: {
    async session({ session, user }) {
      // Return the session data
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Modify the JWT token if necessary
      return token;
    },
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // Set the session max age (in seconds)
  },
  pages: {
    signIn: Route.SIGN_UP, // Specify the sign-in page route
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // Set the JWT max age (in seconds)
  },
};
