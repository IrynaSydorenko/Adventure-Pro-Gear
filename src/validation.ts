import { z } from 'zod';

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine(value => /\d/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine(value => /[A-Z]/.test(value), {
      message: 'Пароль має містити хоча б одну велику літеру',
    })
    .refine(value => /[a-z]/.test(value), {
      message: 'Пароль має містити хоча б одну маленьку літеру',
    })
    .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
      message: 'Пароль має містити хоча б один спеціальний символ',
    }),
});

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, 'minimum 2 charachters')
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
    .min(8, 'Password must be at least 8 characters')
    .refine(value => /\d/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine(value => /[A-Z]/.test(value), {
      message: 'Пароль має містити хоча б одну велику літеру',
    })
    .refine(value => /[a-z]/.test(value), {
      message: 'Пароль має містити хоча б одну маленьку літеру',
    })
    .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
      message: 'Пароль має містити хоча б один спеціальний символ',
    }),
});

export type SignUpData = z.infer<typeof SignUpSchema>;
export type LogInData = z.infer<typeof logInSchema>;
