'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import Person from '@/../public/icons/Person.svg';
import DropDown from './components/DropDown/DropDown';
import styles from './AuthContainer.module.css';

interface AuthContainerProps {
  locale: Locale;
  personalAccount: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ personalAccount, locale }) => {
  const [isDropdownOpen, setIsOpen] = useState(false);
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log('Value returned by useRef: ', dropdownRef);

  const toggleDropdown = () => setIsOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        console.log('Event target: ', event.target);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isLinkClicked) {
      setIsOpen(false);
      setIsLinkClicked(false);
    }
  }, [isLinkClicked]);

  return (
    <>
      <div className={isDropdownOpen ? styles.overlay : styles.noOverlay} />
      <div className={styles.authContaner} ref={dropdownRef}>
        <Image src={Person} alt="person icon" width={24} height={24} onClick={toggleDropdown} />
        <DropDown
          locale={locale}
          personalAccount={personalAccount}
          isLinkClicked={() => setIsLinkClicked(true)}
          className={
            isDropdownOpen ? styles.dropDownContainerVisible : styles.dropDownContainerInvisible
          }
        />
      </div>
    </>
  );
};

export default AuthContainer;
