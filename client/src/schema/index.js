import * as yup from 'yup'
import { useFormContext } from 'react-hook-form'

const emailRegex =
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/

const phoneRegex =
  /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/
const postcodeRegex = /^[0-9]{4}$/
const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/

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

// Validation for general information form. Only validates dirty fields.
const generalInformationSchema = yup.object({
  firstName: yup.string().when('firstName', {
    is: (value, schema) => useFormContext().formState.dirtyFields.firstName,
    then: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 character')
      .max(50, 'First name cannot exceed 50 characters'),
  }),
  lastName: yup.string().when('lastName', {
    is: (value, schema) => useFormContext().formState.dirtyFields.lastName,
    then: yup
      .string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 character')
      .max(50, 'Last name cannot exceed 50 characters'),
  }),
  email: yup.string().when('email', {
    is: (value, schema) => useFormContext().formState.dirtyFields.email,
    then: yup.string().email('Invalid email').required('Email is required'),
  }),
  phone: yup.string().when('phone', {
    is: (value, schema) => useFormContext().formState.dirtyFields.phone,
    then: yup
      .string()
      .nullable()
      .matches(phoneRegex, 'Please enter a valid 10-digit phone number'),
  }),
  suburb: yup.string().when('suburb', {
    is: (value, schema) => useFormContext().formState.dirtyFields.suburb,
    then: yup
      .string()
      .nullable()
      .min(3, 'Suburb must be at least 3 character')
      .max(50, 'Suburb cannot exceed 50 characters'),
  }),
  postcode: yup.string().when('postcode', {
    is: (value, schema) => useFormContext().formState.dirtyFields.postcode,
    then: yup
      .string()
      .nullable()
      .matches(postcodeRegex, 'Please enter a valid Australian Postcode'),
  }),
  facebookName: yup.string().when('facebookName', {
    is: (value, schema) => useFormContext().formState.dirtyFields.facebookName,
    then: yup
      .string()
      .nullable()
      .min(3, 'Facebook name must be at least 3 character')
      .max(50, 'Facebook name cannot exceed 50 characters'),
  }),
  story: yup.string().when('story', {
    is: (value, schema) => useFormContext().formState.dirtyFields.story,
    then: yup
      .string()
      .nullable()
      .min(3, 'Facebook story name must be at least 3 character')
      .max(500, 'Facebook story name cannot exceed 50 characters'),
  }),
})

export {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  passwordResetRequestSchema,
  generalInformationSchema,
}
