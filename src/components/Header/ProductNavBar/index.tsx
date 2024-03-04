import React from 'react';
import Container from '@/components/Container';
import Search from '@/components/Search';
import ShoppingCart from './ProductNavBarChildren/ShoppingCart';
import CatalogOfGoods from './ProductNavBarChildren/Catalog/Catalog';
import styles from './ProductNavBar.module.css';

function ProductNavBar() {
  return (
    <div className={styles.background}>
      <Container>
        <div className={styles.productNavBarChildren}>
          <CatalogOfGoods />
          <Search />
          <ShoppingCart />
        </div>
      </Container>
    </div>
  );
}

export default ProductNavBar;
