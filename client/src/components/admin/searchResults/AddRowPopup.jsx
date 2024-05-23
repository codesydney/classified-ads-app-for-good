import { FaCirclePlus } from 'react-icons/fa6'
import { BsListNested } from 'react-icons/bs'
import AddRowPopupButton from './AddRowPopupButton'
import { useEffect, useRef } from 'react'

const AddRowPopup = ({
  field,
  value,
  setAddPopupOpen,
  currentRow,
  handleAddFieldAfterRow,
  handleAddFieldWithinRow,
}) => {
  const popupContainerRef = useRef(null)

  const handleOutsideClick = event => {
    if (
      popupContainerRef.current &&
      !popupContainerRef.current.contains(event.target)
    ) {
      setAddPopupOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  })

  return (
    <div
      className="absolute top-[100%] w-fit bg-slate-800 py-4 z-10 rounded flex flex-col stretch"
      ref={popupContainerRef}
    >
      {typeof value === 'object' ? (
        <>
          <AddRowPopupButton
            handleClick={() => {
              handleAddFieldWithinRow(`${currentRow}.value`)
              setAddPopupOpen(false)
            }}
          >
            <BsListNested className="text-sm text-slate-200" />
            <span>
              Add field within{' '}
              <span className="text-white font-bold">{field}</span>
            </span>
          </AddRowPopupButton>
          <AddRowPopupButton
            handleClick={() => {
              handleAddFieldAfterRow(currentRow)
              setAddPopupOpen(false)
            }}
          >
            <FaCirclePlus className="text-sm text-slate-200" />
            <span>
              Add field after{' '}
              <span className="text-white font-bold">{field}</span>
            </span>
          </AddRowPopupButton>
        </>
      ) : (
        <AddRowPopupButton
          handleClick={() => {
            handleAddFieldAfterRow(currentRow)
            setAddPopupOpen(false)
          }}
        >
          <FaCirclePlus className="text-sm text-slate-200" />
          <span>
            Add field after{' '}
            <span className="text-white font-bold">{field}</span>
          </span>
        </AddRowPopupButton>
      )}
    </div>
  )
}

export default AddRowPopup
