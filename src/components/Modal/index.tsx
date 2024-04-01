'use client';

import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, className, closeModal }) => (
  <div className={`${className} ${styles.modal}`}>
    <div>{children}</div>
    <button onClick={closeModal} className={styles.closeButton} type='button'>
      X
    </button>
  </div>
  );

export default Modal;
