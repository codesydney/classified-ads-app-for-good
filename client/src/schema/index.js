import * as yup from 'yup'

const emailRegex =
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/

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

export {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  passwordResetRequestSchema,
}
