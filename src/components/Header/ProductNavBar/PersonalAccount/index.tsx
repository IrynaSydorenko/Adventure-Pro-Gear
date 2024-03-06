import React from 'react';
import styles from './PersonalAccount.module.css';

interface PersonalAccProp {
  personalAccount: string;
}

const PersonalAcc: React.FC<PersonalAccProp> = ({ personalAccount }) => (
  <div className={styles.personalAcc}>{personalAccount}</div>
);

export default PersonalAcc;
