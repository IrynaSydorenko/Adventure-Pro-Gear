import React from 'react';
import Image from 'next/image';
import Grids from '@/../public/icons/Grid.svg';
import styles from './Catalog.module.css';

interface SearchProps {
  catalog: string;
}

const CatalogOfGoods: React.FC<SearchProps> = ({ catalog }) => (
  <div className={styles.catalog}>
    <Image className={styles.icon} src={Grids} width={22} height={22} alt="grid icon" />
    <p>{catalog}</p>
  </div>
);

export default CatalogOfGoods;
