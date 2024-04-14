import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store.js'
import { login, me } from '../features/auth/authAction.js'
import { loginSchema } from '../schema'

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loading: isLoading } = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async formData => {
    try {
      const response = await dispatch(login(formData))

      if (response.type === 'auth/login/rejected') {
        setErrorMessage(response.payload)
        return
      }

      setErrorMessage('')

      // After a successful login call a me function to retrieve the user's data
      await dispatch(me())

      navigate('/profile')
      toast.success('Success! You are now signed in.')
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
                  ? 'border-2 border-red-500 focus:border-transparent focus:outline-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary'
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
                  ? 'border-2 border-red-500 focus:border-transparent focus:outline-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-2 border-gray-300 focus:border-transparent focus:ring-2 focus:ring-primary'
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
        </div>

        <div className="mt-[15px]">
          <Link
            to="/request-reset-password"
            className="text-primary hover:underline "
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className=" w-full py-2 bg-primary bg-transparent hover:bg-primary text-primary hover:font-semibold hover:text-white mt-[15px] rounded-md border-2 border-primary ease-in-out duration-300"
          type="submit"
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </>
  )
}

export default LoginForm
