'use client';

import React, { useState } from 'react';
import styles from './Search.module.css';

function Search() {
  const [value, setValue] = useState('');
  return (
    <div>
      <input
        className={styles.search}
        placeholder="Search"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
