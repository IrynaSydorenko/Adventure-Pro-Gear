'use client';

import React, { useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';
import Image from 'next/image';
import EditData from '@/../public/icons/EditData.svg';
import Orders from '@/../public/icons/Orders.svg';
import FavouritesBlack from '@/../public/icons/FavouritesBlack.svg';
import Favourites from '@/../public/icons/Favourites.svg';
import SignOut from '@/../public/icons/SignOut.svg';
import EditDataWhite from '@/../public/icons/EditDataWhite.svg';
import OrdersWhite from '@/../public/icons/OrdersWhite.svg';
import { AppRoutes } from '@/constants/routes';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import styles from './ProfileMenu.module.css';

interface ProfileMenuProps {
  menuData: string[] | undefined;
  locale: Locale;
  className?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ menuData, className, locale }) => {
  const session = useSession();
  const [favouritesHover, setFavouritesHover] = useState(false);
  const [OrdersHover, setOrdersHover] = useState(false);
  const [editDataHover, setEditDataHover] = useState(false);
  const [ExitHover, setExitHover] = useState(false);
  return (
    <div className={`${styles.profileMenu} ${className}`}>
      <div className={styles.profileInfo}>
        {/* <Loading /> */}
        {session.status === 'loading' ? (
          <Loading className={styles.loaddingProfilePicture} />
        ) : (
          <Link href={`${window.location.origin}/${locale}/personal_account/`}>
            <div className={styles.profilePhoto}>{`${session && session.data?.user.name[0]}`}</div>
            <div>{`${session && session.data?.user.name} ${session && session.data?.user.surname}`}</div>
          </Link>
        )}
      </div>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link
            href={`${window.location.origin}/${locale}/personal_account/orders/`}
            onMouseEnter={() => setOrdersHover(true)}
            onMouseLeave={() => setOrdersHover(false)}
          >
            {OrdersHover ? (
              <Image src={OrdersWhite} height={24} width={24} alt="order icon" />
            ) : (
              <Image src={Orders} height={24} width={24} alt="order icon" />
            )}
            {menuData && menuData[0]}
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            href={`${window.location.origin}/${locale}/personal_account/edit_data/`}
            onMouseEnter={() => setEditDataHover(true)}
            onMouseLeave={() => setEditDataHover(false)}
          >
            {editDataHover ? (
              <Image src={EditDataWhite} height={24} width={24} alt="edit icon" />
            ) : (
              <Image src={EditData} height={24} width={24} alt="edit icon" />
            )}
            {menuData && menuData[1]}
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            href={`${window.location.origin}/${locale}/personal_account/favourites/`}
            onMouseEnter={() => setFavouritesHover(true)}
            onMouseLeave={() => setFavouritesHover(false)}
          >
            {favouritesHover ? (
              <Image src={Favourites} height={24} width={24} alt="hart icon" />
            ) : (
              <Image src={FavouritesBlack} height={24} width={24} alt="hart icon" />
            )}
            {menuData && menuData[2]}
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            href={`${window.location.origin}/${locale}/personal_account/exit/`}
            onMouseEnter={() => setExitHover(true)}
            onMouseLeave={() => setExitHover(false)}
          >
            <Image src={SignOut} height={24} width={24} alt="exit icon" />
            {menuData && menuData[3]}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
