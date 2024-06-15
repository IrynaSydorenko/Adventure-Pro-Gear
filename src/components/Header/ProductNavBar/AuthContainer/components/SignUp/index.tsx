'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Form from '@/components/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox/Checkbox';
import { registerAction, ErrorMessages } from '@/app/actions';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { getSignUpSchema } from '@/validation';
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
  locale: Locale;
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
  const [authTranslation, setAuthTranslation] = useState<any>(null);

  const router = useRouter();

  // const callToaster = () => {
  //   const message = [
  //     'Thank you for registering!',
  //     'To complete the process of activating your account, please check your email and follow the link in the email we sent. After that, you will be able to use all the features of our site.',
  //     "If you did not receive the email, please check your spam folder. If you have any questions, don't hesitate to \nContact us. \nThank you!",
  //   ];
  //   const message2 = [
  //     'Дякуємо за реєстрацію!',
  //     'Для завершення процесу активації вашого облікового запису, будь ласка, перевірте свою електронну пошту та перейдіть за посиланням у листі, який ми відправили. Після цього ви зможете користуватися всіма можливостями нашого сайту.',
  //     "Якщо ви не отримали листа, будь ласка, перевірте папку 'Спам'. Якщо у вас виникли будь-які питання, не соромтеся \nЗв'язатися з нами. \nДякуємо!",
  //   ];
  //   toast.success(
  //     <div>
  //       {UserFriendlyMessage.map((line, index) => (
  //         <React.Fragment key={index}>
  //           {index === 0 ? (
  //             <h4>{line}</h4>
  //           ) : index === 2 ? (
  //             <p>
  //               {line
  //                 .split('\n')
  //                 .map(substring =>
  //                   substring === "Зв'язатися з нами. " ? (
  //                     <Link href="/">{substring}</Link>
  //                   ) : (
  //                     substring
  //                   )
  //                 )}
  //             </p>
  //           ) : (
  //             <p>{line}</p>
  //           )}
  //           {index < UserFriendlyMessage.length - 1 && <br />}
  //         </React.Fragment>
  //       ))}
  //     </div>,
  //     {
  //       position: 'top-right',
  //       className: `${styles.toastMessage}`,
  //       bodyClassName: `${styles.toastBody}`,
  //       progressClassName: `${styles.toastProgressBar}`,
  //       icon: false,
  //       autoClose: 36000000,
  //     }
  //   );
  // };

  // useEffect(() => {
  //   callToaster();
  // }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    // setFormTouched(true);
  };

  type CredentialsKeys = keyof Credentials;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as CredentialsKeys;
    const SignUpSchema = getSignUpSchema(authTranslation);
    const fieldSchema = SignUpSchema.pick({ [field]: true } as Record<CredentialsKeys, true>);
    const result = fieldSchema.safeParse({
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

  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await getAllTranslations(locale);
      const translationFunction = getTranslation(translations);
      setAuthTranslation(translationFunction('auth'));
    };

    loadTranslations();
  }, [locale]);

  const clientRegisterAction = async (formData: FormData) => {
    const response = await registerAction(formData, locale);
    console.log('response from a server: ', response);
    if (response?.errors) {
      setValidationErrors(response.errors);
    }
    if (response?.submitError) {
      if (
        response?.submitError === `Email ${credentials.email} is already in use.` &&
        locale === 'en-US'
      ) {
        setValidationErrors({ ...validationErrors, email: [response.submitError] });
      } else if (
        response?.submitError === `Email ${credentials.email} is already in use.` &&
        locale === 'uk-UA'
      ) {
        setValidationErrors({
          ...validationErrors,
          email: [`Електронна адреса ${credentials.email} вже зареєстрована`],
        });
      } else {
        toast.error(response?.submitError, {
          position: 'top-right',
          className: `${styles.toastErrorMessage}`,
          bodyClassName: `${styles.toastBody}`,
          autoClose: 36000000,
        });
      }
    }
    if (response?.success) {
      router.push(`/${locale}${AppRoutes.SIGNIN}`);
      toast.success(
        <>
          {response.success.map((line: string, index: number) => (
            <React.Fragment key={index}>
              {index === 0 ? (
                <h4>{line}</h4>
              ) : index === 2 ? (
                <p>
                  {line
                    .split('\n')
                    .map(substring =>
                      substring === 'Contact us. ' || substring === "Зв'язатися з нами. " ? (
                        <Link href={`/${locale}${AppRoutes.HOME}`}>{substring}</Link>
                      ) : (
                        substring
                      )
                    )}
                </p>
              ) : (
                <p>{line}</p>
              )}
              {index < response.success.length - 1 && <br />}
            </React.Fragment>
          ))}
        </>,
        {
          position: 'top-right',
          className: `${styles.toastMessage}`,
          bodyClassName: `${styles.toastBody}`,
          icon: false,
          autoClose: 36000000,
        }
      );
    }
  };

  console.log('Zod error: ', validationErrors);
  console.log('Console log!');

  return (
    <>
      <div className={styles.formContainer}>
        <Form action={clientRegisterAction}>
          <h4 className={styles.h4}>Registration</h4>
          <Input
            type="text"
            value={credentials.name}
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
            placeholder="Surname"
            required={true}
            error={validationErrors.surname && validationErrors.surname.join(', ')}
          />
          <Input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            required={true}
            error={validationErrors.email && validationErrors.email.join(', ')}
          />
          <Input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            required={true}
            error={validationErrors.password && validationErrors.password.join(', ')}
          />
          <Checkbox text={'Remember me'} className={styles.checkboxRegistration} />
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
    </>
  );
};

export default SignUp;
