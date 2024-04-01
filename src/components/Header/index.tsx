'use client';

import React from 'react';
import { NextPage } from 'next';
import { HeaderProps } from '../../types/HeaderType';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import styles from './Header.module.css';

const Header: NextPage<HeaderProps> = ({ translation, locale }) => (
  <header className={styles.header}>
    <Container>
      <NavBar translation={translation} locale={locale} />
    </Container>
    <ProductNavBar translation={translation} locale={locale} />
  </header>
);

export default Header;
