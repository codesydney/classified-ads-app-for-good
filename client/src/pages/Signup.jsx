import SignUpForm from '../components/SignUpForm'
import { Link } from 'react-router-dom'
import SignUpHeroPic from '../assets/ust-sign-up.jpeg'

const Signup = () => {
  return (
    <div className="flex w-full">
      <div className="hidden md:block relative h-[950px]">
        <img
          src={SignUpHeroPic}
          alt="nature"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-col items-center mt-10 w-full max-w-md mx-auto flex-grow lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <SignUpForm />
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-dark">
            Here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
