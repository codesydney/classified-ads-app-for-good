import { useState } from 'react'
import { UserAPI } from '../apis/UserAPI'

const RequestPasswordResetForm = () => {
  const [formData, setFormData] = useState({ email: '' })
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    successMessage: '',
  })
  const [inputErrors, setInputErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const isSubmitValidationSuccess = () => true
  const handleServerErrors = error => {
    setFormStatus({ ...formStatus, loading: false, error: error.message })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!isSubmitValidationSuccess()) return

    setFormStatus({ ...formStatus, loading: true })
    try {
      const response = await UserAPI.requestReset(formData)
      setFormStatus({
        ...formStatus,
        successMessage:
          'Success! We have sent you an email with instructions to reset your password.',
        loading: false,
      })
    } catch (error) {
      handleServerErrors(error)
    }
  }

  if (formStatus.successMessage)
    return <p className="text-green-500">{formStatus.successMessage}</p>

  return (
    <div className="max-w-sm mx-auto my-8">
      <form onSubmit={handleSubmit}>
        {formStatus.error && <p className="text-red-500">{formStatus.error}</p>}
        <div className="flex flex-col gap-4">
          <input
            className={`w-full p-4 border ${inputErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {inputErrors.email && (
            <p className="text-red-500 text-sm">{inputErrors.email}</p>
          )}

          <button
            className={`w-full p-4 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50`}
            type="submit"
            disabled={formStatus.loading}
          >
            Request New Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default RequestPasswordResetForm
