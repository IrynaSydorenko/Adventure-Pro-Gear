import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n-config';

const useNav = () => {
  const pathname = usePathname();
  const partsUrl = pathname.split('/');
  const uaLink =
    partsUrl.length > 2
      ? `/${i18n.locales[0]}/${partsUrl.slice(2).join('/')}`
      : `/${i18n.locales[0]}`;
  const enLink =
    partsUrl.length > 2
      ? `/${i18n.locales[1]}/${partsUrl.slice(2).join('/')}`
      : `/${i18n.locales[1]}`;

  return {
    uaLink,
    enLink,
  };
};

export default useNav;
