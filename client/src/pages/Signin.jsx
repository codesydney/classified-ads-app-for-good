import { Container } from '@mui/material'
import SignInForm from '../components/SignInForm'
import { Link } from 'react-router-dom'
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
      <p>
        Don't have an account? Sign up <Link to="/signup">Here</Link>
      </p>
    </Container>
  )
}

export default Signin
