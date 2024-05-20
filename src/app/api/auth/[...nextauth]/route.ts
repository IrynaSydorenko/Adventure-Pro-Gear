import NextAuth from 'next-auth';
import { options as authOptions } from '@/config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
