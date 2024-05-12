import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { options as authOptions } from '@/config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
