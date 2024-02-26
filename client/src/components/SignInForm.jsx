import { Container, TextField, Stack, Button } from '@mui/material'

const SignInForm = () => {
  const initialFormData = { email: '', password: '' }

  return (
    <Container maxWidth="sm">
      <form>
        <Stack spacing={2}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value=""
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            value=""
          />
          <Button variant="contained" size="large" type="submit">
            Sign In
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default SignInForm
