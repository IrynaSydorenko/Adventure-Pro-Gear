import React from 'react';
import styles from '../Header.module.css';

interface PersonalAccLinkProp {
  personalAccount: string;
}

const PersonalAccLink: React.FC<PersonalAccLinkProp> = ({ personalAccount }) => (
  <div className={styles.personalAcc}>{personalAccount}</div>
);

export default PersonalAccLink;
