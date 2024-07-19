'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Locale } from '@/i18n-config';
import { resetPaswordAction } from '@/app/actions';
import { AppRoutes } from '@/constants/routes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import styles from './ResetPassword.module.css';

interface ResetPasswordProps {
  locale: Locale;
}

// http://localhost:3000/uk-UA/?auth=reset-password&token=071947f8-bd6b-43ea-a8d5-3786f0cbd30e

const ResetPassword: React.FC<ResetPasswordProps> = ({ locale }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log(searchParams, 'Token: ', token);
  const router = useRouter();

  const [credentials, setCredentials] = useState({ newPassword: '', confirmPassword: '' });
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (formData: FormData) => {
    if (token) {
      formData.append('token', token);
    }
    const response = await resetPaswordAction(formData);
    if (response === 200) {
      router.push(`/${locale}/${AppRoutes.SIGNIN}`);
      toast.success('Ваш пароль успішно змінено!', {
        position: 'top-right',
        autoClose: 36000000,
      });
      // setIsModalOpen(true);
    } else if (response && response >= 300) {
      toast.error('Упс, сталася помилка!', {
        position: 'top-right',
        autoClose: 36000000,
      });
    }
  };

  const closeModal = () => {
    // setIsModalOpen(false);
  };

  return (
    <>
      <Form action={handleSubmit}>
        <p>Reset Password</p>
        <Input
          placeholder={'New password'}
          name="newPassword"
          type="password"
          value={credentials.newPassword}
          onChange={handleChange}
        />
        <Input
          placeholder={'Confirm new password'}
          name="confirmPassword"
          type="password"
          value={credentials.confirmPassword}
          onChange={handleChange}
        />
        <Input type="submit" value="Save" />
      </Form>
      {/* {isModalOpen && (
        <Modal locale={locale} closeModal={closeModal}>
          <p>Ваш пароль успішно змінено!</p>
        </Modal>
      )} */}
    </>
  );
};

export default ResetPassword;
