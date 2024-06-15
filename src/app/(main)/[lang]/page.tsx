import React from 'react';
import { options } from '@/config';
import { Locale } from '@/i18n-config';
import Container from '@/components/Container';
import { getServerSession } from 'next-auth/next';
import Hiro from '@/components/Hero/Hero';
import SignOutButton from '@/components/SignOutButton';
import AuthModal from '@/components/AuthModal';

const Page = async ({ params }: { params: { lang: Locale } }) => {
  const session = await getServerSession(options);
  console.log('session: ', session);
  return (
    <>
      {session ? (
        <>
          <Hiro />
          <h2>Authenticated</h2>
          <SignOutButton />
        </>
      ) : (
        <>
          <Hiro />
          <h2>Not Authenticated</h2>
        </>
      )}
      <AuthModal locale={params.lang} />
    </>
  );
};

export default Page;
