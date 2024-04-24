'use client';

import React, { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  error,
  icon,
  className,
  type,
  required
}) => (
  <div>
    {/* <span className="input-icon">{iconComponent}</span> */}
    <input
      required={required}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={` ${className} ${styles.input}`}
    />
    {/* {errorMessage} */}
  </div>
);

export default Input;
