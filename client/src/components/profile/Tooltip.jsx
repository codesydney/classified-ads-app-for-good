import { IoInformationCircleOutline } from 'react-icons/io5'
import { IoIosClose } from 'react-icons/io'
import { useState, useEffect } from 'react'

const Tooltip = ({ children, tooltipRef }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center relative" ref={tooltipRef}>
      <button
        type="button"
        className=""
        onClick={e => {
          // e.preventDefault()
          setIsOpen(!isOpen)
        }}
      >
        <IoInformationCircleOutline className="w-[16px] h-[16px] hover:text-primary" />
      </button>
      {isOpen && (
        <div className="absolute bottom-[150%] right-0 w-[200px] p-4 bg-slate-100 rounded">
          <button
            type="button"
            className="absolute top-1 right-1"
            onClick={e => {
              e.preventDefault()
              setIsOpen(false)
            }}
          >
            <IoIosClose className="w-[16px] h-[16px]" />
          </button>
          <div className="text-sm">{children}</div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
