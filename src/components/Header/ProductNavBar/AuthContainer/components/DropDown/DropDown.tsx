'use client';

import React from 'react';
import { AppRoutes } from '@/constants/routes';
import Link from 'next/link';
import styles from './DropDown.module.css';

interface DropDownProps {
  locale: string | undefined;
  isLinkClicked: () => void;
  personalAccount?: string;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({ locale, className, isLinkClicked }) => (
  <div className={` ${className} ${styles.dropDown}`}>
    <span />
    <ul>
      <li>
        <Link href={`/${locale}${AppRoutes.SIGNIN}`} onClick={isLinkClicked}>
          Log In
        </Link>
      </li>
      <li>
        <Link href={`/${locale}${AppRoutes.SIGN_UP}`} onClick={isLinkClicked}>
          Sign Up
        </Link>
      </li>
    </ul>
  </div>
);

export default DropDown;
