import { useEffect, useRef, useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'
import { CiSquarePlus } from 'react-icons/ci'
import UserRowInput from './UserRowInput'

const UserRow = ({ field, value, isExpanded, editViewOpen }) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const [textareaMaxWidth, setTextareaMaxWidth] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const textareaParentRef = useRef(null)

  useEffect(() => {
    setIsRowExpanded(isExpanded)
  }, [isExpanded])

  useEffect(() => {
    if (textareaParentRef.current) {
      const parentWidth = textareaParentRef.current.offsetWidth
      setTextareaMaxWidth(parentWidth)
    }
  }, [editViewOpen])

  const valueType = typeof value
  return (
    <div className="px-2">
      <div
        className="relative flex gap-1 items-start py-[2px] hover:bg-gray-200/50 pl-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsRowExpanded(!isRowExpanded)}
          className={`${valueType !== 'object' && 'opacity-0 cursor-default'} px-1 relative z-10`}
          disabled={valueType !== 'object'}
        >
          {isRowExpanded ? <FaCaretDown /> : <FaCaretRight />}
        </button>
        {isHovered && (
          <div className="absolute flex -left-2 gap-0">
            <button
              onClick={() => console.log('clicckity')}
              className="px-1 w-fit"
              // disabled={valueType !== 'object'}
            >
              <FaTrashAlt className="text-xs" />
            </button>
            <button
              onClick={() => console.log('clicckity')}
              className="px-1 w-fit"
              // disabled={valueType !== 'object'}
            >
              <CiSquarePlus />
            </button>
          </div>
        )}
        <div className="text-xs w-full flex gap-[2px]">
          {valueType === 'object' ? (
            <>
              <span className="font-bold">{field + ':'}</span>
              <span className="break-all">Object</span>
            </>
          ) : (
            <>
              <div className="font-bold whitespace-nowrap">{field} :</div>
              <div
                className="break-all flex-grow max-h-fit"
                ref={textareaParentRef}
              >
                {editViewOpen && field !== 'id' ? (
                  <UserRowInput
                    value={value}
                    textareaMaxWidth={textareaMaxWidth}
                    field={field}
                  />
                ) : (
                  value.toString()
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isRowExpanded &&
        valueType === 'object' &&
        Object.entries(value).map(([key, value]) => {
          return (
            <UserRow
              editViewOpen={editViewOpen}
              isExpanded={isExpanded}
              key={key}
              field={key}
              value={value}
            />
          )
        })}
    </div>
  )
}

export default UserRow
