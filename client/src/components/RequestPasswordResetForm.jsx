import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserAPI } from '../apis/UserAPI'
import { passwordResetRequestSchema } from '../schema'

const RequestPasswordResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetRequestSchema),
  })
  const onSubmit = async formData => {
    try {
      await UserAPI.requestReset(formData)
    } catch (error) {
      console.log('error', error)
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

        <button
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 mt-[15px]"
          type="submit"
        >
          Request
        </button>
      </div>
    </form>
  )
}

export default RequestPasswordResetForm
