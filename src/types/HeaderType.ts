import { Locale } from '@/i18n-config';

export interface HeaderProps {
  translation: {
    logo: string;
    aboutUs: string;
    blog: string;
    contacts: string;
    personalAccount: string;
    search: string;
    catalog: string;
    lang: string[];
  };
  locale?: Locale;
  products?: any;
}

export interface Token {}
