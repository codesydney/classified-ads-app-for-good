import { useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import UserRow from './UserRow'

const IndividualUserResultContainer = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="bg-white p-4 pt-8 m-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full px-4 flex gap-2 absolute left-0 top-4
          ${isHovered ? 'md:absolute' : 'md:hidden'}
        `}
      >
        <button className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4">
          <FaCaretRight />
        </button>
        <button className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4 ml-auto">
          <MdModeEditOutline />
        </button>
        <button className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4">
          <FaTrashAlt />
        </button>
      </div>

      <div className="pt-6 md:pl-10 md:pt-0">
        {Object.entries(user).map(([key, value]) => {
          return <UserRow key={key} field={key} value={value} />
        })}
      </div>
    </div>
  )
}

export default IndividualUserResultContainer
