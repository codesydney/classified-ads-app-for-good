import { useEffect, useRef, useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { CiSquarePlus } from 'react-icons/ci'
import AddRowPopup from './AddRowPopup'
import TextInput from './TextInput'
import TextareaInput from './TextareaInput'
import ImageInput from './ImageInput'
import SelectInput from './SelectInput'
import NumberInput from './NumberInput'

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
  handleAddFieldWithinRow,
  handleFieldTypeChange,
  currentRow,
  userId,
}) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const [textareaMaxWidth, setTextareaMaxWidth] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const textareaParentRef = useRef(null)
  const [addPopupOpen, setAddPopupOpen] = useState(false)
  const valueType = typeof fieldValueState

  useEffect(() => {
    setIsRowExpanded(isExpanded)
  }, [isExpanded])

  useEffect(() => {
    function handleResize() {
      if (textareaParentRef.current && valueType === 'string') {
        const parentWidth = textareaParentRef.current.offsetWidth
        setTextareaMaxWidth(parentWidth)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [editViewOpen, isRowExpanded, textareaParentRef.current])

  return (
    <div className="pl-2">
      <div
        className="relative flex gap-1 items-start w-[100%] hover:bg-gray-200/50 pl-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* EXPAND BUTTON ONLY VISIBLE WHEN FIELDVALUESTATE IS AN OBJECT */}
        <button
          onClick={() => setIsRowExpanded(!isRowExpanded)}
          type="button"
          className={`${valueType !== 'object' && 'opacity-0 cursor-default'} px-1 relative `}
          disabled={valueType !== 'object'}
        >
          {isRowExpanded ? <FaCaretDown /> : <FaCaretRight />}
        </button>

        {/* DELETE AND ADD BUTTONS ON ROW HOVER */}
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

        {/* POPUP TO ADD A NEW ROW - VISIBLE AFTER CLICKING '+' ICON */}
        {addPopupOpen && (
          <AddRowPopup
            field={fieldNameState}
            value={fieldValueState}
            currentRow={currentRow}
            setAddPopupOpen={setAddPopupOpen}
            handleAddFieldAfterRow={handleAddFieldAfterRow}
            handleAddFieldWithinRow={handleAddFieldWithinRow}
          />
        )}
        <div className="text-xs w-full h-fit flex gap-2">
          {/* KEY VALUE PAIR RENDERING NO EDIT MODE */}
          {!editViewOpen && (
            <>
              <div className="font-bold h-fit flex max-h-fit gap-2">
                {fieldNameState.toString()}
              </div>
              :
              <div className="break-all flex-grow max-h-fit">
                {valueType === 'object' ? 'Object' : fieldValueState.toString()}
              </div>
            </>
          )}

          {/* KEY VALUE PAIR RENDERING EDIT MODE */}
          {editViewOpen && (
            <>
              <div className="font-bold h-fit flex max-h-fit gap-2">
                {fieldNameState === 'id' ? (
                  fieldNameState.toString()
                ) : (
                  <TextInput
                    value={fieldNameState}
                    textareaMaxWidth={textareaMaxWidth}
                    field={fieldNameIdentifier}
                    handleFieldEdit={handleFieldEdit}
                  />
                )}
              </div>
              :
              <div
                className="break-all flex-grow max-h-fit"
                ref={textareaParentRef}
              >
                {valueType === 'object' && 'Object'}
                {/* NUMBER INPUT FOR NUMBER VALUES */}
                {valueType === 'number' && (
                  <NumberInput
                    value={fieldValueState}
                    field={fieldValueIdentifier}
                    handleFieldEdit={handleFieldEdit}
                  />
                )}
                {/* SELECT INPUT FOR BOOLEAN VALUES */}
                {valueType === 'boolean' && (
                  <SelectInput
                    value={fieldValueState}
                    field={fieldValueIdentifier}
                    handleFieldEdit={handleFieldEdit}
                  />
                )}
                {/* IMAGE UPLOAD INPUT FOR ALUMNIPROFILEPICTURE */}
                {fieldNameState === 'alumniProfilePicture' && (
                  <ImageInput
                    value={fieldValueState}
                    field={fieldValueIdentifier}
                    handleFieldEdit={handleFieldEdit}
                    userId={userId}
                  />
                )}

                {valueType === 'string' &&
                  fieldNameState !== 'alumniProfilePicture' && (
                    <TextareaInput
                      value={fieldValueState}
                      textareaMaxWidth={textareaMaxWidth}
                      field={fieldValueIdentifier}
                      handleFieldEdit={handleFieldEdit}
                      isID={fieldNameState === 'id'}
                    />
                  )}
              </div>
              {fieldNameState !== 'id' &&
                fieldNameState !== 'alumniProfilePicture' && (
                  <div className="">
                    <select
                      name={fieldValueIdentifier}
                      className="select select-bordered rounded border-none bg-transparent focus:border-none focus:outline-none focus:ring-[2px] focus:ring-primary w-fit min-h-fit h-fit text-xs pl-0 pr-4
                  bg-[position:calc(100%_-_4px)_calc(1px_+_50%),calc(100%_-_0.1px)_calc(1px_+_50%)]"
                      value={valueType}
                      onChange={event => {
                        if (event.target.value === 'object') {
                          setIsRowExpanded(true)
                        }
                        handleFieldTypeChange(event)
                      }}
                    >
                      <option value="boolean">Boolean</option>
                      <option value="object">Object</option>
                      <option value="string">String</option>
                      <option value="number">Number</option>
                    </select>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
      {/* RECURSIVELY RENDER NESTED ROWS WHEN FIELDVALUESTATE IS AN OBJECT */}
      {/* AND ISROWEXPANDED BOOLEAN IS TRUE */}
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
              handleAddFieldWithinRow={handleAddFieldWithinRow}
              handleFieldTypeChange={handleFieldTypeChange}
            />
          )
        })}
    </div>
  )
}

export default UserRow
