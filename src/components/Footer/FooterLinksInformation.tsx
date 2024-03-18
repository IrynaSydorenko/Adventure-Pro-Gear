'use client';
import React from 'react';
import Link from 'next/link';
import { FooterProps } from '@/types/FooterType';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';

const LinksInformation: React.FC<FooterProps> = ({ translation}) => {
    const path = usePathname();
    // const informationLinks = [
    //     { type: 'link', text: translation.aboutus, href: `/${locale}/about_us`, target: `_blank`},
    //     { type: 'link', text: translation.promo, href: `/${locale}/promo` },
    //     { type: 'link', text: translation.blog, href: `/${locale}/blog` },
    //     { type: 'link', text: translation.producers, href: `/${locale}/producers` },
    //     { type: 'link', text: translation.termsOfAgreement, href: `/${locale}/termsofagreement` },
    //     { type: 'link', text: translation.securityPolicy, href: `/${locale}/securitypolicy` },
    //     { type: 'link', text: translation.contacts, href: `/${locale}/contacts` },
    //     // { type: 'langLink' },
    //   ];
      //версія первісна
      const informationLinks = [
        { type: 'link', text: translation.aboutus, href: `/about_us`, target: `_blank`},
        { type: 'link', text: translation.promo, href: `/promo` },
        { type: 'link', text: translation.blog, href: `/blog` },
        { type: 'link', text: translation.producers, href: `/producers` },
        { type: 'link', text: translation.termsOfAgreement, href: `/termsofagreement` },
        { type: 'link', text: translation.securityPolicy, href: `/securitypolicy` },
        { type: 'link', text: translation.contacts, href: `/contacts` },
      ];
    return (
        <div className={styles.informationLinksList}>
            {informationLinks.map(({type, text, href}, index) =>{
                return <Link className={styles.informationLinksListElements} href={href} target="_blank">{text}</Link>
            })}
        </div>
    )
}
export default LinksInformation;