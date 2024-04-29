import { useEffect, useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'

const UserRow = ({ field, value, isExpanded }) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)

  useEffect(() => {
    setIsRowExpanded(isExpanded)
  }, [isExpanded])

  const valueType = typeof value
  return (
    <div className="flex gap-1 items-start">
      <button
        onClick={() => setIsRowExpanded(!isRowExpanded)}
        className={`${valueType !== 'object' && 'opacity-0 cursor-default'} px-1`}
        disabled={valueType !== 'object'}
      >
        <FaCaretRight />
      </button>
      <div className="text-xs">
        <span className="font-bold">{field}</span>
        <span className="">{' ' + ':' + ' '}</span>
        <span className="break-all">
          {valueType === 'object' ? 'Object' : value.toString()}
        </span>
        {isRowExpanded &&
          valueType === 'object' &&
          Object.entries(value).map(([key, value]) => {
            return (
              <UserRow
                isExpanded={isExpanded}
                key={key}
                field={key}
                value={value}
              />
            )
          })}
      </div>
    </div>
  )
}

export default UserRow
