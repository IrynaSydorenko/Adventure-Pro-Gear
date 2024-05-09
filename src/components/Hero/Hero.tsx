import React from 'react';
import { getProducts, getUsers, deletePost } from '@/services/axios';
import styles from './Hero.module.css';

const Hero = async () => {
  // const { data } = await getProducts();
  // console.log(data);
  // const users = await getUsers();

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className={styles.hero}>
      Hero!
      <ul>
        {/* @ts-ignore */}
        {/* {data && data.map((product: any) => (
          <li key={product.id}>{product?.productName}</li>
        ))} */}
      </ul>
      {/* @ts-ignore */}
      {/* <ul>{users && users.map((user, index) => <li key={user.id}>{user?.name}</li>)}</ul> */}
    </div>
  );
};

export default Hero;
