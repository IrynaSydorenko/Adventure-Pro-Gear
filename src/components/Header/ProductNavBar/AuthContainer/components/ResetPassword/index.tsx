'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Locale } from '@/i18n-config';
import { resetPaswordAction, ErrorMessages } from '@/app/actions';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { AppRoutes } from '@/constants/routes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getResetPasswordSchema, ResetPasswordData } from '@/validation';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import styles from './ResetPassword.module.css';

interface ResetPasswordProps {
  locale: Locale;
}

interface Credentials {
  newPassword: string;
  confirmPassword: string;
}

// http://localhost:3000/uk-UA/?auth=reset-password&token=071947f8-bd6b-43ea-a8d5-3786f0cbd30e

const ResetPassword: React.FC<ResetPasswordProps> = ({ locale }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log(searchParams, 'Token: ', token);
  const router = useRouter();

  const [credentials, setCredentials] = useState<Credentials>({
    newPassword: '',
    confirmPassword: '',
  });
  const [authTranslation, setAuthTranslation] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<ErrorMessages>({});
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
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

  type CredentialsKeys = keyof Credentials;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as CredentialsKeys;
    const resetPasswordSchema = getResetPasswordSchema(authTranslation);
    // const fieldSchema = resetPasswordSchema.pick({ [field]: true } as Record<
    //   CredentialsKeys,
    //   true
    // >);
    const result = resetPasswordSchema.safeParse({
      [field]: credentials[field],
    });

    if (!result.success) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [field]: result.error.errors.map(e => e.message),
      }));
    } else {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (credentials.newPassword !== credentials.confirmPassword) {
      setConfirmPasswordErrorMessage('Password is not matching!');
    } else {
      setConfirmPasswordErrorMessage('');
    }
  };

  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await getAllTranslations(locale);
      const translationFunction = getTranslation(translations);
      setAuthTranslation(translationFunction('auth'));
    };

    loadTranslations();
  }, [locale]);

  const closeModal = () => {
    // setIsModalOpen(false);
  };

  useEffect(() => {
    const isKeyinErrorObj = () => {
      if (validationErrors.newPassword && validationErrors.newPassword.length > 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };
    isKeyinErrorObj();
  }, [validationErrors.newPassword]);

  return (
    <>
      <Form action={handleSubmit}>
        <div className={styles.resetPasswordInfoContainer}>
          <h4 className={styles.resetPasswordHeading}>Reset Password</h4>
          <br />
          <p className={styles.resetPasswordSubHeading}>Write new password</p>
        </div>
        <Input
          placeholder={'New password'}
          name="newPassword"
          type="password"
          value={credentials.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={validationErrors.newPassword && validationErrors.newPassword.join(', ')} //validationErrors.name && validationErrors.name.join(', ')
        />
        <Input
          placeholder={'Confirm new password'}
          name="confirmPassword"
          type="password"
          value={credentials.confirmPassword}
          onChange={handleChange}
          disabled={disabled && true}
          onBlur={handleConfirmPasswordBlur}
          error={confirmPasswordErrorMessage}
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
