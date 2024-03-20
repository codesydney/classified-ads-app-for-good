import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../store.js'
import { signUp } from '../features/auth/authAuction.js'
import { signUpSchema } from '../schema'

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loading: isLoading } = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = async formData => {
    try {
      const response = await dispatch(signUp(formData))

      if (response.type === 'auth/signUp/rejected') {
        setErrorMessage(response.payload)
        return
      }

      setErrorMessage('')

      navigate('/')
      toast.success('Sign up is successful, you can now login.', {
        position: 'top-right',
      })
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
                First Name <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="text"
              {...register('firstName')}
              className={`input input-bordered w-full ${
                errors.firstName
                  ? 'border-red-500 focus:outline-red-500'
                  : 'border-gray-300 focus:outline-primary'
              } focus:outline-primary`}
            />

            {errors.firstName && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {errors.firstName.message}
                </span>
              </div>
            )}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-[15px] font-semibold">
                Last Name <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="text"
              {...register('lastName')}
              className={`input input-bordered w-full ${
                errors.lastName
                  ? 'border-red-500 focus:outline-red-500'
                  : 'border-gray-300 focus:outline-primary'
              } focus:outline-primary`}
            />

            {errors.lastName && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {errors.lastName.message}
                </span>
              </div>
            )}
          </label>

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
              'Sign Up'
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default SignUpForm
