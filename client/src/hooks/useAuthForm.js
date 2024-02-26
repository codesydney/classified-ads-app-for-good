import { useState, useRef } from 'react'
import { validationFunctions } from '../utils/authFormValidation'

const useFieldRefs = fields => {
  const fieldRefs = {}
  Object.keys(fields).forEach(fieldName => {
    fieldRefs[fieldName] = useRef(null)
  })
  return fieldRefs
}

const useAuthForm = (initialData = {}, formName) => {
  const [formData, setFormData] = useState(initialData)
  const [inputErrors, setInputErrors] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const fieldRefs = useFieldRefs(initialData)

  // handle change event listener on input element
  const handleChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Validate input field on blur event
  const handleBlurValidation = event => {
    const { name, value } = event.target
    if (!value) return setInputErrors({ ...inputErrors, [name]: '' })
    setInputErrors({ ...inputErrors, [name]: validationFunctions[name](value) })
  }

  // Handle submit validation
  const isSubmitValidationSuccess = () => {
    // Validate Each field for the form
    const newValidationErrors = validationFunctions[formName](formData)

    // Find first key that contains and error
    const firstErrorField = Object.keys(newValidationErrors).find(field => {
      return newValidationErrors[field]
    })

    // Set input errors;
    setInputErrors(newValidationErrors)

    // Focus the first occurance of an error and return out of function
    if (firstErrorField && fieldRefs[firstErrorField].current) {
      fieldRefs['email'].current.focus()
      fieldRefs[firstErrorField].current.focus()
      return false
    }

    return true
  }

  const formatServerValidationErrors = errors => {
    const formattedErrors = {}
    errors.forEach(error => {
      formattedErrors[error.path] = error.msg
    })
    setInputErrors({ ...inputErrors, ...formattedErrors })
  }

  const handleServerErrors = error => {
    // some error
    console.log(error, 'error in handle submit')
    if (error.response && error.response.status === 422) {
      // set inline input validation errors
      formatServerValidationErrors(error.response.data.errors)
    } else if (error.response && error.response.status === 401) {
      // set form error (invalid credentials)
      setServerError(`${error.response.data.error}`)
    } else if (error.response && error.response.status === 409) {
      // set form error (Conflict error)
      setServerError(`${error.response.data.error}`)
    } else {
      // handle unexpected error. (network error etc)
      setServerError(`${error.message}. Try again later.`)
    }
  }

  const resetForm = () => {
    setFormData(initialData)
    setInputErrors(initialData)
    setIsLoading(false)
    setServerError('')
  }

  return {
    formData,
    inputErrors,
    setInputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverError,
    setServerError,
    handleChange,
    handleBlurValidation,
    isSubmitValidationSuccess,
    handleServerErrors,
  }
}

export default useAuthForm
