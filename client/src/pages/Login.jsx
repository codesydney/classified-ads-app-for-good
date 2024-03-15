import SignInForm from '../components/SignInForm'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <SignInForm />
      <p className="mt-4">
        Don't have an account? Sign up{' '}
        <Link to="/signup" className="text-primary hover:text-primary-dark">
          Here
        </Link>
      </p>
    </div>
  )
}

export default Login
