'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BreadcrumbHome from '@/../public/icons/BreadcrumbHome.svg';
import Container from '../Container';
import Arrows from '@/../public/icons/Arrows.svg';
import { AppRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n-config';
import styles from './BreadcrumbNav.module.css';

interface BreadcrumbNavigationProps {
  locale: Locale;
  breadcrumbsData?: { [key: string]: string };
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ locale, breadcrumbsData }) => {
  const pathName = usePathname();
  console.log(pathName);

  const modifyPathName = (path: string) => {
    const pathArray = path.split(AppRoutes.HOME);
    const filteredArray = pathArray.filter(element => element !== '');
    console.log(filteredArray);
    if (locale) {
      filteredArray.splice(0, 1);
    }
    console.log('filtered Array: ', filteredArray);
    return filteredArray;
  };
  const pathParts = modifyPathName(pathName);
  // const breadcrumbs = pathParts.map((pathname: string, index: number) => {
  //   const href = pathParts.slice(0, index + 1).join('/');
  //   const isLastItem = index === pathParts.length - 1;
  //   const label = (breadcrumbsData && breadcrumbsData[pathname]) || pathname;
  // });
  console.log('Path Parts: ', pathParts);

  return (
    <div className={styles.breadcrumbsContainer}>
      <Container>
        <ul className={styles.breadcrumbsList}>
          <li className={styles.homeIcon}>
            <Link href="/">
              <Image src={BreadcrumbHome} alt="home icon" width={24} height={24} />
            </Link>
          </li>
          <Image src={Arrows} alt="arrow icon" width={20} height={20} />
          {pathParts.map((pathPart, index) => (
            <div className={styles.listItem}>
              <li key={index}>
                {index === pathParts.length - 1 ? (
                  <p>{breadcrumbsData && breadcrumbsData[pathPart]}</p>
                ) : (
                  <Link href={`/${locale}/${pathPart}/`}>
                    {breadcrumbsData && breadcrumbsData[pathPart]}
                  </Link>
                )}
              </li>
              {index !== pathParts.length - 1 ? (
                <Image
                  src={Arrows}
                  alt="arrow icon"
                  width={22}
                  height={22}
                  className={styles.arrowIcon}
                />
              ) : (
                <></>
              )}
            </div>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default BreadcrumbNavigation;
