import {z} from 'zod'

const minPassLen = 8, maxPassLen = 50;

const usernameSchema = z.string()
  .min(3, {message: 'Username must be at least 3 characters long'})
  .max(20, {message: 'Username must be at most 20 characters long'});

const passwordSchema = z.string()
  .min(minPassLen, {message: 'Password must be at least 8 characters long'})
  .max(maxPassLen, {message: 'Password must be at most 50 characters long'})
  .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
  .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
  .regex(/[0-9]/, {message: 'Password must contain at least one number'})
  .regex(/[^a-zA-Z0-9]/, {message: 'Password must contain at least one special character'})

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

export const registerSchema = loginSchema.extend({
  email: z.string().email({message: 'Invalid email address'}),
  confirmPassword: passwordSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
