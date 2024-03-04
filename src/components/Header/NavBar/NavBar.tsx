import React from 'react';
import Link from 'next/link';
import { HeaderProps } from '../../../types/HeaderType';
import NavList from './NavList';
import PersonalAccLink from './PersonalAccLink';
import styles from '../Header.module.css';

const NavBar: React.FC<HeaderProps> = ({ translation, lang }) => (
  <nav className={styles.nav}>
    <h1 className={styles.h1}>
      <Link href="/">Adventure Pro Gear</Link>
    </h1>
    <NavList lang={lang} translation={translation} />
    <PersonalAccLink personalAccount={translation.personalAccount} />
  </nav>
);

export default NavBar;
