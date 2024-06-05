import { z } from 'zod';

export const getLogInSchema = (authTranslation: any) =>
  z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: authTranslation.login.zod['email-errors-login'].incorrectEmail,
    }),
    // password: z
    //   .string()
    //   .min(8, 'Password must be at least 8 characters')
    //   .refine(value => /\d/.test(value), {
    //     message: 'Password must contain at least one number',
    //   })
    //   .refine(value => /[A-Z]/.test(value), {
    //     message: 'Password must contain at least one uppercase letter',
    //   })
    //   .refine(value => /[a-z]/.test(value), {
    //     message: 'Password must contain at least one lowercase letter',
    //   })
    //   .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
    //     message: 'Password must contain at least one special character',
    //   }),
  });

export const getSignUpSchema = (authTranslation: any) =>
  z.object({
    name: z
      .string()
      .min(2, authTranslation.registration.zod['name-errors-registration'].minLength)
      .regex(
        /^[a-zA-Z]+$/,
        authTranslation.registration.zod['name-errors-registration'].onlyLetters
      )
      .max(64, authTranslation.registration.zod['name-errors-registration'].maxLength)
      .refine(value => !/^\s|\s$/.test(value), {
        message: authTranslation.registration.zod['name-errors-registration'].noSpaces,
      }),
    surname: z
      .string()
      .min(2, authTranslation.registration.zod['surname-errors-registration'].minLength)
      .max(64, authTranslation.registration.zod['surname-errors-registration'].maxLength)
      .regex(
        /^[a-zA-Z]+$/,
        authTranslation.registration.zod['surname-errors-registration'].onlyLetters
      )
      .refine(value => !/^\s|\s$/.test(value), {
        message: authTranslation.registration.zod['surname-errors-registration'].noSpaces,
      }),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: authTranslation.registration.zod['email-errors-registration'].invalidFormat,
    }),
    password: z
      .string()
      .min(8, authTranslation.registration.zod['password-errors-registration'].quantity)
      .refine(value => /\d/.test(value), {
        message: authTranslation.registration.zod['password-errors-registration'].oneDigit,
      })
      .refine(value => /[A-Z]/.test(value), {
        message:
          authTranslation.registration.zod['password-errors-registration'].oneUppercaseLetter,
      })
      .refine(value => /[a-z]/.test(value), {
        message:
          authTranslation.registration.zod['password-errors-registration'].oneLowercaseLetter,
      })
      .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
        message:
          authTranslation.registration.zod['password-errors-registration'].oneSpecialCharacter,
      }),
  });

export type SignUpData = z.infer<ReturnType<typeof getSignUpSchema>>;
export type LogInData = z.infer<ReturnType<typeof getLogInSchema>>;
