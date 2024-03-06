import React from 'react';
import Image from 'next/image';
import ShoppingBag from '@/../public/icons/ShoppingBag.svg';

function ShoppingCart() {
  return (
    <div>
      <Image src={ShoppingBag} alt="shopping bag icon" width={22} height={22} />
    </div>
  );
}

export default ShoppingCart;
