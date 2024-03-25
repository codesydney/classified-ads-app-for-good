import InputGroup from '../InputGroup.jsx'
import FormButton from '../FormButton.jsx'
import { useState } from 'react'
import { changePasswordSchema } from '../../../schema/index.js'
import { yupResolver } from '@hookform/resolvers/yup'
const ChangePassword = () => {
  const [formOpen, setFormOpen] = useState(false)
  return (
    <div className="mb-4">
      <h3 className="text-bold text-xl mb-2">Change Password</h3>
      <div className="">
        {formOpen ? (
          <form className="">
            <InputGroup
              name="currentPassword"
              label="Current Password"
              type="password"
              required={true}
              errors={false}
              register={() => {}}
              setFocus={false}
              tooltip="Enter the password you have now."
            />
            <InputGroup
              name="newPassword"
              label="New Password"
              type="password"
              required={true}
              errors={false}
              register={() => {}}
              setFocus={false}
              tooltip="Enter your new password"
            />
            <InputGroup
              name="newPasswordConfirm"
              label="Confirm New Password"
              type="password"
              required={true}
              errors={false}
              register={() => {}}
              setFocus={false}
              tooltip="Enter your new password again"
            />
            <div className="flex gap-4">
              <FormButton isLoading={false} isDirty={false}>
                Change Password
              </FormButton>
              <button
                className="btn btn-squre w-fit py-2 bg-red-400 hover:bg-red-500 text-white mt-[15px]"
                onClick={() => setFormOpen(false)}
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
