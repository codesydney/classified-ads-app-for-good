import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { useState } from 'react'
import { changePasswordSchema } from '../../../schema/index.js'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { updatePassword } from '../../../features/auth/authAction.js'
import { useAppDispatch } from '../../../store.js'

const ChangePassword = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  })

  const { loading: isLoading } = useSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const onSubmit = async formData => {
    try {
      console.log('wooohooo')

      const response = await dispatch(updatePassword(formData))
      console.log('respnese', response)
      if (response.type === 'auth/updatePassword/rejected') {
        return setErrorMessage(response.payload)
      }

      setErrorMessage('')
      toast.success('Your password has been changed!')
      reset()
    } catch (error) {
      console.log('Error', error)
      setErrorMessage('Something went wrong')
    }
  }

  return (
    <div className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-bold text-xl mb-2">Change Password</h3>
      <div className="">
        {formOpen ? (
          <form className="">
            {errorMessage && (
              <div
                role="alert"
                className="alert alert-error my-[12px] text-white"
              >
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
            <InputGroup
              name="currentPassword"
              label="Current Password"
              type="password"
              required={true}
              errors={errors}
              register={register}
              setFocus={setFocus}
              tooltip="Enter the password you have now."
            />
            <InputGroup
              name="newPassword"
              label="New Password"
              type="password"
              required={true}
              errors={errors}
              register={register}
              setFocus={setFocus}
              tooltip="Enter your new password"
            />
            <InputGroup
              name="newPasswordConfirm"
              label="Confirm New Password"
              type="password"
              required={true}
              errors={errors}
              register={register}
              setFocus={setFocus}
              tooltip="Enter your new password again"
            />
            <div className="flex gap-4">
              <FormButton isLoading={isLoading} isDirty={isDirty}>
                Change Password
              </FormButton>
              <button
                className="btn btn-squre w-fit py-2 bg-red-400 hover:bg-red-500 text-white mt-[15px]"
                type="button"
                onClick={e => {
                  e.preventDefault()
                  setFormOpen(false)
                  reset()
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="btn btn-squre w-fit py-2 bg-primary hover:bg-primary text-white mt-[15px]"
            onClick={() => setFormOpen(true)}
          >
            Change Password
          </button>
        )}
      </div>
    </div>
  )
}

export default ChangePassword
