import { Locale } from '@/i18n-config';

export interface HeaderProps {
  translation: {
    logo: string;
    aboutUs: string;
    blog: string;
    contacts: string;
    personalAccount: string;
    lang: string[];
  };
  lang: Locale;
}
