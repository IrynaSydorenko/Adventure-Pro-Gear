'use client';

import React, { useState } from 'react';
import Select, { components } from 'react-select';
import useNav from '@/hooks/useNav';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import World from '@/../public/icons/World.svg';
import styles from '../Header.module.css';

interface LangLinksProps {
  languages: string[];
  locale?: Locale;
}

const CustomSingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <Image src={World} alt="globus icon" width={22} height={22} className={styles.globusIcon} />
    {props.children}
  </components.SingleValue>
);

const LangLinks: React.FC<LangLinksProps> = ({ languages, locale }) => {
  const { uaLink, enLink } = useNav();
  const defaultLanguage = locale || 'uk-UA';
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const options = [
    {
      value: 'uk-UA',
      label: languages[0],
    },
    {
      value: 'en-US',
      label: languages[1],
    },
  ];

  const handleLanguageChange = (selectedOption: any) => {
    setSelectedLanguage(selectedOption.value);
    window.location.href = selectedOption.value === 'uk-UA' ? uaLink : enLink;
  };

  return (
    <div className={styles.langSelect}>
      <Select
        value={options.find(option => option.value === selectedLanguage)}
        onChange={handleLanguageChange}
        options={options}
        isSearchable={false}
        components={{ SingleValue: CustomSingleValue }}
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused ? '#FFDBA4' : 'white',
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: 0,
            border: 'none',
            backgroundColor: '#152a38',
            boxShadow: 'none',
            minHeight: 40,
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: 0,
            cursor: 'pointer',
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            margin: 0,
            paddingLeft: 30,
            backgroundColor: '#152a38',
            // Adjust padding as needed
          }),
          indicatorsContainer: baseStyles => ({
            ...baseStyles,
            display: 'none',
          }),
        }}
      />
    </div>
  );
};

export default LangLinks;
