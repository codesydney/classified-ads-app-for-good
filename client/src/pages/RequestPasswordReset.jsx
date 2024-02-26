import { Container } from '@mui/material'
import RequestPasswordResetForm from '../components/RequestPasswordResetForm'
import { Link } from 'react-router-dom'
const RequestPasswordReset = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <h1>Request Password Reset</h1>
      <RequestPasswordResetForm />
      <p>
        Sign in <Link to="/signin">Here</Link>
      </p>
    </Container>
  )
}

export default RequestPasswordReset
