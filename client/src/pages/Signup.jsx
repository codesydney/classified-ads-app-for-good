import SignUpForm from '../components/SignUpForm'
import Consent from '../components/Consent'
import { Link } from 'react-router-dom'
import SignUpHeroPic from '../assets/ust-triahaec.jpeg'

const Signup = () => {
  return (
    <div className="flex w-full">
      <div className="hidden md:block relative h-[95vh]">
        <img
          src={SignUpHeroPic}
          alt="nature"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-col items-center justify-center my-[90px] md:my-[0px] w-full max-w-md mx-auto flex-grow lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-[30px] font-bold mb-4">Sign Up</h1>

        <div className="w-full px-6 sm:px-8 md:px-16 lg:px-32 xl:px-40">
          <SignUpForm />
        </div>

        <p className="mt-4">
          Already have an account? Login{' '}
          <Link to="/login" className="text-primary hover:underline">
            here
          </Link>
        </p>

        <div className="w-full px-6 sm:px-8 md:px-16 lg:px-32 xl:px-40 mt-[25px] mb-[25px]">
          <Consent />
        </div>
      </div>
    </div>
  )
}

export default Signup
