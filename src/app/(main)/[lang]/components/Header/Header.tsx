"use client";

import React, { useState } from "react";
import { i18n, Locale } from "../../../../../i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "@/hooks/useNav";
import styles from "./Header.module.css";

type HeaderProps = {
  translation: {
    cart: string;
  };
  lang: Locale;
};

const Header = ({ translation, lang }: HeaderProps) => {
  const pathName = usePathname();
  const { ukLink, enLink } = useNav();
  const langLinks = [
    {
      href: ukLink,
      anchor: "UA",
    },
    {
      href: enLink,
      anchor: "EN",
    },
  ];

  const handleLanguageChange = (selectedLanguage: string) => {
    document.cookie = `preferredLanguage=${selectedLanguage}; path=/; max-age=31536000`;
  };
  return (
    <header>
      <div>
        Header <button>{translation.cart}</button>
        {langLinks.map((link, index) => (
          <Link
            className={styles.langugeLink}
            key={index}
            href={link.href}
            onClick={() => handleLanguageChange(link.anchor)}
          >
            {link.anchor}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
