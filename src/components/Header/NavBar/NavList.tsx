'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '../../../types/HeaderType';
import styles from '../Header.module.css';
import LangLinks from './LangLinks';

const NavList: React.FC<HeaderProps> = ({ translation, locale }) => {
  const path = usePathname();
  const navLinks = [
    {
      type: 'link',
      href: `/${locale}/about_us`,
      text: translation.aboutUs,
    },
    { type: 'link', href: `/${locale}/blog`, text: translation.blog },
    { type: 'link', href: `/${locale}/contacts`, text: translation.contacts },
    { type: 'langLink' },
  ];
  return (
    <ul className={styles.navList}>
      {navLinks.map(({ type, href, text }, index) => {
        if (type === 'langLink') {
          return <LangLinks key={index} languages={translation.lang} locale={locale} />;
        }

        if (href) {
          return (
            <li className={styles.navItem} key={index}>
              <Link href={href}>{text}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavList;
