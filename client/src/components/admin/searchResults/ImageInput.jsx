import { useState } from 'react'
import EditAvatarModal from '../../profile/avatar/EditAvatarModal'

const ImageInput = ({ value, field, handleFieldEdit }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <>
        <button
          className="border-gray-500 bg-white rounded border-[1px] text-xs px-2 py-[2px] hover:ring-gray-300 hover:ring-4"
          onClick={() => setModalOpen(true)}
          type="button"
        >
          Upload New
        </button>
        {modalOpen && (
          <EditAvatarModal handleModalClose={() => setModalOpen(false)} />
        )}
      </>
    </>
  )
}

export default ImageInput
