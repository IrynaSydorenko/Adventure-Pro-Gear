import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/redux/provider';
import { NextPage } from 'next';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { Inter } from '@next/font/google';
import { Locale } from '../../../i18n-config';
import '@/app/styles/_normilize.css';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Adventure Pro Gear',
  description: 'Інтернет магазин туристоичного спорядження',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

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
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header translation={translation('nav')} lang={lang} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;
