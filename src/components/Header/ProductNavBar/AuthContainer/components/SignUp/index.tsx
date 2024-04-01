'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter} from 'next/navigation';
import Form from '@/components/Form';
import TextInput from '@/components/Input';
import { register } from '@/app/actions'
import { Route } from '@/constants/routes';
import styles from './SignUp.module.css';
import { signUpService } from '@/services/axios';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUpService(credentials);
      router.push(Route.HOME);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        className={styles.form}
        action={register}
        // onSubmit={handleSubmit}
      >
        <h4 className={styles.h4}>Registration</h4>
        <TextInput
          type='text'
          value={credentials.name}
          onChange={handleChange}
          name='name'
          placeholder="Name"
          error='incorrect name'
        />
        <TextInput
          type='text'
          name='surname'
          value={credentials.surname}
          onChange={handleChange}
          placeholder="Surname"
          error='Incorrect surname'
        />
        <TextInput
          type='email'
          name='email'
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          error='incorrect imail'
        />
        <TextInput
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          error='incorrect password'
        />
        <input type="submit" value="Register" />
        {/* <Button text={'Register'} onClick={handleClick} type="submit" /> */}
      </Form>
    </div>
  );
}

export default SignUp;
