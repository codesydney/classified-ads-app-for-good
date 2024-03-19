import * as yup from 'yup'

const emailRegex =
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/

const signUpSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required()

const loginSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required()

const passwordResetSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required()

const resetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required()

const passwordResetRequestSchema = yup
  .object({
    email: yup
      .string()
      .matches(emailRegex, 'Invalid email')
      .required('Email is required'),
  })
  .required()

export {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  passwordResetRequestSchema,
}
