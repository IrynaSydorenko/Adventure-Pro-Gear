'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import { forgotPaswordAction } from '@/app/actions';
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

  return (
    <>
      <Form action={handleSubmit}>
        <p>Forgot password?</p>
        <br />
        <p>Write your email below</p>
        <Input
          required={true}
          placeholder="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <Input type="submit" value="Send" />
      </Form>
      {isModalOpen && (
        <Modal closeModal={closeModal} locale={locale} className={styles.setntEmailmodal}>
          <p>
            Ваш запит на відновлення паролю оброблено. Будь ласка, перевірте вашу електронну пошту.
            Ми надіслали вам лист з посиланням для зміни пароля. Якщо ви не отримаєте листа протягом
            5 хвилин, перевірте папку «Спам», або спробуйте знову ввести свою електронну адресу.
            Дякуємо за ваше терпіння та розуміння.
          </p>
          <Image src={IllustrationSendEmail} alt="sent email icon" width={180} height={180} />
        </Modal>
      )}
    </>
  );
};

export default ForgotPassword;
