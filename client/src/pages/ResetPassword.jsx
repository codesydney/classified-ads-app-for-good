import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPassword = () => {
  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      <ResetPasswordForm />
    </div>
  )
}

export default ResetPassword
