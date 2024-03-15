import RequestPasswordResetForm from '../components/RequestPasswordResetForm'
import { Link } from 'react-router-dom'

const RequestPasswordReset = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Request Password Reset</h1>
      <RequestPasswordResetForm />
      <p className="mt-4">
        Sign in{' '}
        <Link to="/signin" className="text-primary">
          Here
        </Link>
      </p>
    </div>
  )
}

export default RequestPasswordReset
