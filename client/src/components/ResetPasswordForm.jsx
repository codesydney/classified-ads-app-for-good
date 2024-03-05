import { Container, TextField, Stack, Button } from '@mui/material'
import { UserAPI } from '../apis/UserAPI'
import useAuthForm from '../hooks/useAuthForm'
import { Link, useSearchParams } from 'react-router-dom'

const ResetPasswordForm = () => {
  const initialData = { email: '', password: '', passwordConfirm: '' }
  const {
    formData,
    inputErrors,
    fieldRefs,
    formStatus,
    setFormStatus,
    handleChange,
    handleBlurValidation,
    isSubmitValidationSuccess,
    handleServerErrors,
  } = useAuthForm(initialData, 'signUp')
  const [searchParams] = useSearchParams()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!isSubmitValidationSuccess()) return

    // pull token from query params
    // If no token is present - set error and exit function
    const token = searchParams.get('token')
    if (!token) {
      setFormStatus({
        ...formStatus,
        error: 'Invalid token. Please request another email.',
      })
      return
    }

    setFormStatus({ ...formStatus, loading: true })
    try {
      const response = await UserAPI.resetPassword(formData, token)
      setFormStatus({
        ...formStatus,
        successMessage: 'Success! You can now sign in using your new password.',
        loading: false,
      })
    } catch (error) {
      handleServerErrors(error)
    }
  }

  // Display success message instead of form on password reset successful.
  if (formStatus.successMessage) {
    return (
      <div>
        {formStatus.successMessage} <Link to="/signin">Sign in here</Link>
      </div>
    )
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        {formStatus.error && <p>{formStatus.error}</p>}
        <Stack spacing={3}>
          <TextField
            size="medium"
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            inputRef={fieldRefs.email}
            error={!!inputErrors.email}
            helperText={inputErrors.email}
          />
          <TextField
            id="password"
            label="New Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            inputRef={fieldRefs.password}
            error={!!inputErrors.password}
            helperText={inputErrors.password}
          />
          <TextField
            id="passwordConfirm"
            label="Confirm New Password"
            variant="outlined"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            inputRef={fieldRefs.passwordConfirm}
            error={!!inputErrors.passwordConfirm}
            helperText={inputErrors.passwordConfirm}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={formStatus.loading}
          >
            Reset Password
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default ResetPasswordForm
