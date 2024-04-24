import React, {useState} from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/Button';
import { Routes } from '@/constants/routes'
import Link from 'next/link';
import Form from '@/components/Form'
import Input from '@/components/Input'
import Checkbox from '@/components/Checkbox/Checkbox';
import styles from './SignIn.module.css'

interface signInCredentials {
  email: string,
  password: string
}

function SignIn() {
  const [signInCredentials, setSignInCredentials] = useState<signInCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignInCredentials({ ...signInCredentials, [event.target.name]: event.target.value });
  };

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     await signInService(credentials);
  //     router.push(Route.HOME);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  return (
  <div className={styles.formContainer}>
    <Form className={styles.form}>
      <h4 className={styles.h4}>SignIn</h4>
      <Input required={true} placeholder='email' name='email' type='email' value={signInCredentials.email}
          onChange={handleChange}/>
      <Input required={true} placeholder='password' name='password' type='password' value={signInCredentials.password}
          onChange={handleChange}/>
      <Link href='/forgotPassword' className={styles.restorePasswordLink}>forgot password?</Link>
      <Checkbox/>
      <Button onClick={(e) => {
        e.preventDefault()
        signIn("credentials", {redirect: false, ...signInCredentials })}
      } text='Sign in' color='primary' type='submit'/>
      <Link className={styles.registerLink} href={'/uk-UA/' + Routes.SIGN_UP}>Зареєструватися</Link>
    </Form>
  </div>
 );
}

export default SignIn;
