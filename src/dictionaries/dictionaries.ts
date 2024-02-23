import 'server-only';
import { get } from 'lodash';
import { i18n, Locale } from '../i18n-config';

const languages = {
  [i18n.locales[0]]: () => import('./uk.json').then(module => module.default),
  [i18n.locales[1]]: () => import('./en.json').then(module => module.default),
};

export const getAllTranslations = async (locale: Locale) => {
  const result = (await languages[locale]?.()) ?? languages['uk-UA']();
  return result;
};

export const getTranslation = (language: any) => (path: string) => get(language, path);
