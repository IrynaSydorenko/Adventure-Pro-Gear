'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import { forgotPaswordAction } from '@/app/actions';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import IllustrationSendEmail from '@/../public/icons/IllustrationSendEmail.svg';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import styles from './ForgotPassword.module.css';

interface ForgotPasswordProps {
  locale?: Locale;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ locale }) => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authTranslation, setAuthTranslation] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    const response = await forgotPaswordAction(formData);
    console.log('FormData: ', formData.get('email'));
    if (response === 200) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await getAllTranslations(locale);
      console.log(translations);
      const translationFunction = getTranslation(translations);
      setAuthTranslation(translationFunction('auth'));
    };

    loadTranslations();
  }, [locale]);

  return (
    <>
      <Form action={handleSubmit} className={styles.forgotPasswordForm}>
        <h4 className={styles.formHeading}>
          {authTranslation && authTranslation.forgotPasswordModal.heading}
        </h4>
        <br />
        <p>{authTranslation && authTranslation.forgotPasswordModal.info}</p>
        <div className={styles.inputAndButtobBlock}>
          <Input
            className={styles.emailInput}
            required={true}
            placeholder="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <Input
            type="submit"
            value={authTranslation && authTranslation.forgotPasswordModal['submit-button']}
            className={styles.sybmitEmailInput}
          />
        </div>
      </Form>
      {isModalOpen && (
        <Modal closeModal={closeModal} locale={locale} className={styles.setntEmailmodal}>
          <p>{authTranslation && authTranslation.forgotPasswordModal['email-directing-modal']}</p>
          <Image src={IllustrationSendEmail} alt="sent email icon" width={180} height={180} />
        </Modal>
      )}
    </>
  );
};

export default ForgotPassword;
