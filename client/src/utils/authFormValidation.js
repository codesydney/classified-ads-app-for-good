const emailRegex =
  /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/

export const validationFunctions = {
  required: value => {
    if (!value.trim()) return 'This Field is required.'
    return ''
  },
  email: email => {
    const isEmpty = validationFunctions.required(email)
    if (isEmpty) {
      return isEmpty
    }
    if (!emailRegex.test(email)) {
      return 'Invalid Email Format'
    }
    return ''
  },
  password: password => {
    const isEmpty = validationFunctions.required(password)
    if (isEmpty) {
      return isEmpty
    }
    if (password.length < 7) {
      return 'Password is to short.'
    }
    return ''
  },
  passwordConfirm: (passwordConfirm, password) => {
    if (passwordConfirm !== password) {
      return 'Passwords do not match'
    }
    return ''
  },
  signUp: formData => {
    const { email, password, passwordConfirm } = formData
    return {
      email: validationFunctions.email(email),
      password: validationFunctions.password(password),
      passwordConfirm: validationFunctions.passwordConfirm(
        passwordConfirm,
        password,
      ),
    }
  },
  signIn: formData => {
    const { email, password } = formData
    return {
      email: validationFunctions.email(email),
      password: validationFunctions.password(password),
    }
  },
  requestReset: formData => {
    const { email } = formData
    return {
      email: validationFunctions.email(email),
    }
  },
}
