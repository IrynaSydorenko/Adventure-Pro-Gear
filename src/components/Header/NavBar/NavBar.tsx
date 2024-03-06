import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/../public/logo.svg';
import { HeaderProps } from '../../../types/HeaderType';
import NavList from './NavList';
import styles from '../Header.module.css';

const NavBar: React.FC<HeaderProps> = ({ translation, locale }) => (
  <nav className={styles.nav}>
    <Link href="/" className={styles.logo}>
      <Image src={logoImage} height={75} width={258} alt="logo" />
    </Link>

    <NavList locale={locale} translation={translation} />
  </nav>
);

export default NavBar;
