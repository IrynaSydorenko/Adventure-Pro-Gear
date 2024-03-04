'use client';

import React, { useState } from 'react';

function Search() {
  const [value, setValue] = useState('');
  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
