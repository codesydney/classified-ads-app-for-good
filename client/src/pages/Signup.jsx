import { Container } from '@mui/material'
import SignUpForm from '../components/SignUpForm'

const Signup = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <h1>Sign Up</h1>
      <SignUpForm />
    </Container>
  )
}

export default Signup
