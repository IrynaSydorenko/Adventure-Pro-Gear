'use client';

import React, { useEffect, useState } from 'react';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
  onChange: (value: number) => void;
  quantity: number;
  variant: 'standart' | 'small' | 'admin';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ onChange, quantity, variant }) => {
  const [value, setValue] = useState<number>(1);
  const [isDisabledPlus, setIsDisabledPlus] = useState<boolean>(false);
  const [isDisabledSubt, setIsDisabledSubt] = useState<boolean>(false);

  let classNameWrapper = styles.quantityWrapper;
  let classNameSubOperation = `${styles.operation} ${styles.subt}`;
  let classsNamePlusOperation = `${styles.operation} ${styles.plus}`;
  let classNameValue = styles.value;

  if (variant === 'admin') {
    classNameWrapper += ` ${styles.admin}`;
    classNameSubOperation += ` ${styles.admin}`;
    classsNamePlusOperation += ` ${styles.admin}`;
    classNameValue += ` ${styles.admin}`;
  } else if (variant === 'small') {
    classNameWrapper += ` ${styles.small}`;
    classNameSubOperation += ` ${styles.small}`;
    classsNamePlusOperation += ` ${styles.small}`;
    classNameValue += ` ${styles.small}`;
  }

  useEffect(() => {
    if (value < quantity) setIsDisabledPlus(false);
    else setIsDisabledPlus(true);
    if (value > 1) setIsDisabledSubt(false);
    else setIsDisabledSubt(true);
    onChange(value);
  }, [value]);

  return (
    <div className={classNameWrapper}>
      <button
        className={classNameSubOperation}
        onClick={() => setValue(value - 1)}
        disabled={isDisabledSubt}
      >
        -
      </button>
      <span className={classNameValue}>{value}</span>
      <button
        className={classsNamePlusOperation}
        onClick={() => setValue(value + 1)}
        disabled={isDisabledPlus}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
