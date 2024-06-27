import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = () => {
  return <div className={styles.spinner}></div>;
};

export default Loading;
