import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { UserAPI } from '../apis/UserAPI'
import { signUpSchema } from '../schema'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = async formData => {
    try {
      const response = await UserAPI.signUp(formData)
      const token = response.data.token
      localStorage.setItem('jwt', token)
      toast.success('Success! You are now signed up.', {
        position: 'top-right',
      })
    } catch (error) {
      console.log('Error signing up:', error)
    }
  }

  return (
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
            {...register('confirmPassword')}
            className={`input input-bordered w-full ${
              errors.confirmPassword
                ? 'border-red-500 focus:outline-red-500'
                : 'border-gray-300 focus:outline-primary'
            } focus:outline-primary`}
          />

          {errors.confirmPassword && (
            <div className="label">
              <span className="label-text-alt text-red-500">
                {errors.confirmPassword.message}
              </span>
            </div>
          )}
        </label>

        <button
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 mt-[15px]"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUpForm
