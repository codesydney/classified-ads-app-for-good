import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { useState } from 'react'
import { changePasswordSchema } from '../../../schema/index.js'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const ChangePassword = () => {
  const [formOpen, setFormOpen] = useState(false)

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

  const onSubmit = async formData => {
    try {
      console.log('Whoooooo')
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-bold text-xl mb-2">Change Password</h3>
      <div className="">
        {formOpen ? (
          <form className="">
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
