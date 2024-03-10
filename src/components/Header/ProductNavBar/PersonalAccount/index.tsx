import React from 'react';
import Image from 'next/image';
import Person from '@/../public/icons/Person.svg';
import styles from './PersonalAccount.module.css';

interface PersonalAccProp {
  personalAccount: string;
}

const PersonalAcc: React.FC<PersonalAccProp> = ({ personalAccount }) => (
  <div className={styles.personalAcc}>
    <Image src={Person} alt="person icon" width={24} height={24} />
  </div>
);

export default PersonalAcc;
