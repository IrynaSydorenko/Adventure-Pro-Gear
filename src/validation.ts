import { z } from 'zod';
import i18next from 'i18next';

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine(value => /\d/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine(value => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine(value => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
});

export const getSignUpSchema = (authTranslation: any) =>
  z.object({
    name: z
      .string()
      .min(2, 'Name must contain minimum 2 charachters')
      .regex(/^[a-zA-Z]+$/, 'Name must contain only letters')
      .max(64, 'Maximum 64 characters')
      .refine(value => !/^\s|\s$/.test(value), {
        message: 'Name cannot have spaces at the beginning or end',
      }),
    surname: z
      .string()
      .min(2, 'minimum 2 charachters')
      .max(64, 'Maximum 64 characters')
      .regex(/^[a-zA-Z]+$/, 'Name must contain only letters')
      .refine(value => !/^\s|\s$/.test(value), {
        message: 'Name cannot have spaces at the beginning or end',
      }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, authTranslation.registration.zod['password-errors'].quantity)
      .refine(value => /\d/.test(value), {
        message: authTranslation.registration.zod['password-errors'].oneDigit,
      })
      .refine(value => /[A-Z]/.test(value), {
        message: authTranslation.registration.zod['password-errors'].oneUppercaseLetter,
      })
      .refine(value => /[a-z]/.test(value), {
        message: authTranslation.registration.zod['password-errors'].oneLowercaseLetter,
      })
      .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
        message: authTranslation.registration.zod['password-errors'].oneSpecialCharacter,
      }),
  });

export type SignUpData = z.infer<ReturnType<typeof getSignUpSchema>>;
export type LogInData = z.infer<typeof logInSchema>;
