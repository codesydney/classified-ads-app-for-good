import { useState } from 'react'
import UserRow from './UserRow'
import EditActiveButtonsGroup from './EditButtonsGroup'
import { useAppDispatch } from '../../../store'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchemaAdmin } from '../../../schema'
import { useForm } from 'react-hook-form'
import HoverButtonBar from './HoverButtonBar'

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

  // Reset formState to align with redux state when edit view is toggled
  const handleToggleEditView = () => {
    setEditViewOpen(!editViewOpen)
    reset(user)
  }

  // Revert changes made in edit mode while staying in edit mode (revert to redux state)
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
      <HoverButtonBar
        isHovered={isHovered}
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        handleToggleEditView={handleToggleEditView}
      />
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
        {editViewOpen && (
          <EditActiveButtonsGroup
            handleRevertChanges={handleRevertChanges}
            handleToggleEditView={handleToggleEditView}
          />
        )}
      </form>
    </div>
  )
}

export default IndividualUserResultContainer
