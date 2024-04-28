import { useState } from 'react'
import { FaCaretRight, FaCaretDown, FaTrashAlt } from 'react-icons/fa'

const UserRow = ({ field, value }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const valueType = typeof value
  return (
    <div className="flex gap-1 items-start">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${valueType !== 'object' && 'opacity-0 cursor-default'} p-1`}
        disabled={valueType !== 'object'}
      >
        <FaCaretRight />
      </button>
      <div className="text-sm">
        <span className="font-bold">{field}</span>
        <span className="">{' ' + ':' + ' '}</span>
        <span className="break-all">
          {valueType === 'object' ? 'Object' : value}
        </span>
        {isExpanded &&
          valueType === 'object' &&
          Object.entries(value).map(([key, value]) => {
            return <UserRow key={key} field={key} value={value} />
          })}
      </div>
    </div>
  )
}

export default UserRow
