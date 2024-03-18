import RequestPasswordResetForm from '../components/RequestPasswordResetForm'
import { Link } from 'react-router-dom'

const RequestPasswordReset = () => {
  return (
    <div className="flex">
      <div className="hidden md:block relative h-[950px]">
        <img
          src="https://images.unsplash.com/photo-1594451290197-2214cb06c290?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="nature"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      <div className="flex flex-col items-center mt-10 w-full max-w-md mx-auto flex-grow lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Request Password Reset</h1>
        <RequestPasswordResetForm />
        <p className="mt-4">
          Sign in{' '}
          <Link to="/login" className="text-primary">
            Here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RequestPasswordReset
