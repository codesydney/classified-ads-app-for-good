import { Container } from '@mui/material'
import SignUpForm from '../components/SignUpForm'
import { Link } from 'react-router-dom'

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
      <p>
        Already have an account? Sign in <Link to="/signup">Here</Link>
      </p>
    </Container>
  )
}

export default Signup
