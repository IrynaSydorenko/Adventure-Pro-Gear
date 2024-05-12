import React from 'react';
import styles from './Checkbox.module.css';

function Checkbox() {
  return (
    <div className={styles.checkboxContainer}>
      <input type="checkbox" name="rememberme" />
      <label htmlFor="rememberme">Remember me</label>
    </div>
  );
}

export default Checkbox;
