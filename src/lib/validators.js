import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional(),
  service: z.string().min(1, 'Please select a service').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  phone: z.string().regex(/^[+]?[\d\s\-()]{7,20}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
})

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const projectSchema = z.object({
  firstName:   z.string().min(1, 'First name is required').max(50),
  lastName:    z.string().min(1, 'Last name is required').max(50),
  email:       z.string().email('Please enter a valid email'),
  phone:       z.string().optional().or(z.literal('')),
  company:     z.string().min(1, 'Company is required').max(100),
  role:        z.string().min(1, 'Please select your role'),
  services:    z.array(z.string()).min(1, 'Select at least one service'),
  description: z.string().min(20, 'Please describe your project (min 20 chars)').max(2000),
  projectType: z.string().min(1, 'Please select a project type'),
  budget:      z.string().min(1, 'Please select a budget range'),
  timeline:    z.string().min(1, 'Please select a timeline'),
  hearAbout:   z.string().optional(),
})

export const callSchema = z.object({
  fullName:      z.string().min(2, 'Full name is required'),
  email:         z.string().email('Please enter a valid email'),
  company:       z.string().optional().or(z.literal('')),
  topic:         z.string().min(1, 'Please select a topic'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  notes:         z.string().optional().or(z.literal('')),
})

export const partnerSchema = z.object({
  name:            z.string().min(2, 'Name is required'),
  email:           z.string().email('Please enter a valid email'),
  company:         z.string().min(1, 'Company is required'),
  website:         z.string().url('Please enter a valid URL (include https://)').optional().or(z.literal('')),
  partnershipType: z.string().min(1, 'Please select a partnership type'),
  companySize:     z.string().optional(),
  proposal:        z.string().min(20, 'Please describe your proposal (min 20 chars)').max(3000),
})
