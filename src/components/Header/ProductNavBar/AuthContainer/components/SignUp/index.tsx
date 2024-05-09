'use client';

import React, { FormEvent, useState } from 'react';
import { z } from 'zod';
import { SignUpSchema } from '@/validation';
import { useRouter, usePathname } from 'next/navigation';
import Form from '@/components/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox/Checkbox';
import { registerAction, ErrorMessages } from '@/app/actions';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { i18n, Locale } from '@/i18n-config';
import { AppRoutes } from '@/constants/routes';
import Link from 'next/link';
import styles from './SignUp.module.css';

export interface Credentials {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface SignUpProps {
  locale: string;
}

// type TSignInSchema = z.infer<typeof SignUpSchema>;

const SignUp: React.FC<SignUpProps> = ({ locale }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<ErrorMessages>({});

  const router = useRouter();

  // const getLocale = () => {
  //   const pathName = usePathname();
  //   const segmentsArray = pathName.split('/');
  //   const locale = segmentsArray.find(segment => segment === (i18n.locales[0] || i18n.locales[1]))
  //   console.log(locale);
  //   return locale;

  // }

  // const locale = getLocale() as Locale;
  // console.log(locale);

  // const getTranslationOfRequest = () => {
  //   if(locale){
  //     const translationJsonFile = getAllTranslations(locale);
  //     const translation = getTranslation(translationJsonFile);
  //     const submitPolicy = translation('auth');
  //     console.log(submitPolicy)
  //   }

  // };
  // getTranslationOfRequest();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const clientRegisterAction = async (formData: FormData) => {
    const response = await registerAction(formData, locale);
    console.log('response from a server: ', response);
    if (response?.errors) {
      setValidationErrors(response.errors);
    }
    if (response?.submitError) {
      toast.error(response?.submitError, {
        position: 'top-right',
      });
    }
    if (response?.success) {
      router.push(`/${locale}${AppRoutes.SIGNIN}`);
      toast.success(response?.success, {
        position: 'top-right',
      });
    }
  };

  console.log('Zod error: ', validationErrors);
  console.log('Console log!');

  return (
    <div>
      <div className={styles.formContainer}>
        <Form action={clientRegisterAction}>
          <h4 className={styles.h4}>Registration</h4>
          <Input
            type="text"
            value={credentials.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
            required={true}
            error={validationErrors.name && validationErrors.name.join(', ')}
          />
          <Input
            type="text"
            name="surname"
            value={credentials.surname}
            onChange={handleChange}
            placeholder="Surname"
            required={true}
            error={validationErrors.surname && validationErrors.surname.join(', ')}
          />
          <Input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            required={true}
            error={validationErrors.email && validationErrors.email.join(', ')}
          />
          <Input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required={true}
            error={validationErrors.password && validationErrors.password.join(', ')}
          />
          <Checkbox />
          <p className={styles.submitPolicy}>
            Реєструючись, ви погоджуєтеся з умовами
            <Link href={`/${locale}/policy`}>
              {' '}
              положення про обробку і захист персональних даних та угодою користувача
            </Link>
          </p>
          <Input type="submit" value="Register" className={styles.submitRegistration} />
          <Link className={styles.loginLink} href={`/${locale}${AppRoutes.SIGNIN}`}>
            Я вже зареєстрований
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
