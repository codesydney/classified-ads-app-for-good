import { useState } from 'react'
import EditAvatarModal from './avatar/EditAvatarModal'

const ImageInput = ({ value, field, handleFieldEdit, userId }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => {
    document.body.style.overflow = 'hidden'
    setModalOpen(true)
  }

  const handleModalClose = () => {
    document.body.style.overflow = 'auto'
    setModalOpen(false)
  }

  return (
    <>
      <>
        <button
          className="border-gray-500 bg-white rounded border-[1px] text-xs px-2 py-[2px] hover:ring-gray-300 hover:ring-4"
          onClick={handleModalOpen}
          type="button"
        >
          Upload New
        </button>
        {modalOpen && (
          <EditAvatarModal
            userId={userId}
            imgUrl={value}
            handleModalClose={handleModalClose}
          />
        )}
      </>
    </>
  )
}

export default ImageInput
