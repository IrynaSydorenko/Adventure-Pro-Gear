'use client';
import React from 'react';
import { FooterProps } from '../../types/FooterType';
import styles from './Footer.module.css';

const FooterForm: React.FC<FooterProps> = ({ translation}) => {
    const formContainerFirstColumnText=translation.beInCenterOfEvents;
    const formInputPlaceholder=translation.enterEmail;
    const formInputCheckboxAgree=translation.readAndAgreePolicyTerms;
    const formButtonSubscribeCaption=translation.subscribeButtonCaption;
    return (
        <div className={styles.footerFormContainer}>
            <div className={styles.footerFormContainerColumn}>{formContainerFirstColumnText}</div>
            <div className={styles.footerFormContainerColumn}>
                <input type="text" placeholder={formInputPlaceholder}/>
                <div>
                    <input className={styles.footerFormContainerCheckbox} type="checkbox" name="agreeTermsOpt"/>
                    <span>{formInputCheckboxAgree}</span>
                </div>
            </div>
            <div className={styles.footerFormContainerColumn}>
                <button>{formButtonSubscribeCaption}</button>
            </div>
        </div>
    )
}
export default FooterForm;