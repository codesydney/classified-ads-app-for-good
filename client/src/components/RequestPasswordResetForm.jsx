import { Container, TextField, Stack, Button } from '@mui/material'
import useAuthForm from '../hooks/useAuthForm'
import { UserAPI } from '../apis/UserAPI'

const RequestPasswordResetForm = () => {
  const initialFormData = { email: '' }
  const {
    formData,
    inputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverError,
    setServerError,
    successMessage,
    setSuccessMessage,
    handleChange,
    handleBlurValidation,
    isSubmitValidationSuccess,
    handleServerErrors,
  } = useAuthForm(initialFormData, 'requestReset')

  const handleSubmit = async event => {
    event.preventDefault()
    setServerError('')
    if (!isSubmitValidationSuccess()) return
    setIsLoading(true)

    try {
      const response = await UserAPI.requestReset(formData)
      setSuccessMessage(
        'Success! We have sent you an email with instructions to reset your password.',
      )
      setIsLoading(false)
    } catch (error) {
      handleServerErrors(error)
      setIsLoading(false)
    }
  }

  if (successMessage) return <p>{successMessage}</p>

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
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
          >
            Request New Password.
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default RequestPasswordResetForm
