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
    const { name, value, type } = event.target
    const updatedValue = type === 'select-one' ? value === 'true' : value

    const nestedKeysArray = name.split('.')
    const lastKeyIndex = nestedKeysArray.length - 1

    nestedKeysArray.reduce((accumulator, currentKey, currentIndex) => {
      console.log(accumulator, currentKey, currentIndex)

      if (accumulator && accumulator[currentKey] !== undefined) {
        if (currentIndex === nestedKeysArray.length - 1) {
          // Check if last iteration
          accumulator[currentKey] = updatedValue // Update the value directly
        } else {
          return accumulator[currentKey]
        }
      } else {
        console.log('error should not enter this block.')
      }
    }, newFormState)
    setFormState(newFormState)
  }

  // Handle row deleting
  const handleRowDeletion = rowToDelete => {
    const newFormState = JSON.parse(JSON.stringify(formState))

    const nestedKeysArray = rowToDelete.split('.')
    const lastKey = parseInt(nestedKeysArray.pop(), 10)
    const arrayToRemoveRowFrom = nestedKeysArray.reduce(
      (accumulator, currentKey, currentIndex) => {
        if (accumulator && accumulator[currentKey] !== undefined) {
          return accumulator[currentKey]
        } else {
          console.log('awee shit man its broken')
        }
      },
      newFormState,
    )
    if (arrayToRemoveRowFrom && lastKey !== undefined) {
      arrayToRemoveRowFrom.splice(lastKey, 1)
      setFormState(newFormState)
    }
  }

  const handleAddFieldAfterRow = rowToAddAfter => {
    const newFormState = JSON.parse(JSON.stringify(formState))

    const nestedKeysArray = rowToAddAfter.split('.')
    const lastKey = parseInt(nestedKeysArray.pop(), 10) + 1
    const newRow = { field: '', value: '', id: Math.ceil(Math.random() * 100) }

    const arrayToAddRowTo = nestedKeysArray.reduce(
      (accumulator, currentKey, currentIndex) => {
        if (accumulator && accumulator[currentKey] !== undefined) {
          return accumulator[currentKey]
        } else {
          console.log('awee shit man its broken')
        }
      },
      newFormState,
    )

    arrayToAddRowTo.splice(lastKey, 0, newRow)
    setFormState(newFormState)
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
                fieldNameIdentifier={`${index}.field`}
                fieldNameState={obj.field}
                fieldValueIdentifier={`${index}.value`}
                fieldValueState={obj.value}
                currentRow={`${index}`}
                handleRowDeletion={handleRowDeletion}
                handleFieldEdit={handleFieldEdit}
                handleAddFieldAfterRow={handleAddFieldAfterRow}
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
