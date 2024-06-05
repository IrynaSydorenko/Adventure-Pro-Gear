'use client';

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Eye from '@/../public/icons/Eye.svg';
import Error from '@/../public/icons/Error.svg';
import styles from './Input.module.css';

interface InputProps {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  type?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  icon,
  className,
  type,
  required,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleEyeClick = () => {
    setPasswordVisible(prev => !prev);
  };
  return (
    <div className={styles.inputContainer}>
      <input
        required={required}
        type={type === 'password' && passwordVisible ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={` ${className} ${styles.input}`}
        onBlur={onBlur}
      />
      {type === 'password' && (
        <Image
          src={Eye}
          className={styles.hideIcon}
          alt="hide icon"
          width={20}
          height={20}
          onClick={handleEyeClick}
        />
      )}
      {error && (
        <div className={styles.errorContainer}>
          <Image
            src={Error}
            alt="error icon"
            width={11}
            height={11}
            className={styles.errorImage}
          />
          <p className={styles.error}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
