import { useEffect, useRef, useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { CiSquarePlus } from 'react-icons/ci'
import UserRowInput from './UserRowInput'

const NewUserRow = ({
  // field,
  // value,
  isExpanded,
  editViewOpen,
  // register,
  parentField,
  // handleRowDeletion,
}) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const [textareaMaxWidth, setTextareaMaxWidth] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const textareaParentRef = useRef(null)
  const nestedFieldValueStructure = parentField
    ? parentField + '.' + field
    : field

  useEffect(() => {
    setIsRowExpanded(isExpanded)
  }, [isExpanded])

  useEffect(() => {
    if (textareaParentRef.current) {
      const parentWidth = textareaParentRef.current.offsetWidth
      setTextareaMaxWidth(parentWidth)
    }
  }, [editViewOpen])

  // const valueType = typeof value
  return (
    <div className="px-2">
      <div
        className="relative flex gap-1 items-start py-[2px] hover:bg-gray-200/50 pl-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          // onClick={() => setIsRowExpanded(!isRowExpanded)}
          type="button"
          className={`${valueType !== 'object' && 'opacity-0 cursor-default'} px-1 relative z-10`}
          // disabled={valueType !== 'object'}
        >
          {isRowExpanded ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        {isHovered && editViewOpen && (
          <div className="absolute flex -left-2 gap-0">
            {/* This is the button i am talking about. */}
            <button
              // onClick={() => handleRowDeletion(nestedFieldValueStructure)}
              className="px-1 w-fit"
              type="button"
            >
              <FaTrashAlt className="text-xs" />
            </button>
            <button
              onClick={() => console.log('clicckity')}
              className="px-1 w-fit"
              type="button"
            >
              <CiSquarePlus />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewUserRow
