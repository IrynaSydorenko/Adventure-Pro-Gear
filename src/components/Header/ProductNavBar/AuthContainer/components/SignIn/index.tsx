'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logInSchema, LogInData } from '@/validation';
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
  locale: string;
}

const SignIn: React.FC<SignInProps> = ({ locale }) => {
  const [signInCredentials, setSignInCredentials] = useState<LogInData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorMessages>({});
  const [serverError, setServerError] = useState<string | null>('');

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
        <Checkbox />
        <Button
          onClick={async e => {
            e.preventDefault();
            const validatedFields = logInSchema.safeParse({
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
            const response = await signIn('credentials', { redirect: false, ...signInCredentials });
            if (response?.status && response.status >= 400) {
              setServerError(response.error);
              toast.error(serverError, {
                position: 'top-right',
              });
            } else if (response?.ok) {
              router.push(`/${locale}${AppRoutes.PERSONAL_ACCOUNT}`);
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
