'use client';

import React, { useEffect, useState } from 'react';
import { AppRoutes } from '@/constants/routes';
import { Locale } from '@/i18n-config';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { useSession } from 'next-auth/react';
import ProfileMenu from '@/components/ProfileMenu';
import Link from 'next/link';
import styles from './DropDown.module.css';

interface DropDownProps {
  locale: Locale;
  isLinkClicked: () => void;
  personalAccount?: string;
  className?: string;
}

interface ProfileTranslations {
  menuData: string[];
}

const DropDown: React.FC<DropDownProps> = ({ locale, className, isLinkClicked }) => {
  const session = useSession();
  const [menuDataTranslation, setMenuDataTranslation] = useState<ProfileTranslations | undefined>();
  console.log(session);
  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await getAllTranslations(locale);
      const translationFunction = getTranslation(translations);
      setMenuDataTranslation(translationFunction('profile'));
    };

    loadTranslations();
  }, [locale]);
  return (
    <div className={`${className} ${styles.dropDown}`}>
      {session.data ? <span className={styles.dropdownSpan} /> : <span />}
      {session.data ? (
        <ProfileMenu
          menuData={menuDataTranslation && menuDataTranslation.menuData}
          className={styles.profileMenu}
          locale={locale}
        />
      ) : (
        <ul>
          <li>
            <Link href={`/${locale}${AppRoutes.SIGNIN}`} onClick={isLinkClicked}>
              Log In
            </Link>
          </li>
          <li>
            <Link href={`/${locale}${AppRoutes.SIGN_UP}`} onClick={isLinkClicked}>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
