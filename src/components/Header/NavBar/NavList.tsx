'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '../../../types/HeaderType';
import styles from '../Header.module.css';
import LangLinks from './LangLinks';

const NavList: React.FC<HeaderProps> = ({ translation, lang }) => {
  const path = usePathname();
  const navLinks = [
    {
      type: 'link',
      href: `/about_us`,
      text: translation.aboutUs,
    },
    { type: 'link', text: translation.blog, href: `/blog` },
    { type: 'link', text: translation.contacts, href: `/contacts` },
    { type: 'langLink' },
  ];
  return (
    <ul className={styles.navList}>
      {navLinks.map(({ type, text, href }, index) => {
        if (type === 'langLink') return <LangLinks key={index} language={translation.lang} />;

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
