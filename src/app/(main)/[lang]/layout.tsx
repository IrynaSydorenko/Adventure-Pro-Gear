import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReduxProvider from '@/redux/provider';
import { NextPage } from 'next';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import AuthProvider from '@/components/AuthProvider';
import { Montserrat } from 'next/font/google';
import { Locale } from '../../../i18n-config';
import '@/app/styles/_normilize.css';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Adventure Pro Gear',
  description: 'Інтернет магазин туристоичного спорядження',
};

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  auth: React.ReactNode;
  params: {
    lang: Locale;
  };
}

const RootLayout: NextPage<RootLayoutProps> = async ({ params: { lang }, children, auth }) => {
  const translations = await getAllTranslations(lang);
  const translation = getTranslation(translations);
  // const session = await getServerSession(options);
  // console.log("session: ",session);

  return (
    <ReduxProvider>
      <html lang="en">
        <AuthProvider>
          <body className={inter.className}>
            <Header translation={translation('nav')} locale={lang} />
            <main>{children}</main>
            <ToastContainer />
            <Footer />
          </body>
        </AuthProvider>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;
