import React from 'react';
import { options } from '@/config';
import { getServerSession } from 'next-auth/next';
import Hiro from '@/components/Hero/Hero';
import AuthModal from '@/components/AuthModal';

const Page = async ({ params }: { params: { lang: string } }) => {
  const session = await getServerSession(options);
  console.log("session: ", session)
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
      <AuthModal locale={params.lang}/>
    </>
  );
};

export default Page;
