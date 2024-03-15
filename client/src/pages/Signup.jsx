import SignUpForm from '../components/SignUpForm'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <SignUpForm />
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/signin" className="text-primary hover:text-primary-dark">
          Here
        </Link>
      </p>
    </div>
  )
}

export default Signup
