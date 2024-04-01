import React from 'react';
import { options } from '@/config';
import { getServerSession } from 'next-auth/next';
import Hiro from '@/components/Hero/Hero';
import AuthModal from '@/components/AuthModal';

const Page = async ({ params }: { params: { lang: string } }) => {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <>
          <Hiro />
          <h2>Authenticated</h2>
        </>
      ) : (
        <>
          <Hiro />
          <h2>Not Authenticated</h2>
        </>
      )}
      <AuthModal />
    </>
  );
};

export default Page;
