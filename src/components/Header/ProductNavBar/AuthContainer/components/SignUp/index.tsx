'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox/Checkbox';
import { registerAction } from '@/app/actions';
import {getAllTranslations, getTranslation} from '@/dictionaries/dictionaries';
import {i18n, Locale} from '@/i18n-config';
import { Routes } from '@/constants/routes';
import styles from './SignUp.module.css';
import { signUpService } from '@/services/axios';
import Link from 'next/link';

export interface Credentials {
  name: string;
  surname: string;
  email: string;
  password: string;
}

function SignUp() {
  const [credentials, setCredentials] = useState<Credentials>({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

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

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     await signUpService(credentials);
  //     router.push(Route.HOME);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  return (
    <div className={styles.formContainer}>
      <Form
        className={styles.form}
        action={registerAction}
      >
        <h4 className={styles.h4}>Registration</h4>
        <Input
          type='text'
          value={credentials.name}
          onChange={handleChange}
          name='name'
          placeholder="Name"
          required={true}
          error='incorrect name'
        />
        <Input
          type='text'
          name='surname'
          value={credentials.surname}
          onChange={handleChange}
          placeholder="Surname"
          required={true}
          error='Incorrect surname'
        />
        <Input
          type='email'
          name='email'
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required={true}
          error='incorrect imail'
        />
        <Input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required={true}
          error='incorrect password'
        />
        <Checkbox/>
        <div className={styles.submitPolicy}>Реєструючись, ви погоджуєтеся з умовами<Link href="/policy"> положення про обробку і захист персональних даних та угодою користувача</Link></div>
        <Input type="submit" value="Register" />
        <Link className={styles.loginLink} href={'/uk-UA/' + Routes.SIGNIN}>Я вже зареєстрований</Link>
      </Form>
    </div>
  );
}

export default SignUp;
