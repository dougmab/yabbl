import {z} from 'zod'

const minPassLen = 8, maxPassLen = 50;

export const usernameSchema = z.string().trim()
  .min(1, {message: 'Username must not be empty'})
  .max(20, {message: 'Username must be at most 20 characters long'})

export const handleSchema = z.string()
  .min(3, {message: 'Username must be at least 3 characters long'})
  .max(12, {message: 'Username must be at most 20 characters long'})
  .refine(handle => !handle.includes(' '), {message: 'Handle must not contain spaces'});

export const passwordSchema = z.string()
  .min(minPassLen, {message: 'Password must be at least 8 characters long'})
  .max(maxPassLen, {message: 'Password must be at most 50 characters long'})
  .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
  .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
  .regex(/[0-9]/, {message: 'Password must contain at least one number'})
  .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one special character'})

export const loginSchema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: passwordSchema,
})

export const registerSchema = loginSchema.extend({
  handle: handleSchema,
  confirmPassword: passwordSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
