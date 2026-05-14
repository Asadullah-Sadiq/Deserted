import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  company: z
    .string()
    .max(100, 'Company name is too long')
    .optional(),
  service: z
    .string()
    .min(1, 'Please select a service')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-()]{7,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
})

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})
