import useAuthForm from '../hooks/useAuthForm'
import { UserAPI } from '../apis/UserAPI'
import { Link } from 'react-router-dom'

const SignInForm = () => {
  const initialFormData = { email: '', password: '' }
  const {
    formData,
    inputErrors,
    fieldRefs,
    formStatus,
    setFormStatus,
    handleChange,
    handleBlurValidation,
    isSubmitValidationSuccess,
    handleServerErrors,
  } = useAuthForm(initialFormData, 'signIn')

  const handleSubmit = async event => {
    event.preventDefault()

    if (!isSubmitValidationSuccess()) return

    setFormStatus({ ...formStatus, loading: true })
    try {
      const response = await UserAPI.signIn(formData)
      const token = response.data.token
      sessionStorage.setItem('jwt', token)

      setFormStatus({ ...formStatus, loading: false })
      console.log('success', response)
      // redirect to home?
    } catch (error) {
      handleServerErrors(error)
    }
  }

  return (
    <div className="container mx-auto max-w-sm mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        {formStatus.error && <p className="text-red-500">{formStatus.error}</p>}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            ref={fieldRefs.email}
            className={`input ${inputErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your email"
          />
          {inputErrors.email && (
            <p className="text-red-500 text-sm">{inputErrors.email}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            ref={fieldRefs.password}
            className={`input ${inputErrors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter your password"
          />
          {inputErrors.password && (
            <p className="text-red-500 text-sm">{inputErrors.password}</p>
          )}
        </div>
        <Link
          to="/request-reset-password"
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link>
        <button
          type="submit"
          disabled={formStatus.loading}
          className={`w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary ${formStatus.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignInForm
