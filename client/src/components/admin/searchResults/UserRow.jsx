import { useEffect, useRef, useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { CiSquarePlus } from 'react-icons/ci'
import UserRowInput from './UserRowInput'
import AddRowPopup from './AddRowPopup'

const UserRow = ({
  isExpanded,
  editViewOpen,
  fieldNameIdentifier,
  fieldNameState,
  fieldValueIdentifier,
  fieldValueState,
  handleRowDeletion,
  handleFieldEdit,
  handleAddFieldAfterRow,
  currentRow,
}) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const [textareaMaxWidth, setTextareaMaxWidth] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const textareaParentRef = useRef(null)
  const [addPopupOpen, setAddPopupOpen] = useState(false)

  useEffect(() => {
    setIsRowExpanded(isExpanded)
  }, [isExpanded])

  useEffect(() => {
    if (textareaParentRef.current) {
      const parentWidth = textareaParentRef.current.offsetWidth
      setTextareaMaxWidth(parentWidth)
    }
  }, [editViewOpen])

  const valueType = typeof fieldValueState
  return (
    <div className="px-2">
      <div
        className="relative flex gap-1 items-start hover:bg-gray-200/50 pl-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsRowExpanded(!isRowExpanded)}
          type="button"
          className={`${valueType !== 'object' && 'opacity-0 cursor-default'} px-1 relative z-10`}
          disabled={valueType !== 'object'}
        >
          {isRowExpanded ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        {isHovered && editViewOpen && (
          <div className="absolute flex -left-2 gap-0">
            <button
              onClick={() => handleRowDeletion(currentRow)}
              className="px-1 w-fit"
              type="button"
            >
              <FaTrashAlt className="text-xs" />
            </button>
            <button
              onClick={() => setAddPopupOpen(true)}
              className="px-1 w-fit"
              type="button"
            >
              <CiSquarePlus />
            </button>
          </div>
        )}
        {addPopupOpen && (
          <AddRowPopup
            field={fieldNameState}
            value={fieldValueState}
            currentRow={currentRow}
            setAddPopupOpen={setAddPopupOpen}
            handleAddFieldAfterRow={handleAddFieldAfterRow}
          />
        )}
        <div className="text-xs w-full flex gap-[2px]">
          {valueType === 'object' ? (
            <>
              <div className="font-bold">
                {editViewOpen && fieldNameState !== 'id' ? (
                  <UserRowInput
                    value={fieldNameState}
                    textareaMaxWidth={textareaMaxWidth}
                    field={fieldNameIdentifier}
                    handleFieldEdit={handleFieldEdit}
                  />
                ) : (
                  fieldNameState.toString()
                )}{' '}
                :
              </div>
              <div className="break-all">Object</div>
            </>
          ) : (
            <>
              <div className="font-bold whitespace-nowrap">
                {editViewOpen && fieldNameState !== 'id' ? (
                  <UserRowInput
                    value={fieldNameState}
                    textareaMaxWidth={textareaMaxWidth}
                    field={fieldNameIdentifier}
                    handleFieldEdit={handleFieldEdit}
                  />
                ) : (
                  fieldNameState.toString()
                )}{' '}
                :
              </div>
              <div
                className="break-all flex-grow max-h-fit"
                ref={textareaParentRef}
              >
                {editViewOpen && fieldNameState !== 'id' ? (
                  <UserRowInput
                    value={fieldValueState}
                    textareaMaxWidth={textareaMaxWidth}
                    field={fieldValueIdentifier}
                    handleFieldEdit={handleFieldEdit}
                    isImage={fieldNameState === 'alumniProfilePicture'}
                  />
                ) : (
                  fieldValueState.toString()
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isRowExpanded &&
        valueType === 'object' &&
        fieldValueState.map((obj, index) => {
          return (
            <UserRow
              key={obj.id}
              editViewOpen={editViewOpen}
              isExpanded={isExpanded}
              fieldNameIdentifier={`${fieldValueIdentifier}.${index}.field`}
              fieldNameState={obj.field}
              fieldValueIdentifier={`${fieldValueIdentifier}.${index}.value`}
              fieldValueState={obj.value}
              currentRow={`${fieldValueIdentifier}.${index}`}
              handleRowDeletion={handleRowDeletion}
              handleFieldEdit={handleFieldEdit}
              handleAddFieldAfterRow={handleAddFieldAfterRow}
            />
          )
        })}
    </div>
  )
}

export default UserRow
