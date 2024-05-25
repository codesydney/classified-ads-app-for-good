import { useEffect, useState } from 'react'
import UserRow from './UserRow'
import EditActiveButtonsGroup from './EditButtonsGroup'
import { useAppDispatch } from '../../../store'
import { userSchemaAdmin } from '../../../schema'
import { IoIosClose } from 'react-icons/io'
import HoverButtonBar from './HoverButtonBar'
import { v4 as uuidv4 } from 'uuid'
import {
  adminUpdateUser,
  adminDeleteUser,
} from '../../../features/admin/adminAction'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

// TRANSFORM USER OBJECT PROVIDED BY API INTO ARRAY USED TO MANAGE FORM STATE AND MANIPULATE BOTH KEYS AND VALUES
function transformObjToArray(obj) {
  const result = []
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // Nested object - recurse
      result.push({
        field: key,
        value: transformObjToArray(value),
        id: uuidv4(),
      })
    } else {
      result.push({
        field: key,
        value,
        id: uuidv4(),
      })
    }
  }
  return result
}

// CONVERT FORM STATE ARRAY BACK INTO TYPICALLY SHAPED OBJECT.
function transformArrayToObj(arr) {
  const result = {}
  for (const item of arr) {
    if (item.value === '' || item.field === '') continue
    if (Array.isArray(item.value)) {
      result[item.field] = transformArrayToObj(item.value)
    } else {
      result[item.field] = item.value
    }
  }
  return result
}

