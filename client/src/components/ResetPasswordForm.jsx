import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store.js'
import { resetPassword } from '../features/auth/authAction.js'
import { resetPasswordSchema } from '../schema'

const ResetPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loading: isLoading } = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })

  const onSubmit = async formData => {
    const token = searchParams.get('token')
    if (!token) {
      navigate('/login')
    }

    try {
      const response = await dispatch(resetPassword(formData, token))

      if (response.type === 'auth/resetPassword/rejected') {
        setErrorMessage(response.payload)
        return
      }

      setErrorMessage('')

      navigate('/login')
      toast.success(
        'Your password has been reset. You can now login with the new credentials.',
      )
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
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

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-[15px] font-semibold">
                Password <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="password"
              {...register('password')}
              className={`input input-bordered w-full ${
                errors.password
                  ? 'border-red-500 focus:outline-red-500'
                  : 'border-gray-300 focus:outline-primary'
              } focus:outline-primary`}
            />

            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {errors.password.message}
                </span>
              </div>
            )}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-[15px] font-semibold">
                Confirm Password <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="password"
              {...register('passwordConfirm')}
              className={`input input-bordered w-full ${
                errors.passwordConfirm
                  ? 'border-red-500 focus:outline-red-500'
                  : 'border-gray-300 focus:outline-primary'
              } focus:outline-primary`}
            />

            {errors.passwordConfirm && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {errors.passwordConfirm.message}
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
              'Reset'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default ResetPasswordForm
