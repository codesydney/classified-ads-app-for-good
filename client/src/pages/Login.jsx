import SignInForm from '../components/SignInForm'
import { Link } from 'react-router-dom'
import LoginHeroPic from '../assets/ust-login.jpeg'

const Login = () => {
  return (
    <div className="flex">
      <div className="hidden md:block relative h-[950px]">
        <img
          src={LoginHeroPic}
          alt="nature"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-col items-center justify-center mt-[190px] md:mt-[0px] w-full max-w-md mx-auto flex-grow lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-[30px] font-bold mb-4">Login</h1>

        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
          <SignInForm />
        </div>

        <p className="mt-4">
          Don't have an account? Sign up
          <Link to="/signup" className="text-primary hover:underline">
            here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
