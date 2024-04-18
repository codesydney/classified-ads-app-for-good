import * as yup from 'yup'
import { useFormContext } from 'react-hook-form'

const emailRegex =
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/

const phoneRegex = /^[0-9]{10}$/
const postcodeRegex = /^[0-9]{4}$/
const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/
const yearRegex = /\b(?:19[5-9]\d|20(?:[012]\d|24))\b/

const signUpSchema = yup
  .object({
    firstName: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be at most 50 characters'),
    lastName: yup
      .string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be at most 50 characters'),
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirm: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required()

const loginSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid email'),
    password: yup.string().required('Password is required'),
  })
  .required()

const passwordResetSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid email'),
    password: yup.string().required('Password is required'),
  })
  .required()

const resetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirm: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required()

const passwordResetRequestSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(emailRegex, 'Invalid email'),
  })
  .required()

const generalInformationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 character')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 character')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .matches(phoneRegex, 'Please enter a valid 10-digit phone number'),
  suburb: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'Suburb must be at least 3 character')
    .max(50, 'Suburb cannot exceed 50 characters'),
  state: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(2, 'State must be at least 2 characters long')
    .max(3, 'State must be at most 3 characters long'),
  postcode: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .matches(postcodeRegex, 'Please enter a valid Australian Postcode'),
  facebookName: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'Facebook name must be at least 3 character')
    .max(50, 'Facebook name cannot exceed 50 characters'),
  story: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'Bio must be at least 3 character')
    .max(3000, 'Bio cannot exceed 3000 characters'),
})

const serviceSchema = yup.object({
  serviceName: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'Service name must be at least 3 character'),
  serviceDescription: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'Service description must be at least 3 character')
    .max(500, 'Service cannot exceed 500 characters'),
  serviceUrl: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .matches(urlRegex, 'Please enter a valid URL'),
})

const educationSchema = yup.object({
  course: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'Course must be at least 3 character'),
  college: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(3, 'College must be at least 3 character'),
  yearGraduated: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .matches(yearRegex, 'Please enter a valid year (1950 - now)'),
})

const changePasswordSchema = yup
  .object({
    currentPassword: yup
      .string()
      .required('Current password is required')
      .min(8, 'Invalid credentials'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(8, 'New password must be at least 8 characters'),
    newPasswordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match.'),
  })
  .required()

const contactFormSchema = yup
  .object({
    name: yup
      .string()
      .required('Email is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: yup.string().required('Email is required').email('Invalid email'),
    message: yup
      .string()
      .required('Message is required')
      .min(20, 'Message must be at least 20 characters')
      .max(500, 'Message must be at most 500 characters'),
  })
  .required()

export {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  passwordResetRequestSchema,
  generalInformationSchema,
  serviceSchema,
  educationSchema,
  changePasswordSchema,
  contactFormSchema,
}
