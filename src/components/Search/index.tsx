'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SearchIcon from '@/../public/icons/SearchIcon.svg';
import styles from './Search.module.css';

interface SearchProps {
  search: string;
}

const Search: React.FC<SearchProps> = ({ search }) => {
  const [value, setValue] = useState('');
  return (
    <input
      className={styles.search}
      placeholder={`${search}`}
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default Search;
