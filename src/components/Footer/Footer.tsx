'use client';

import React from 'react';
import { NextPage } from 'next';
import { FooterProps } from '../../types/FooterType';
import styles from './Footer.module.css';
import FooterLinks from './FooterLinks';
import FooterForm from './FooterForm';
import FooterBottom from './FooterBottom';

const Footer: NextPage<FooterProps> = ({ translation}) =>(
    <footer className={styles.footer}>
        <FooterLinks translation={translation}/>
        <FooterForm translation={translation}/>
        <FooterBottom translation={translation}/>

    </footer>
) 
export default Footer;

