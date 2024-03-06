import React, { useEffect, useState } from 'react';
import useNav from '@/hooks/useNav';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import World from '@/../public/icons/World.svg';
import styles from '../Header.module.css';

interface LangLinksProps {
  languages: string[];
  locale?: Locale;
}

const LangLinks: React.FC<LangLinksProps> = ({ languages, locale }) => {
  const { uaLink, enLink } = useNav();
  const defaultLanguage = locale || 'uk-UA';
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const options = [
    {
      value: 'uk-UA',
      text: languages[0],
    },
    {
      value: 'en-US',
      text: languages[1],
    },
  ];

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    // @ts-ignore
    setSelectedLanguage(selectedValue);
    // Update the URL based on the selected language
    window.location.href = selectedValue === 'uk-UA' ? uaLink : enLink;
  };

  return (
    <div className={styles.langSelect}>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <Image src={World} alt="globus icon" width={22} height={22} />
    </div>
  );
};

export default LangLinks;
