import React from 'react';
import Image from 'next/image';
import Favourites from '@/../public/icons/Favourites.svg';
import styles from './Likes.module.css';

function Likes() {
  return (
    <div className={styles.like}>
      <Image src={Favourites} alt="likes icon" width={24} height={24} />
    </div>
  );
}

export default Likes;
