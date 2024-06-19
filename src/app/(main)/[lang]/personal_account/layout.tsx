import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { Locale } from '@/i18n-config';

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  params: {
    lang: Locale;
  };
}

const DashboardLayout: React.FC<RootLayoutProps> = async ({ children, params }) => {
  const allTranslations = await getAllTranslations(params.lang);
  const translation = getTranslation(allTranslations);
  const breadcrumbsData = translation('breadcrumbsData');
  console.log('Breadcrumbs data: ', breadcrumbsData.breadcrumbs);
  return (
    <>
      <BreadcrumbNavigation locale={params.lang} breadcrumbsData={breadcrumbsData.breadcrumbs} />
      <main>{children}</main>
    </>
  );
};
export default DashboardLayout;
