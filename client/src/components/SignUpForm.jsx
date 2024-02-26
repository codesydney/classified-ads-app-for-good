import { Container, TextField, Stack, Button } from '@mui/material'

const SignUpForm = () => {
  const intitialData = { email: '', password: '', passwordConfirm: '' }

  return (
    <Container maxWidth="sm">
      <form>
        <Stack spacing={3}>
          <TextField
            size="medium"
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
          <TextField
            id="passwordConfirm"
            label="Confirm Password"
            variant="outlined"
            name="passwordConfirm"
            value=""
          />
          <Button variant="contained" size="large" type="submit">
            Sign up
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default SignUpForm
