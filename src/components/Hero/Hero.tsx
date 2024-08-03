import React from 'react';
import { Locale } from '@/i18n-config';
import { getProducts, getUsers, deletePost } from '@/services/axios';
import styles from './Hero.module.css';

interface HeroProps {
  locale: Locale;
  data: any[];
}

const Hero: React.FC<HeroProps> = ({ data, locale }) => {
  // const users = await getUsers();

  // const handleDeletePost = async (postId: string) => {
  //   try {
  //     await deletePost(postId);
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

  return (
    <div className={styles.hero}>
      Hero!
      <ul>
        {/* @ts-ignore */}
        {data &&
          data.map((product: any) => (
            <li key={product.id}>
              {locale === 'uk-UA' ? product?.productNameUa : product?.productNameEn}
            </li>
          ))}
      </ul>
      {/* @ts-ignore */}
      {/* <ul>{users && users.map((user, index) => <li key={user.id}>{user?.name}</li>)}</ul> */}
    </div>
  );
};

export default Hero;
