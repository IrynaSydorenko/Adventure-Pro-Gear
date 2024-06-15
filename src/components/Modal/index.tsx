'use client';

import React from 'react';
import Image from 'next/image';
import Close from '@/../public/icons/Close.svg';
import Container from '@/components/Container';
import styles from './Modal.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  locale: string;
  closeModal: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, className, closeModal, locale }) => (
  <>
    {/* <div className={styles.overlay} /> */}
    <Container className={styles.containerModal}>
      <div className={`${className} ${styles.modal}`}>
        {children}
        <Image
          src={Close}
          className={styles.closeButton}
          onClick={closeModal}
          width={24}
          height={24}
          alt="close icon"
        />
      </div>
    </Container>
  </>
);

export default Modal;
