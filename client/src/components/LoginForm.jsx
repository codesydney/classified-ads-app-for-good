import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { UserAPI } from '../apis/UserAPI'
import { toast } from 'react-hot-toast'
import { loginSchema } from '../schema/login.js'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async formData => {
    try {
      const response = await UserAPI.signIn(formData)
      const token = response.data.token
      localStorage.setItem('jwt', token)
      toast.success('Success! You are now signed in.', {
        position: 'top-right',
      })
    } catch (error) {
      toast.error(`Error signing in: ${error.message}`, {
        position: 'top-right',
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        </div>

        <div>
          <Link
            to="/request-reset-password"
            className="text-primary hover:underline mt-[1px]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
