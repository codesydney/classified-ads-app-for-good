import { Container, TextField, Stack, Button } from '@mui/material'
import useAuthForm from '../hooks/useAuthForm'
import { UserAPI } from '../apis/UserAPI'
import { Link } from 'react-router-dom'

const SignInForm = () => {
  const initialFormData = { email: '', password: '' }
  const {
    formData,
    inputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverError,
    setServerError,
    handleChange,
    handleBlurValidation,
    isSubmitValidationSuccess,
    handleServerErrors,
  } = useAuthForm(initialFormData, 'signIn')

  const handleSubmit = async event => {
    event.preventDefault()
    setServerError('')

    // run submit validation
    if (!isSubmitValidationSuccess()) return

    setIsLoading(true)
    try {
      const response = await UserAPI.signIn(formData)
      // set jwt token to session storage
      const token = response.data.token
      sessionStorage.setItem('jwt', token)
      // redirect to home?
      console.log('success', response)
      setIsLoading(false)
    } catch (error) {
      // handle request errors
      handleServerErrors(error)
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        {serverError && <p>{serverError}</p>}
        <Stack spacing={2}>
          <TextField
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
          <Link to="/request-reset-password">Forgot Password?</Link>
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default SignInForm
