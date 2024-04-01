'use server'

import {signUpService} from '@/services/axios'

export const register = async (formData: FormData) => {
  console.log(formData);
  // const name = formData.get('inputName');
  // const surname = formData.get('inputSurname');
  // const email = formData.get('inputEmail');
  // const password = formData.get('inputPassword');
  const credentials = Object.fromEntries(formData)
  console.log('CREDENTIALS:', credentials);
  

  try {
        const result = await signUpService(credentials);
        console.log('Form submitted successfully:', result.data);
        // router.push(Route.HOME);
      } catch (error) {
        console.error('Error submitting form:', error);
      }


}