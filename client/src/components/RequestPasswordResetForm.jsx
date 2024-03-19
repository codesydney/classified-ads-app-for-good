import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { UserAPI } from '../apis/UserAPI'
import { passwordResetRequestSchema } from '../schema'

const RequestPasswordResetForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const [showEMailSuccess, setShowEmailSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetRequestSchema),
  })
  const onSubmit = async formData => {
    try {
      setIsLoading(true)
      setEmailAddress(formData.email)
      await UserAPI.requestReset(formData)

      setTimeout(() => {
        setErrorMessage('')
        setIsLoading(false)

        setShowEmailSuccess(true)
        reset()
      }, 3000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setIsLoading(false)
    }
  }

  return (
    <>
      {errorMessage && (
        <div role="alert" className="alert alert-error my-[12px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setErrorMessage('')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {showEMailSuccess && (
        <div
          role="alert"
          className="alert alert-success my-[12px] text-white text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Your password reset has been been sent to {emailAddress}. Please
            check your email. <br />
            <br />
            <span className="">
              Login{' '}
              <Link to="/login" className="underline">
                here.
              </Link>
            </span>
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[8px]">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-[15px] font-semibold">
                Email <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="email"
              {...register('email')}
              className={`input input-bordered w-full ${
                errors.email
                  ? 'border-red-500 focus:outline-red-500'
                  : 'border-gray-300 focus:outline-primary'
              } focus:outline-primary`}
            />

            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              </div>
            )}
          </label>

          <button
            className="btn btn-squre w-full py-2 bg-primary hover:bg-primary text-white mt-[15px]"
            type="submit"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Request'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default RequestPasswordResetForm
