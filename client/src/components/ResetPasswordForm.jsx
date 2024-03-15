import { useState } from 'react'
import { UserAPI } from '../apis/UserAPI'
import { useSearchParams, Link } from 'react-router-dom'

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    successMessage: '',
  })
  const [inputErrors, setInputErrors] = useState({})
  const [searchParams] = useSearchParams()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Placeholder for validation logic
  const isSubmitValidationSuccess = () => true
  const handleServerErrors = error => {
    setFormStatus({ ...formStatus, loading: false, error: error.message })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!isSubmitValidationSuccess()) return

    const token = searchParams.get('token')
    if (!token) {
      setFormStatus({
        ...formStatus,
        error: 'Invalid token. Please request another email.',
      })
      return
    }

    setFormStatus({ ...formStatus, loading: true })
    try {
      await UserAPI.resetPassword(formData, token)
      setFormStatus({
        ...formStatus,
        successMessage: 'Success! You can now sign in using your new password.',
        loading: false,
      })
    } catch (error) {
      handleServerErrors(error)
    }
  }

  if (formStatus.successMessage) {
    return (
      <div className="text-center mt-6">
        <p className="mb-4">{formStatus.successMessage}</p>
        <Link to="/signin" className="text-primary hover:underline">
          Sign in here
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        {formStatus.error && <p className="text-red-500">{formStatus.error}</p>}
        <div className="flex flex-col gap-4">
          <input
            className={`w-full p-4 border ${inputErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {inputErrors.email && (
            <p className="text-red-500 text-sm">{inputErrors.email}</p>
          )}

          <input
            className={`w-full p-4 border ${inputErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
          />
          {inputErrors.password && (
            <p className="text-red-500 text-sm">{inputErrors.password}</p>
          )}

          <input
            className={`w-full p-4 border ${inputErrors.passwordConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm New Password"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {inputErrors.passwordConfirm && (
            <p className="text-red-500 text-sm">
              {inputErrors.passwordConfirm}
            </p>
          )}

          <button
            className={`w-full p-4 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50`}
            type="submit"
            disabled={formStatus.loading}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordForm
