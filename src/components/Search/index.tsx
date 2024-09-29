'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchIcon from '@/../public/icons/SearchIcon.svg';
import { AppRoutes } from '@/constants/routes';
import { Locale } from '@/i18n-config';
import { Url } from 'next/dist/shared/lib/router/router';
import styles from './Search.module.css';
import Button from '../Button';

interface SearchProps {
  placeholder: string;
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
  selfLink: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, products, unavailable, showall, locale }) => {
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
            .startsWith(value.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
    }
  }, [value, products, locale]);

  return (
    <div className={styles.search_box}>
      <input
        className={styles.search}
        placeholder={placeholder}
        value={value}
        onChange={handlerOnChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className={styles.search_icon}>
        <Image src={SearchIcon} alt="Search Icon" width={22} height={22} priority />
      </span>

      {isDropdownVisible && value.length >= 1 && (
        <ul className={styles.dropdown}>
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.slice(0, 5).map(product => (
                <button
                  className={styles.dropdown_li}
                  key={product.productId}
                  onClick={() => handleProductClick(product.productId)}
                >
                  <span className={styles.smallcard_icon}>
                    {/* <Image
                      alt='Product icon'
                      src={product.selfLink} width={80} height={80} /> */}
                    Icon
                  </span>
                  <div className={styles.smallcard_main}>
                    <span className={styles.smallcard_name}>
                      {locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
                    </span>
                    <span className={styles.smallcard_price}>{product.basePrice} ₴</span>
                  </div>
                </button>
              ))}
              <li key="dropdown-button" className={styles.dropdown_li_end}>
                <Button
                  className={styles.dropdown_button}
                  text={showall}
                  border="1px solid #1E5F72"
                  onClick={() => router.push(`${AppRoutes.PRODUCTS}`)}
                />
              </li>
            </>
          ) : (
            <li className={styles.smallcard_noproduct} key="no-product-found">
              {unavailable}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
