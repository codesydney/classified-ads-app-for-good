import { Container } from '@mui/material'
import SignInForm from '../components/SignInForm'
const Signin = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <h1>Sign In</h1>
      <SignInForm />
    </Container>
  )
}

export default Signin
