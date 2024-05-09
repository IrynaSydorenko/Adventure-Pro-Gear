'use server';

import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { signUpService } from '@/services/axios';
import { AppRoutes } from '@/constants/routes';
import { SignUpSchema } from '@/validation';
export interface ErrorMessages {
  [key: string]: string[];
}

export const registerAction = async (formData: FormData, locale: string) => {
  console.log('EMAIL: ', formData.get('email'));
  console.log(`Email ${formData.get('email')} is already in use.`);
  const credentials = Object.fromEntries(formData);
  console.log('CREDENTIALS:', credentials);
  const validatedFields = SignUpSchema.safeParse({
    ...credentials,
  });
  console.log('ValidatedFields! ', validatedFields);
  if (!validatedFields.success) {
    const errors: ErrorMessages = {};
    validatedFields.error.issues.forEach(issue => {
      if (!errors[issue.path[0]]) {
        errors[issue.path[0]] = [];
      }
      errors[issue.path[0]].push(issue.message);
    });
    console.log(validatedFields.error.issues);
    console.log(errors);
    return { errors: errors };
  }
  try {
    const result = await signUpService(credentials);
    console.log('Form submitted successfully:', result.data);
    if (result?.data) {
      return {
        success: 'Form submitted successfully!',
      };
    }
  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error submitting form:', error.message);
      if (error.response) {
        console.log('Error data:', error.response.data);
        if (error.response.status >= 400) {
          console.log(error.response.data);
          return { submitError: error.response.data };
        }
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
  // redirect(`/${locale}${AppRoutes.SIGNIN}`);
};
