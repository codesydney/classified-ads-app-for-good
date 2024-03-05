import { Container, TextField, Stack, Button } from '@mui/material'
import { UserAPI } from '../apis/UserAPI'
import useAuthForm from '../hooks/useAuthForm'

const SignUpForm = () => {
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

  const handleSubmit = async event => {
    event.preventDefault()

    // run submit validation
    if (!isSubmitValidationSuccess()) return

    setFormStatus({ ...formStatus, loading: true })

    try {
      const response = await UserAPI.signUp(formData)

      // set jwt in session storage.
      const token = response.data.token
      sessionStorage.setItem('jwt', token)

      setFormStatus({ ...formStatus, loading: false })
      console.log('success', response)
      // Redirect to home?
    } catch (error) {
      handleServerErrors(error)
    }
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
            label="Password"
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
            label="Confirm Password"
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
            Sign up
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default SignUpForm
