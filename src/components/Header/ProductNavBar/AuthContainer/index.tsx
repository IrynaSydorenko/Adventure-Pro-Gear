import React from 'react';
import Image from 'next/image';
import Person from '@/../public/icons/Person.svg';
import DropDown from './components/DropDown/DropDown';
import styles from './AuthContainer.module.css';

interface AuthContainerProps {
  locale: string | undefined;
  personalAccount: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ personalAccount, locale }) => (
  <div className={styles.authContaner}>
    <Image src={Person} alt="person icon" width={24} height={24} />
    <DropDown locale={locale} personalAccount={personalAccount} />
  </div>
);

export default AuthContainer;
