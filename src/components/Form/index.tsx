// Form.tsx
import React, { FormEvent } from 'react';
import clsx from 'clsx';
import styles from './Form.module.css';

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  action?: ((formData: FormData) => void) | string;
  className?: string;
  method?: 'GET' | 'POST'
}

const Form: React.FC<FormProps> = ({ 
  children, 
  className, 
  onSubmit, 
  action, 
  method
}) => {
  const formClassNames = clsx(styles.authForm, className);
  return (
    <form 
      className={formClassNames} 
      onSubmit={onSubmit} 
      action={action} 
      method={method}
    >
      {children}
    </form>
  );
};

export default Form;
