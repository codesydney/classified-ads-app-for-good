import { Container, TextField, Stack, Button } from '@mui/material'
import useAuthForm from '../hooks/useAuthForm'
import { UserAPI } from '../apis/UserAPI'

const RequestPasswordResetForm = () => {
  const initialFormData = { email: '' }
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
  } = useAuthForm(initialFormData, 'requestReset')

  const handleSubmit = async event => {
    event.preventDefault()

    if (!isSubmitValidationSuccess()) return

    setFormStatus({ ...formStatus, loading: true })
    try {
      const response = await UserAPI.requestReset(formData)
      setFormStatus({
        ...formStatus,
        successMessage:
          'Success! We have sent you an email with instructions to reset your password.',
        loading: true,
      })
    } catch (error) {
      handleServerErrors(error)
    }
  }

  if (formStatus.successMessage) return <p>{formStatus.successMessage}</p>

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        {formStatus.error && <p>{formStatus.error}</p>}
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
            disabled={formStatus.loading}
          >
            Request New Password.
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default RequestPasswordResetForm
