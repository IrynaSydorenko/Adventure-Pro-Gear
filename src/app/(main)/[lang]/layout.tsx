import type { Metadata } from 'next';
import Header from '@/app/(main)/[lang]/components/Header/Header';
import { NextPage } from 'next';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { Locale } from '../../../i18n-config';

export const metadata: Metadata = {
  title: 'Adventure Pro Gear',
  description: 'Інтернет магазин туристоичного спорядження',
};

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  params: {
    lang: Locale;
  };
}

const RootLayout: NextPage<RootLayoutProps> = async ({ params: { lang }, children }) => {
  const translations = await getAllTranslations(lang);
  const translation = getTranslation(translations);

  return (
    <html lang="en">
      <body>
        <Header translation={translation('products')} lang={lang} />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
