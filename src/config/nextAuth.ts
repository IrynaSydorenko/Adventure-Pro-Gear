import type { NextAuthOptions } from 'next-auth';
import { NextApiRequest } from 'next';
import { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { signInService, getUserInfoService, refreshTokenService, token as apiToken } from '@/services/axios';
import { Routes } from '@/constants/routes';

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
      type: "credentials",
      async authorize(credentials) {
        console.log("Credentials: ",credentials)
        if (!credentials) return;
        console.log("credentials: ",credentials)
        const { email, password } = credentials;

        try{
          const token = await signInService({ email, password });

          console.log("TOKEN: ", token);

          if(token.status >= 400){
          const errorMessage = token.data.message;
          throw new Error (
            typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)
          )
        }

        apiToken.access = token.data.accessToken;
        apiToken.refresh = token.data.refreshToken;

        console.log('APItoken: ',apiToken.access)

        const userInfo = await getUserInfoService(apiToken.access);

        console.log('USER INFO: ', userInfo)

        if (userInfo.status >= 400) {
          const errorMessage = userInfo.data.message;
          throw new Error(
            typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)
          );
        }
        
          const user = {
            ...userInfo.data,
            token: token.data,
            rememberMe: true,
        }
        console.log("Created user: ", user);

        if(user){
          console.log("Created user: ", user)
          return user
        }

        return null;
      } catch(error){
          throw new Error ((error as Error).message)
        }


      // try {
      //   const token = await signInService({ email, password });
      //   console.log("TOKEN: ", token.data);
      //   const updatedTokenData = {
      //     ...token.data,
      //     email: email,
      //     password: password
      //   };
      
      //   // Merge the new object with the existing token data
      //   const updatedToken = {
      //     ...token,
      //     data: updatedTokenData
      //   };
      //   return updatedToken.data
      //   // const user = await getUserInfoService();
      //   // return user.data;
      // } catch (error) {
      //   console.error('Authentication failed:', error);
      //   return null;
      // }

        

        // try {
        //   const user = await signInService({ email, password });
        //   console.log("USER: ", user.data)
        //   return user.data;
        // } catch (error) {
        //   console.error('Authentication failed:', error);
        //   return null;
        // }


        // try {
        //   const token = await signInService(credentials);
        //   console.log("TOKEN: ", token.data);
          
        //   // Fetch user information
        //   // const userInfo = await getUserInfoService();
      
        //   // Combine user information with token data
        //   const user = {
        //     ...credentials, // Assuming userInfo contains user data
        //     token: token.data,
        //     // id: userInfo.data.id.toString(),
        //     rememberMe: true,
        //   };
      
        //   // Return both user and token
        //   return user;
        // } catch (error) {
        //   console.error('Authentication failed:', error);
        //   return null;
        // }
      },
    }),
  ],
  secret: 'by21t4673gr732eiw', // Provide a secret for session encryption (keep it secure)
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("JWT callback: ", {token, user, session})
      if (user) {
        token = { ...token, ...user }
      }
      if (user && 'token' in user) {
        const extUser = user as ExtendedUser;
        console.log('extUser: ', extUser)
        if(extUser.token.accessToken){
          const decoded = jwtDecode<JwtPayload>(extUser.token.accessToken);
          const exp = (decoded.exp as number) * 1000;
          
          if (Date.now() > exp) {
            try {
              const refreshedToken = await refreshTokenService(extUser.token.refreshToken);
              const tokens = refreshedToken.data;
              console.log('REFRESHTOKEN: ', tokens.refreshToken, tokens )
              {/*@ts-ignore*/}
              if (refreshedToken.accessToken) {
                {/*@ts-ignore*/}
                extUser.token.accessToken = tokens.accessToken;
                {/*@ts-ignore*/}
                apiToken.access = tokens.accessToken;
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              {/*@ts-ignore*/}
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
        console.log("DeepClone:", deepClone)
        session.user = { ...deepClone };
      }
      console.log("Session callback: ",{session, token, user});
      return {...session};
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: Routes.SIGNIN,
  },
  // jwt: {
  //   maxAge: 60 * 60 * 24 * 30,
  // },
};
