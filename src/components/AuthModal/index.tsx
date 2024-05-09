'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from '../Modal';
import SignUp from '../Header/ProductNavBar/AuthContainer/components/SignUp';
import SignIn from '../Header/ProductNavBar/AuthContainer/components/SignIn';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  locale: string;
}

type AuthType =
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'signup-success'
  | 'reset-password'
  | 'new-password'
  | null;

const AuthModal: React.FC<AuthModalProps> = ({ locale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const session = useSession();

  const closeModal = () => {
    router.replace(`/${locale}`);
  };
  useEffect(() => {
    const type = searchParams.get('auth') as AuthType;
    setAuthType(type);
    setIsModalOpen(
      type === 'signin' ||
        type === 'signup' ||
        type === 'forgot-password' ||
        type === 'reset-password' ||
        type === 'signup-success' ||
        type === 'new-password'
    );
  }, [searchParams]);

  return (
    <div>
      {isModalOpen && session.status !== 'authenticated' && authType === 'signup' && (
        <Modal closeModal={closeModal} locale={locale} className={styles.authModal}>
          <SignUp locale={locale} />
        </Modal>
      )}
      {isModalOpen && session.status !== 'authenticated' && authType === 'signin' && (
        <Modal closeModal={closeModal} locale={locale} className={styles.authModal}>
          <SignIn locale={locale} />
        </Modal>
      )}
    </div>
  );
};

export default AuthModal;
