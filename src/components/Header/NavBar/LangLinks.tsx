import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import useNav from '@/hooks/useNav';
import styles from '../Header.module.css';

interface LangLinksProps {
  language: string[];
}

const LangLinks: React.FC<LangLinksProps> = ({ language }) => {
  const { ukLink, enLink } = useNav();
  const langLinks = [
    {
      href: ukLink,
      anchor: language[0],
    },
    {
      href: enLink,
      anchor: language[1],
    },
  ];
  const handleLanguageChange = (selectedLanguage: string) => {
    if (typeof document !== 'undefined') {
      document.cookie = `preferredLanguage=${selectedLanguage}; path=/; max-age=31536000`;
    }
  };
  return (
    <ul className={styles.langLinks}>
      {langLinks.map((link, index) => (
        <li key={index}>
          {index !== 0 && <span className={styles.separator} />}
          <Link
            className={styles.langLink}
            href={link.href}
            onClick={() => handleLanguageChange(link.anchor)}
          >
            {link.anchor}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LangLinks;
