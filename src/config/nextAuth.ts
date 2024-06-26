import type { NextAuthOptions } from 'next-auth';
import axios from 'axios';
import { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import {
  signInService,
  getUserInfoService,
  refreshTokenService,
  token as apiToken,
} from '@/services/axios';
import { AppRoutes } from '@/constants/routes';

interface ExtendedUser extends User {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

const _ = require('lodash');

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      async authorize(credentials) {
        console.log('Credentials: ', credentials);
        if (!credentials) return;
        const { email, password } = credentials;
        console.log('Email, Password: ', email, password);
        try {
          const token = await signInService({ email, password });
          console.log('TOKEN: ', token);

          apiToken.access = token.data.accessToken;
          apiToken.refresh = token.data.refreshToken;

          console.log('APItoken: ', apiToken.access);

          const userInfo = await getUserInfoService(apiToken.access);

          console.log('USER INFO: ', userInfo.data);

          if (userInfo.data.status >= 400) {
            const errorMessage = userInfo.data.message;
            throw new Error(
              typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)
            );
          }

          const user = {
            ...userInfo.data,
            token: token.data,
            rememberMe: true,
          };
          console.log('Created user: ', user);

          if (user) {
            console.log('Created user: ', user);
            return user;
          }

          return null;
        } catch (error) {
          console.log(error, (error as Error).message);
          if (axios.isAxiosError(error)) {
            // This means the error is an Axios error and you can handle it accordingly
            if (error.response) {
              console.log('Error response data:', error.response.data);
              const errorMessage =
                error.response.data.message ||
                error.response.data.errorMessage ||
                'An unknown error occurred';
              throw new Error(errorMessage);
            } else {
              console.log('Error without response data:', error);
              throw new Error('No response received');
            }
          } else {
            // Handle non-Axios errors
            console.log('Non-Axios error:', error);
            throw new Error((error as Error).message);
          }
          // return error;
        }
      },
    }),
  ],
  secret: 'by21t4673gr732eiwyufetrg764367fg',
  callbacks: {
    async jwt({ token, user, session }) {
      console.log('JWT callback: ', { token, user, session });
      if (user) {
        token = { ...token, ...user };
      }
      if (user && 'token' in user) {
        const extUser = user as ExtendedUser;
        console.log('extUser: ', extUser);
        if (extUser.token.accessToken) {
          const decoded = jwtDecode<JwtPayload>(extUser.token.accessToken);
          const exp = (decoded.exp as number) * 1000;

          if (Date.now() > exp) {
            try {
              const refreshedToken = await refreshTokenService(extUser.token.refreshToken);
              const tokens = refreshedToken.data;
              console.log('REFRESHTOKEN: ', tokens.refreshToken, tokens);
              if (tokens.accessToken) {
                extUser.token.accessToken = tokens.accessToken;
                apiToken.access = tokens.accessToken;
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              // @ts-ignore
              token.token.error = 'Failed to refresh session.';
            }
          }
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.token) {
        const deepClone = _.cloneDeep(token);
        console.log('DeepClone:', deepClone);
        session.user = { ...deepClone };
      }
      console.log('Session callback: ', { session, token, user });
      return { ...session };
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: AppRoutes.SIGNIN,
  },
};
