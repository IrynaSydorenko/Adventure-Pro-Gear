import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  className?: string;
  text?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, className }) => {
  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <input type="checkbox" name="rememberme" />
      <label htmlFor="rememberme">{text}</label>
    </div>
  );
};

export default Checkbox;
