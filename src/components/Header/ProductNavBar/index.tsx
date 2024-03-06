import React from 'react';
import Container from '@/components/Container';
import Search from '@/components/Search';
import { HeaderProps } from '@/types';
import ShoppingCart from './ShoppingCart';
import PersonalAcc from './PersonalAccount';
import Likes from './Likes';
import CatalogOfGoods from './Catalog';

import styles from './ProductNavBar.module.css';

const ProductNavBar: React.FC<HeaderProps> = ({ translation }) => (
  <div className={styles.background}>
    <Container className={styles.container}>
      <div className={styles.productNavBarChildren}>
        <CatalogOfGoods />
        <Search />
        <div className={styles.userInteractions}>
          <Likes />
          <ShoppingCart />
          <PersonalAcc personalAccount={translation.personalAccount} />
        </div>
      </div>
    </Container>
  </div>
);

export default ProductNavBar;
