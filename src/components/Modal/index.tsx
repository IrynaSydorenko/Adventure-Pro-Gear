'use client';

import React from 'react';
import Image from 'next/image';
import Close from '@/../public/icons/Close.svg';
import styles from './Modal.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  locale: string;
  closeModal: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, className, closeModal, locale }) => (
  <div>
    <div className={styles.overlay} />
    <div className={`${className} ${styles.modal}`}>
      <div>{children}</div>
      <Image
        src={Close}
        className={styles.closeButton}
        onClick={closeModal}
        width={24}
        height={24}
        alt="close icon"
      />
    </div>
  </div>
);

export default Modal;
