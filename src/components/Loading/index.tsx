import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
  return <div className={`${styles.spinner} ${className}`}></div>;
};

export default Loading;
