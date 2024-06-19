import SignOutButton from '@/components/SignOutButton';
import { Locale } from '@/i18n-config';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import React from 'react';

interface PersonalAccountProps {
  params: {
    lang: Locale;
  };
}

const PersonalAccount: React.FC<PersonalAccountProps> = ({ params }) => {
  return (
    <>
      <p>Welcome! This is your personal account.</p>
      <SignOutButton />
    </>
  );
};

export default PersonalAccount;
