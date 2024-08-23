import React from 'react';
import Container from '@/components/Container';
import Search from '@/components/Search';
import { HeaderProps } from '@/types';
import ShoppingCart from './ShoppingCart';
import AuthContainer from './AuthContainer';
import Likes from './Likes';
import CatalogOfGoods from './Catalog';
import styles from './ProductNavBar.module.css';

const ProductNavBar: React.FC<HeaderProps> = ({ translation, locale, products }) => (
  <div className={styles.background}>
    <Container className={styles.container}>
      <div className={styles.productNavBarChildren}>
        <CatalogOfGoods catalog={translation.catalog} />
        <Search search={translation.search} />
        <div className={styles.userInteractions}>
          <Likes />
          <ShoppingCart />
          <AuthContainer personalAccount={translation.personalAccount} locale={locale} />
          <div className={styles.overlay} />
        </div>
      </div>
    </Container>
  </div>
);

export default ProductNavBar;
