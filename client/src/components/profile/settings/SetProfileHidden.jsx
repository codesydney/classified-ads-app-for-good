import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../../store'
import { updateProfile } from '../../../features/auth/authAction'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const SetProfileHidden = () => {
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useAppDispatch()
  const { currentUser, loading: isLoading } = useSelector(state => state.auth)

  useEffect(() => {
    if (currentUser) {
      setIsChecked(currentUser.hideProfile)
    }
  }, [currentUser])

  const handleCheckboxChange = async event => {
    const { name } = event.target
    const updateDetails = { [name]: !isChecked }
    setIsChecked(!isChecked)
    try {
      const response = await dispatch(updateProfile(updateDetails))

      if (response.type === 'auth/updateProfile/rejected') {
        setIsChecked(currentUser.hideProfile)
        return toast.error('Could not update your profile.')
      }

      toast.success('Profile successfully updated')
    } catch (error) {
      setIsChecked(currentUser.hideProfile)
      toast.error('Could not update your profile.')
    }
  }

  return (
    <div className="">
      <h2 className="text-bold text-xl mb-2">Hide Profile</h2>
      <p className="text-base mb-4">
        Hide your profile from public visibility. Your profile will not be
        displayed in search, and users will not be able to view your profile.
      </p>
      <label className="flex w-fit cursor-pointer select-none items-center focus-within:ring-blue-700 focus-within:ring-2 focus-within:rounded-full focus-within:ring-offset-2">
        <div className="relative">
          <input
            aria-label="Hide profile visibility"
            type="checkbox"
            name="hideProfile"
            disabled={isLoading}
            checked={isChecked}
            aria-checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full transition-colors duration-200
                    ${isChecked ? 'bg-primary' : 'bg-gray-200'}`}
          ></div>
          <div
            className={`dot absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-500
            ${isChecked ? 'left-7' : 'left-1'}`}
          ></div>
        </div>
      </label>
    </div>
  )
}

export default SetProfileHidden
