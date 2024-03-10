import React from 'react';
import Image from 'next/image';
import ShoppingBag from '@/../public/icons/ShoppingBag.svg';
import styles from './ShoppingCart.module.css';

function ShoppingCart() {
  return (
    <div className={styles.shoppingCart}>
      <Image src={ShoppingBag} alt="shopping bag icon" width={24} height={24} />
    </div>
  );
}

export default ShoppingCart;
