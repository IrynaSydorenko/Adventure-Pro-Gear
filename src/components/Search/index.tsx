'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchIcon from '@/../public/icons/SearchIcon.svg';
import styles from './Search.module.css';
import { getProducts } from '@/services/axios';
import Button from '../Button';
import { AppRoutes } from '@/constants/routes';
import App from 'next/app';
import { Locale } from '@/i18n-config';

interface SearchProps {
  search: string;
  unavailable: string;
  showall: string;
  products: any[];
  locale: Locale;
}

interface Product {
  productId: string;
  productNameUa: string;
  productNameEn: string;
  basePrice: number;
}

const Search: React.FC<SearchProps> = ({ search, products, unavailable, showall, locale }) => {
  const [value, setValue] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const router = useRouter();

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };
  
  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 200);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`${AppRoutes.PRODUCTS}`);
    }
  };

  useEffect(() => {
    try {
      if (value.length >= 1) {
        const filtered = products.filter(product =>
          (locale === 'uk-UA' ? product.productNameUa : product.productNameEn)
            .toLowerCase()
            .startsWith(value.toLowerCase()));
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [value, products, locale]);

  return (
    <div className={styles.search_box}>
      <input
        className={styles.search}
        placeholder={search}
        value={value}
        onChange={handlerOnChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className={styles.search_icon}>
        <Image src={SearchIcon} alt="Search Icon" width={22} height={22} priority  />
      </span>

      {isDropdownVisible && value.length >= 1 && (
        <ul className={styles.dropdown}>
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.slice(0, 5).map((product) => (
                <li className={styles.dropdown_li} key={product.productId}
                  onClick={() => handleProductClick(product.productId)}>
                    <span className={styles.smallcard_icon}>
                      Icon
                    </span>
                  <div className={styles.smallcard_main}>
                    <span className={styles.smallcard_name}>
                      {locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
                    </span>
                    <span className={styles.smallcard_price}>{product.basePrice} ₴</span>
                  </div>
                </li>
              ))}
              <li key='dropdown-button' className={styles.dropdown_li_end}
                onClick={() => router.push(`${AppRoutes.PRODUCTS}`)}>
                <Button 
                  className={styles.dropdown_button} 
                  text={showall}
                  border= '1px solid #1E5F72' />
              </li>
            </>
          ) : (
            <li className={styles.smallcard_noproduct} key="no-product-found">{unavailable}</li>
          )}
        </ul>
      )}
    </div>
  );
};


export default Search;