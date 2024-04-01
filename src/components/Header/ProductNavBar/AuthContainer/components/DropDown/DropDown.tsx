'use client';

import React, { useState } from 'react';
import { Route } from '@/constants/routes';
import Link from 'next/link';
import styles from './DropDown.module.css';

interface DropDownProps {
  locale: string | undefined;
  personalAccount?: string;
}

const DropDown: React.FC<DropDownProps> = ({ locale }) => (
  <div className={styles.dropDown}>
    <span />
    <ul>
      <li>
        <Link href='/'>Log In</Link>
      </li>
      <li>
        <Link href={`/${locale}${Route.SIGN_UP}`}>Sign Up</Link>
      </li>
    </ul>
  </div>
);
  
export default DropDown;
