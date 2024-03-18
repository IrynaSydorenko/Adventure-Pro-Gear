'use client';
import React from 'react';
import Link from 'next/link';
import { FooterProps } from '@/types/FooterType';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';

const LinksSupport: React.FC<FooterProps> = ({ translation}) => {
    const path = usePathname();
      const informationLinks = [
        { type: 'link', text: translation.guarantee, href: `/guarantee` },
        { type: 'link', text: translation.delivery, href: `/delivery` },
        { type: 'link', text: translation.payment, href: `/payment` },
        { type: 'link', text: translation.returnAndExchanges, href: `/returnandchange` },
      ];
    return (
        <div className={styles.informationLinksList}>
            {informationLinks.map(({type, text, href}, index) =>{
                return <Link className={styles.informationLinksListElements} href={href} target="_blank">{text}</Link>
            })}
        </div>
    )
}
export default LinksSupport;