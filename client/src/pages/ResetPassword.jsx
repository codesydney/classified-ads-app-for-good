import { Container } from '@mui/material'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPassword = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <h1>Reset Password</h1>
      <ResetPasswordForm />
    </Container>
  )
}

export default ResetPassword
