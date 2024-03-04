'use client';

import React from 'react';
import { NextPage } from 'next';
import { HeaderProps } from '../../types/HeaderType';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import styles from './Header.module.css';

const Header: NextPage<HeaderProps> = ({ translation, lang }) => (
  <header className={styles.header}>
    <Container>
      <NavBar translation={translation} lang={lang} />
    </Container>
    <ProductNavBar />
  </header>
);

export default Header;
