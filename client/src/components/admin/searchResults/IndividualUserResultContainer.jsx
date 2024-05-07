import { useEffect, useState } from 'react'
import UserRow from './UserRow'
import EditActiveButtonsGroup from './EditButtonsGroup'
import { useAppDispatch } from '../../../store'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchemaAdmin } from '../../../schema'
import { useForm } from 'react-hook-form'
import HoverButtonBar from './HoverButtonBar'

function transformObjToArray(obj) {
  const result = []
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // Nested object - recurse
      result.push({
        field: key,
        value: transformObjToArray(value),
        id: Math.ceil(Math.random() * 10000),
      })
    } else {
      result.push({
        field: key,
        value,
        id: Math.ceil(Math.random() * 10000),
      })
    }
  }
  return result
}

const IndividualUserResultContainer = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editViewOpen, setEditViewOpen] = useState(false)
  const [formState, setFormState] = useState(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const transformedObjArray = transformObjToArray(user)
    setFormState(transformedObjArray)
  }, [user])

  // Reset formState to align with redux state when edit view is toggled
  const handleToggleEditView = () => {
    setEditViewOpen(!editViewOpen)
  }

  // Revert changes made in edit mode while staying in edit mode (revert to redux state)
  const handleRevertChanges = () => {
    setFormState(transformObjToArray(user))
  }

  const handleFieldEdit = event => {
    const newFormState = JSON.parse(JSON.stringify(formState))
    let { name, value, type } = event.target
    if (type === 'select-one') {
      value = value === 'true'
    }

    const nestedKeysArray = name.split('.')
    const lastKeyIndex = nestedKeysArray.length - 1

    let nestedProperty = nestedKeysArray.reduce(
      (accumulator, currentKey, currentIndex) => {
        console.log(accumulator, currentKey, currentIndex)
        if (accumulator && accumulator[currentKey] !== undefined) {
          if (currentIndex === lastKeyIndex) {
            return accumulator
          } else {
            console.log('return nested field', accumulator[currentKey])
            return accumulator[currentKey]
          }
        } else {
          console.log('this is broken man')
        }
      },
      newFormState,
    )

    const lastKey = nestedKeysArray[lastKeyIndex]
    nestedProperty[lastKey] = value

    setFormState(newFormState)
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
        {formState &&
          formState.map((obj, index) => {
            return (
              <UserRow
                key={obj.id}
                editViewOpen={editViewOpen}
                isExpanded={isExpanded}
                fieldNameIdentifier={`[${index}.field`}
                fieldNameState={obj.field}
                fieldValueIdentifer={`${index}.value`}
                fieldValueState={obj.value}
                handleRowDeletion={handleRowDeletion}
                handleFieldEdit={handleFieldEdit}
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
