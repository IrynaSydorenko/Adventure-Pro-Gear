'use client';

import React from 'react';
import Link from 'next/link';
import useNav from '@/hooks/useNav';
import { Locale } from '../../../../../i18n-config';
import styles from './Header.module.css';
// import { usePathname } from 'next/navigation';

type HeaderProps = {
  translation: {
    cart: string;
  };
  lang: Locale;
};

const Header = ({ translation, lang }: HeaderProps) => {
  // const pathName = usePathname();
  const { ukLink, enLink } = useNav();
  const langLinks = [
    {
      href: ukLink,
      anchor: 'UA',
    },
    {
      href: enLink,
      anchor: 'EN',
    },
  ];

  const handleLanguageChange = (selectedLanguage: string) => {
    document.cookie = `preferredLanguage=${selectedLanguage}; path=/; max-age=31536000`;
  };
  return (
    <header>
      <div>
        Header
        {/* <button>{translation.cart}</button> */}
        {langLinks.map((link, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <span className={styles.separator} />}
            <Link
              className={styles.langugeLink}
              href={link.href}
              onClick={() => handleLanguageChange(link.anchor)}
            >
              {link.anchor}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </header>
  );
};

export default Header;
