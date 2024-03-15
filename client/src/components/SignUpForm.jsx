import { useState } from 'react'
import { UserAPI } from '../apis/UserAPI'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [formStatus, setFormStatus] = useState({ loading: false, error: '' })
  const [inputErrors, setInputErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Replace this with your actual validation logic
  const isSubmitValidationSuccess = () => true

  // Replace this with your actual error handling logic
  const handleServerErrors = error => {
    setFormStatus({ ...formStatus, loading: false, error: error.message })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!isSubmitValidationSuccess()) return

    setFormStatus({ ...formStatus, loading: true })

    try {
      const response = await UserAPI.signUp(formData)
      const token = response.data.token
      sessionStorage.setItem('jwt', token)
      setFormStatus({ ...formStatus, loading: false })
      console.log('success', response)
      // Redirect logic here
    } catch (error) {
      handleServerErrors(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto my-8">
      <form onSubmit={handleSubmit}>
        {formStatus.error && <p className="text-red-500">{formStatus.error}</p>}
        <div className="flex flex-col gap-6">
          <input
            className={`w-full px-4 py-2 border ${inputErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
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
            className={`w-full px-4 py-2 border ${inputErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {inputErrors.password && (
            <p className="text-red-500 text-sm">{inputErrors.password}</p>
          )}

          <input
            className={`w-full px-4 py-2 border ${inputErrors.passwordConfirm ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          {inputErrors.passwordConfirm && (
            <p className="text-red-500 text-sm">
              {inputErrors.passwordConfirm}
            </p>
          )}

          <button
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            type="submit"
            disabled={formStatus.loading}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
