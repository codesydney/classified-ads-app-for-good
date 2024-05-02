import { useEffect, useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { MdModeEditOutline } from 'react-icons/md'
import UserRow from './UserRow'
import { useAppDispatch } from '../../store'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchemaAdmin } from '../../schema'
import { useForm } from 'react-hook-form'

const IndividualUserResultContainer = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editViewOpen, setEditViewOpen] = useState(false)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(userSchemaAdmin),
    defaultValues: user,
  })

  // Reset formState when edit view is toggled
  const handleToggleEditView = () => {
    setEditViewOpen(!editViewOpen)
    reset(user)
  }

  // Revert changes made in edit mode while staying in edit mode
  const handleRevertChanges = () => {
    reset(user)
  }

  // Handle row deleting
  const handleRowDeletion = field => {
    const currentFormState = { ...getValues() }
    delete currentFormState[field]
    reset(currentFormState)
  }

  return (
    <div
      className="bg-white pb-4 pt-8 m-2 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full px-4 flex gap-2 absolute left-0 top-4
          ${isHovered ? 'md:absolute' : 'md:hidden'}
        `}
      >
        <button
          className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        <button
          className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4 ml-auto"
          onClick={handleToggleEditView}
        >
          <MdModeEditOutline />
        </button>
        <button className="border-gray-500 rounded border-[1px] px-2 py-1 hover:ring-gray-300 hover:ring-4">
          <FaTrashAlt />
        </button>
      </div>

      <form className="pt-6 md:pt-4">
        {Object.entries(getValues()).map(([key, value]) => {
          return (
            <UserRow
              editViewOpen={editViewOpen}
              key={key}
              isExpanded={isExpanded}
              field={key}
              value={value}
              register={register}
              handleRowDeletion={handleRowDeletion}
            />
          )
        })}
      </form>
      {editViewOpen && (
        <div className="flex justify-end gap-2 p-4 bg-gray-200/50 mt-4">
          <button
            className="border-gray-500 bg-white rounded border-[1px] text-xs px-2 py-1 mr-auto hover:ring-gray-300 hover:ring-4"
            onClick={handleRevertChanges}
          >
            Revert
          </button>
          <button
            className="border-gray-500 bg-white rounded border-[1px] text-xs px-2 py-1 hover:ring-gray-300 hover:ring-4"
            onClick={() => setEditViewOpen(false)}
          >
            Cancel
          </button>
          <button
            className=" bg-primary text-white border-primary rounded border-[1px] text-xs px-2 py-1 hover:ring-gray-300 hover:ring-4"
            onClick={() => setEditViewOpen(false)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  )
}

export default IndividualUserResultContainer
