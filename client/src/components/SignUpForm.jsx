import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-hot-toast'
import { UserAPI } from '../apis/UserAPI'
import { signUpSchema } from '../schema/signup.js'

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
    <div className="max-w-sm mx-auto my-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <input
            {...register('email')}
            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-[-15px]">
              {errors.email.message}
            </p>
          )}

          <input
            {...register('password')}
            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            {...register('confirmPassword')}
            className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
