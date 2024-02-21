import React from "react";
import { i18n, Locale } from "../../../../../i18n-config";

type HeaderProps = {
  translation: {
    cart: string;
  };
  lang: Locale;
};

const Header = ({ translation, lang }: HeaderProps) => {
  return (
    <header>
      <div>
        Header <button>{translation.cart}</button>
        <button>{lang}</button>
      </div>
    </header>
  );
};

export default Header;
