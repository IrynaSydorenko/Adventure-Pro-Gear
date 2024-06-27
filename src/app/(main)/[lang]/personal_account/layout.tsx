import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import ProfileMenu from '@/components/ProfileMenu';
import Container from '@/components/Container';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { Locale } from '@/i18n-config';
import styles from './personalAccount.module.css';

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
  const profileMenuData = translation('profile');
  console.log('Breadcrumbs data: ', breadcrumbsData.breadcrumbs);
  return (
    <div className={styles.personalAccountLayout}>
      <BreadcrumbNavigation locale={params.lang} breadcrumbsData={breadcrumbsData.breadcrumbs} />
      <Container className={styles.dashboardWrapper}>
        <ProfileMenu
          menuData={profileMenuData.menuData}
          locale={params.lang}
          className={styles.profileMenuLayout}
        />
        <main>{children}</main>
      </Container>
    </div>
  );
};
export default DashboardLayout;
