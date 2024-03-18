'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import footerlogo from '@/../public/footer_logo.svg';
import footerphone from '@/../public/icons/Phone.svg';
import footermail from '@/../public/icons/emai-1.svg';
import footerlinkedin from '@/../public/icons/Linkedin.svg';
import footerfacebook from '@/../public/icons/Facebook.svg';
import footerinstagram from '@/../public/icons/Instagram.svg';
import footertwitter from '@/../public/icons/twitter.svg';
import { FooterProps } from '../../types/FooterType';
import styles from './Footer.module.css';
import LinksInformation from './FooterLinksInformation';
import LinksSupport from './FooterLinksSupport';

const FooterLinks: React.FC<FooterProps> = ({ translation, locale }) => {
    const linksContainerHeaderInformation=translation.information;
    const linksContainerHeaderSupport=translation.support;
    const linksContainerHeaderContacts=translation.ourContacts;
    const linksContainerHeaderSocialNetworks=translation.socialNetworks;
    return (
        <div className={styles.footerLinksContainer}>
            <div className={styles.footerLinksColumns}>
                <Image src={footerlogo} height={167} width={180} alt="Footer Logo" />
            </div>
            <div className={styles.footerLinksColumns}>
                <div className={styles.footerLinksColumnsHeader}>
                    {linksContainerHeaderInformation}
                </div>
                <div className={styles.footerLinksColumnsElements}>
                    <LinksInformation  translation={translation} locale={locale} />
                </div>
            </div>
            <div className={styles.footerLinksColumns}>
            <div className={styles.footerLinksColumnsHeader}>
                    {linksContainerHeaderSupport}
                </div>
                <div className={styles.footerLinksColumnsElements}>
                    <LinksSupport  translation={translation} locale={locale} />
                </div>
            </div>
            <div className={styles.footerLinksColumns}>
            <div className={styles.footerLinksColumnsHeader}>
                    {linksContainerHeaderContacts}
                </div>
                <div className={styles.footerLinksColumnsElements}>
                    <div className={styles.footerLinksColumnsElementsContacts}>
                        <Image src={footerphone} height={24} width={24} alt="Phone" />
                        <span>+380 50 454 56 59</span>
                    </div>
                    <div className={styles.footerLinksColumnsElementsContacts}>
                        <Image src={footermail} height={24} width={24} alt="Email" />
                        <span>info@adventureprogear.com</span>
                    </div>
                    <div className={styles.footerLinksColumnsHeaderContacts}>
                        {linksContainerHeaderSocialNetworks}
                    </div>
                    <div className={styles.footerLinksRowsElements}>
                        <Link className={styles.informationLinksListElements} href='https://www.linkedin.com/AdventureProGear/' target="_blank">
                            <Image className={styles.informationLinksListElementsImg} src={footerlinkedin} height={24} width={24} alt="LinkedIn" />
                        </Link>
                        <Link className={styles.informationLinksListElements} href='https://www.facebook.com/AdventureProGear/' target="_blank">
                            <Image className={styles.informationLinksListElementsImg} src={footerfacebook} height={24} width={24} alt="Facebook" />
                        </Link>
                        <Link className={styles.informationLinksListElements} href='https://www.instagram.com/AdventureProGear/' target="_blank">
                            <Image className={styles.informationLinksListElementsImg} src={footerinstagram} height={24} width={24} alt="Instagram" />
                        </Link>
                        <Link className={styles.informationLinksListElements} href='https://twitter.com/AdventureProGear/' target="_blank">
                            <Image className={styles.informationLinksListElementsImg} src={footertwitter} height={24} width={24} alt="Twitter" />
                        </Link>
                    </div>

                    

                </div>
            </div>
        </div>

    )
}
export default FooterLinks;