import SignOutButton from '@/components/SignOutButton';
import { getTranslation, getAllTranslations } from '@/dictionaries/dictionaries';
import { Locale } from '@/i18n-config';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import React from 'react';

interface PersonalAccountProps {
  params: {
    lang: Locale;
  };
}

const PersonalAccount: React.FC<PersonalAccountProps> = async ({ params }) => {
  // const translations = await getAllTranslations(params.lang);
  // const getFunc = getTranslation(translations);
  // const profileMenuData = getFunc('profile');
  return (
    <>
      <p>Welcome! This is your personal account.</p>
      <SignOutButton />
    </>
  );
};

export default PersonalAccount;
