'use client';
import React from 'react';
import { FooterProps } from '../../types/FooterType';
import styles from './Footer.module.css';

const FooterBottom: React.FC<FooterProps> = ({ translation}) => {
    const bottonFooterText=translation.footBottomContentText
    return (
        <div className={styles.footerBottomContainer}>
            <div className={styles.footerBottomText}>{bottonFooterText}</div>
        </div>
    )
}
export default FooterBottom;
