'use client';

import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: (event: any) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  backgroundColor?: string;
  color?: string;
  border?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  className = '',
  icon,
  backgroundColor,
  color,
  border,
  type = 'button',
  ...props
}) => {
  const buttonStyle = {
    backgroundColor,
    color,
    border,
  };
  const buttonClassNames = clsx(styles.button, className);

  return (
    <button className={buttonClassNames}
    onClick={onClick}
    type={type}
    style={buttonStyle}
    {...props}>
      {text}
      {icon}
    </button>
  );
};

export default Button;
