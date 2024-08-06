'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchIcon from '@/../public/icons/SearchIcon.svg';
import styles from './Search.module.css';
import { getProducts } from '@/services/axios';

interface SearchProps {
  search: string;
}

interface Product {
  id: string;
  name: string;
}

const productsList: Product[] = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Apple11' },
  { id: '5', name: 'Banana11' },
  { id: '6', name: 'Cherry11' },
  { id: '7', name: 'Apple22' },
  { id: '8', name: 'Banana22' },
  { id: '9', name: 'Cherry22' },
  { id: '10', name: 'Apple33' },
  { id: '11', name: 'Banana33' },
  { id: '12', name: 'Cherry33' },
  { id: '13', name: 'Apple44' },
  { id: '14', name: 'Banana44' },
  { id: '15', name: 'Cherry44' },
  { id: '16', name: 'Apple55' },
  { id: '17', name: 'Banana55' },
  { id: '18', name: 'Cherry55' },
  { id: '19', name: 'Cherry67' },
  { id: '20', name: 'Watermelon' },
];


const Search: React.FC<SearchProps> = ({ search }) => {
  const [value, setValue] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log("value", value);
  };

  useEffect(() => {
    try {
      if (value.length >= 1) {
        console.log("productsList", productsList);
        const filtered = productsList.filter(product =>
          product.name.toLowerCase().startsWith(value.toLowerCase()));
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.log(error);
    };
  }, [value]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className={styles.search_box}>
      <input
        className={styles.search}
        placeholder={search}
        value={value}
        onChange={handlerOnChange}
      />

      {value.length >= 1 && (
        <ul className={styles.dropdown}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <li className={styles.dropdown_li} key={product.id} onClick={() => handleProductClick(product.id)}>
                {product.name}
              </li>
            ))
          ) : (
            <li>Такого товару нема</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
