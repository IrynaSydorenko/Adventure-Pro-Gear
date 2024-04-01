'use client';

import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: (event: any) => void;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className = '', icon, ...props }) => {
  const buttonClassNames = clsx(styles.button, className, {
    // [styles.disabled]: disabled,
    // [styles.expanded]: expanded
  });

  return (
    <div>
      <button className={buttonClassNames} onClick={onClick} {...props}>
        {text}
        {icon}
      </button>
    </div>
  );
};

export default Button;
