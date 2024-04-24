'use client';

import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: (event: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined,
  color?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className = '', icon, color='primary', type='button', ...props }) => {
  const buttonClassNames = clsx(styles.button, className, styles[color]);

  return (
    <div>
      <button className={buttonClassNames} onClick={onClick} type={type} {...props}>
        {text}
        {icon}
      </button>
    </div>
  );
};

export default Button;