const IndividualUserResultContainer = ({ user, editDefault, isNew }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editViewOpen, setEditViewOpen] = useState(editDefault)
  const [formState, setFormState] = useState(null)
  const [validationErrors, setValidationErrors] = useState(null)
  const dispatch = useAppDispatch()
  const { loading: isLoading } = useSelector(state => state.admin)

  useEffect(() => {
    const transformedObjArray = transformObjToArray(user)
    setFormState(transformedObjArray)
  }, [user])

  // Reset formState to align with redux state when edit view is toggled
  const handleToggleEditView = () => {
    if (editViewOpen) {
      setFormState(transformObjToArray(user))
      setValidationErrors(null)
    }
    setEditViewOpen(!editViewOpen)
  }

  // Revert changes made in edit mode while staying in edit mode (revert to redux state)
  const handleRevertChanges = () => {
    setValidationErrors(null)
    setFormState(transformObjToArray(user))
  }

  // ONCHANGE HANDLER FOR ALL INPUT EVENTS
  const handleFieldEdit = event => {
    const newFormState = JSON.parse(JSON.stringify(formState))
    const { name, value, type } = event.target

    // TYPE COERCION FOR BOOLEAN AND NUMBER VALUES
    let updatedValue
    if (type === 'select-one') {
      updatedValue = value === 'true'
    } else if (type === 'number') {
      updatedValue = Number(value)
    } else {
      updatedValue = value
    }

    // NAME WILL ALWAYS TAKE SHAPE LIKE'0.field' OR '1.value.3.field'
    // THIS IS HOW DEEPLY NESTED VALUES ARE MAPPED AND CHANGED
    const nestedKeysArray = name.split('.')

    nestedKeysArray.reduce((accumulator, currentKey, currentIndex) => {
      if (accumulator && accumulator[currentKey] !== undefined) {
        // CHECK IF LAST ITERATION (IE CURRENTKEY = THE NESTED KEY OF THE VALUE WE ARE TRYING TO UPDATE)
        if (currentIndex === nestedKeysArray.length - 1) {
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

  // DELETE A KEY/VAL PAIR (row) OR AN ENTIRE NESTED OBJECT (IF THE VAL IS AN OBJECT)
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

  // ADD A FIELD AFTER THE FIELD THAT WAS CLICKED (SAME LEVEL NESTING)
  const handleAddFieldAfterRow = rowToAddAfter => {
    const newFormState = JSON.parse(JSON.stringify(formState))
    const nestedKeysArray = rowToAddAfter.split('.')
    const lastKey = parseInt(nestedKeysArray.pop(), 10) + 1
    const newRow = { field: '', value: '', id: uuidv4() }

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

  // ADD FIELD WITHIN (nested) THE FIELD THAT WAS CLICKED (ONLY AVAILABLE FOR FIELDS WITH TYPE OBJECT)
  const handleAddFieldWithinRow = rowToAddWithin => {
    const newFormState = JSON.parse(JSON.stringify(formState))
    const nestedKeysArray = rowToAddWithin.split('.')
    const newRow = { field: '', value: '', id: uuidv4() }

    nestedKeysArray.reduce((accumulator, currentKey, currentIndex) => {
      if (accumulator && accumulator[currentKey] !== undefined) {
        if (currentIndex === nestedKeysArray.length - 1) {
          return accumulator[currentKey].push(newRow)
        } else {
          return accumulator[currentKey]
        }
      } else {
        console.log('really should not be here')
      }
    }, newFormState)
    setFormState(newFormState)
  }

  // CHANGE THE TYPE OF VALUE IN EDIT MODE
  const handleFieldTypeChange = event => {
    const newFormState = JSON.parse(JSON.stringify(formState))
    const { name, value, type } = event.target

    // NAME WILL ALWAYS TAKE SHAPE LIKE'0.field' OR '1.value.3.field'
    // THIS IS HOW DEEPLY NESTED VALUES ARE MAPPED AND CHANGED
    const nestedKeysArray = name.split('.')

    nestedKeysArray.reduce((accumulator, currentKey, currentIndex) => {
      if (accumulator && accumulator[currentKey] !== undefined) {
        // CHECK IF LAST ITERATION (IE CURRENTKEY = THE NESTED KEY OF THE VALUE WE ARE TRYING TO CHANGE THE TYPE FOR)
        if (currentIndex === nestedKeysArray.length - 1) {
          // Conditional logic for each type

          if (value === 'string') {
            accumulator[currentKey] = ''
          } else if (value === 'number') {
            accumulator[currentKey] = 1
          } else if (value === 'boolean') {
            accumulator[currentKey] = false
          } else if (value === 'object') {
            const newNestedRow = { field: '', value: '', id: uuidv4() }
            accumulator[currentKey] = [newNestedRow]
          } else {
            console.log('Should never go here')
          }
        } else {
          return accumulator[currentKey]
        }
      } else {
        console.log('error should not enter this block.')
      }
    }, newFormState)
    setFormState(newFormState)
  }

  // FORM SUBMIT HANDLER FOR UPDATING EXISTING RECORD
  // CALL API PUT /admin/users/:userId
  const handleSubmitUpdate = async event => {
    event.preventDefault()
    const newObj = transformArrayToObj(formState)
    setValidationErrors(null)
    try {
      const validateUser = await userSchemaAdmin.validate(newObj, {
        abortEarly: false,
        stripUnknown: false,
      })
    } catch (error) {
      const [
        {
          type,
          message,
          params: { unknown },
        },
      ] = error.inner

      if (type === 'noUnknown') {
        const errorMessage =
          'The following fields are not permitted: ' + unknown
        setValidationErrors([errorMessage])
        return
      }

      const newValidationErrors = error.inner.map(err => {
        return err.message
      })

      setValidationErrors(newValidationErrors)
      return
    }
    try {
      const updatedUser = await dispatch(adminUpdateUser(newObj))
      setEditViewOpen(false)
      toast.success('User updated Successfully')
    } catch (error) {
      console.log('error update user', error)
      toast.error('Error occured updating the user')
    }
  }

  // FORM SUBMIT HANDLER FOR ADDING NEW RECORD
  // CALL API POST /admin/users
  const handleSubmitAdd = async event => {
    event.preventDefault()
    const newObj = transformArrayToObj(formState)
    setValidationErrors(null)
    try {
      const validateUser = await userSchemaAdmin.validate(newObj, {
        abortEarly: false,
        stripUnknown: false,
      })
    } catch (error) {
      const [
        {
          type,
          message,
          params: { unknown },
        },
      ] = error.inner

      if (type === 'noUnknown') {
        const errorMessage =
          'The following fields are not permitted: ' + unknown
        setValidationErrors([errorMessage])
        return
      }
      const newValidationErrors = error.inner.map(err => {
        return err.message
      })
      setValidationErrors(newValidationErrors)
      return
    }
  }

  // HANDLE DELETE USER - CALL API DELETE /admin/users/:userId
  const handleDeleteUser = async () => {
    const { id } = user

    if (!id) {
      toast.error('Something went wrong, try later')
      return
    }
    try {
      await dispatch(adminDeleteUser(id))
      toast.success('User Deleted Successfully')
    } catch (error) {
      console.error('Error deleting user', error)
      toast.error('Error: Cannot delete user')
    }
  }

  return (
    <div
      className="bg-white pb-4 pr-2 pt-8 m-2 relative w-[100%]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* DISPLAY VALIDATION ERRORS PROVIDED BY YUP SCHEMA VALIDATION */}
      {validationErrors && (
        <ul className="bg-red-50 relative -top-10 px-16 py-2">
          {validationErrors.map(error => {
            return (
              <li key={error} className="text-red-700 text-xs font-bol">
                {error}
              </li>
            )
          })}
          <span
            className="absolute w-6 h-6 rounded-full bg-red-600 left-[calc(98%-theme('spacing.28'))] top-[50%] translate-y-[-50%] cursor-pointer z-20"
            onClick={() => setValidationErrors(null)}
          >
            <IoIosClose className="text-white text-2xl cursor-pointer" />
          </span>
        </ul>
      )}
      {/* TOP BUTTON BAR (EXPAND, EDIT, DELETE) */}
      <HoverButtonBar
        isHovered={isHovered}
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        handleToggleEditView={handleToggleEditView}
        isNew={isNew}
        handleDeleteUser={handleDeleteUser}
      />
      {/* RUN CONDITIONAL FORM EVENT HANDLER AND API CALL BASED ON ISNEW BOOLEAN */}
      <form
        className="pt-6 md:pt-4"
        onSubmit={event =>
          isNew ? handleSubmitAdd(event) : handleSubmitUpdate(event)
        }
      >
        {/* LOOP THROUGH FORM STATE ARRAY TO RENDER EACH 'ROW' */}
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
                handleAddFieldWithinRow={handleAddFieldWithinRow}
                handleFieldTypeChange={handleFieldTypeChange}
                userId={user.id}
              />
            )
          })}
        {editViewOpen && (
          <EditActiveButtonsGroup
            handleRevertChanges={handleRevertChanges}
            handleToggleEditView={handleToggleEditView}
            isNew={isNew}
          />
        )}
      </form>
    </div>
  )
}

export default IndividualUserResultContainer
