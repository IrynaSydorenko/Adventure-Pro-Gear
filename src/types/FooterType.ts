import { Locale } from '@/i18n-config';

export interface FooterProps {
    translation: {
        information: string;
        aboutus: string;
        promo: string;
        blog: string;
        producers: string;
        termsOfAgreement: string;
        securityPolicy: string;
        contacts: string;
        support: string;
        guarantee: string;
        delivery: string;
        payment: string;
        returnAndExchanges: string;
        ourContacts: string;
        socialNetworks: string;
        beInCenterOfEvents: string;
        enterEmail: string;
        readAndAgreePolicyTerms: string;
        subscribeButtonCaption: string;
        footBottomContentText: string;
        lang: string[];
    };
    locale?: Locale;
  }
