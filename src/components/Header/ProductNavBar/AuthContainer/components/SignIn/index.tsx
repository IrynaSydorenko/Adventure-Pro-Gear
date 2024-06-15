'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { Locale } from '@/i18n-config';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLogInSchema, LogInData } from '@/validation';
import Button from '@/components/Button';
import { AppRoutes } from '@/constants/routes';
import Link from 'next/link';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox/Checkbox';
import styles from './SignIn.module.css';
export interface ErrorMessages {
  [key: string]: string[];
}

interface SignInProps {
  locale: Locale;
}

const SignIn: React.FC<SignInProps> = ({ locale }) => {
  const [signInCredentials, setSignInCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorMessages>({});
  const [serverError, setServerError] = useState<string | null>('');
  const [authTranslation, setAuthTranslation] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await getAllTranslations(locale);
      const translationFunction = getTranslation(translations);
      setAuthTranslation(translationFunction('auth'));
    };

    loadTranslations();
  }, [locale]);

  useEffect(() => {
    setErrors({});
  }, [signInCredentials.email, signInCredentials.password]);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInCredentials({ ...signInCredentials, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.formContainer}>
      <Form className={styles.form}>
        <h4 className={styles.h4}>SignIn</h4>
        <Input
          required={true}
          placeholder="email"
          name="email"
          type="email"
          value={signInCredentials.email}
          onChange={handleChange}
          error={errors.email && errors.email.join(', ')}
        />
        <Input
          required={true}
          placeholder="password"
          name="password"
          type="password"
          value={signInCredentials.password}
          onChange={handleChange}
          error={errors.password && errors.password.join(', ')}
        />
        <Link href="/forgotPassword" className={styles.restorePasswordLink}>
          forgot password?
        </Link>
        <Checkbox className={styles.checkboxSignIn} text="Remember me" />
        <Button
          onClick={async e => {
            e.preventDefault();
            setErrors({});
            setServerError('');
            const validatedFields = getLogInSchema(authTranslation).safeParse({
              ...signInCredentials,
            });
            if (!validatedFields.success) {
              const validationInputErrors: ErrorMessages = {};
              validatedFields.error.issues.forEach(issue => {
                if (!validationInputErrors[issue.path[0]]) {
                  validationInputErrors[issue.path[0]] = [];
                }
                validationInputErrors[issue.path[0]].push(issue.message);
              });
              console.log(validatedFields.error.issues);
              console.log(validationInputErrors);
              setErrors(validationInputErrors);
              return { errors: validationInputErrors };
            }
            try {
              const response = await signIn('credentials', {
                redirect: false,
                ...signInCredentials,
              });
              console.log('Response from the server: ', response);
              if (response?.status && response.status >= 400) {
                if (
                  response.error ===
                    `The email address '${signInCredentials.email}' is not registered. Please register` &&
                  locale === 'en-US'
                ) {
                  setErrors({
                    ...errors,
                    email: [
                      `The email address '${signInCredentials.email}' is not registered. Please register`,
                    ],
                  });
                } else if (
                  response.error ===
                    `The email address '${signInCredentials.email}' is not registered. Please register` &&
                  locale === 'uk-UA'
                ) {
                  setErrors({
                    ...errors,
                    email: [
                      `Імейл адреса '${signInCredentials.email}' не зареєстрована. Будь ласка зареєструйтеся`,
                    ],
                  });
                } else if (
                  response.error === 'The password is incorrect. Please check and try again'
                ) {
                  console.log(
                    'Is equal: ',
                    response.error === 'The password is incorrect. Please check and try again' &&
                      locale === 'en-US'
                  );
                  setErrors({
                    ...errors,
                    password: ['The password is incorrect. Please check and try again.'],
                  });
                } else if (
                  response.error === 'The password is incorrect. Please check and try again' &&
                  locale === 'uk-UA'
                ) {
                  setErrors({
                    ...errors,
                    password: ['Неправильний пароль. Будь ласка, перевірте та спробуйте знову'],
                  });
                } else if (response.error === 'Your account is not active' && locale === 'en-US') {
                  setErrors({
                    ...errors,
                    email: ['Your account is not active. Please check your email for more details'],
                  });
                } else if (response.error === 'Your account is not active' && locale === 'uk-UA') {
                  setErrors({
                    ...errors,
                    email: [
                      'Ваш обліковий запис не активний. Щоб отримати докладнішу інформацію, перевірте свою електронну пошту',
                    ],
                  });
                } else {
                  console.log(
                    'Response Error: ',
                    response.error,
                    'Is equal: ',
                    response.error === 'The password is incorrect. Please check and try again.'
                  );
                  setServerError(response.error);
                  toast.error(serverError, {
                    position: 'top-right',
                    className: `${styles.signInToastErrorMessage}`,
                    bodyClassName: `${styles.signInToastBody}`,
                    autoClose: 36000000,
                  });
                }
                return;
              } else if (response?.ok) {
                router.push(`/${locale}${AppRoutes.PERSONAL_ACCOUNT}`);
              }
            } catch (error) {
              console.error('SignIn error:', error);
              setServerError('An unexpected error occurred');
              toast.error('An unexpected error occurred', {
                position: 'top-right',
                className: styles.signInToastErrorMessage,
                bodyClassName: styles.signInToastBody,
                autoClose: 36000000,
              });
            }
          }}
          text="Sign in"
          color="primary"
          type="submit"
        />
        <Link className={styles.registerLink} href={`/${locale}${AppRoutes.SIGN_UP}`}>
          Зареєструватися
        </Link>
      </Form>
    </div>
  );
};

export default SignIn;
