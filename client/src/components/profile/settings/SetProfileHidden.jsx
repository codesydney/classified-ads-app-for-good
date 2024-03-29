import { useState } from 'react'

const SetProfileHidden = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleCheckboxChange = async event => {}
  console.log(isChecked)
  return (
    <div className="">
      <h2 className="text-bold text-xl mb-2">Hide Profile</h2>
      <p className="text-base mb-4">
        Hide your profile from public visibility. Your profile will not be
        displayed in search, and users will not be able to view your profile.
      </p>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked)
            }}
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
