'use server'

import { signIn } from 'next-auth/react';
import { signUpService } from '@/services/axios'

export const registerAction = async (formData: FormData) => {
  // console.log(formData);
  const credentials = Object.fromEntries(formData)
  console.log('CREDENTIALS:', credentials);
  try {
        const result = await signUpService(credentials);
        // const result2 = await signIn('credentials', { redirect: false, credentials });

        console.log('Form submitted successfully:', result.data);
        // router.push(Route.HOME);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
}

// export const signInAction = async (formData: FormData) => {
//   // console.log(formData);
//   const signInCredentials = Object.fromEntries(formData)
//   console.log('SignInCredentials: ', signInCredentials);
//   try {
//     const result = await signIn('credentials', { redirect: false, ...signInCredentials });
//     console.log('Form submitted successfully:', result);
//     // router.push(Route.HOME);
//   } catch (error) {
//     console.error('Error submitting form:', error);
//   }
// }