import { IoIosClose } from 'react-icons/io'
import ModalButtonWithIcon from './ModalButtonWithIcon'
import DeleteSubModal from './DeleteSubModal'
import { useRef, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { IoCamera } from 'react-icons/io5'
import { FaTrashAlt } from 'react-icons/fa'

const EditAvatarModal = ({ setModalOpen, profileImg }) => {
  const [imgSrc, setImgSrc] = useState(null)
  const [deleteSubModalOpen, setDeleteSubModalOpen] = useState(false)

  const onSelectFile = event => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const imageURL = reader.result?.toString() || ''
      console.log(imageURL)
      setImgSrc(imageURL)
    })

    reader.readAsDataURL(file)
  }

  return (
    <div
      onClick={() => setModalOpen(false)}
      className="fixed w-screen h-screen top-0 left-0 bg-gray-800/20 z-10 flex items-center justify-center"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="w-[100%] max-w-[600px] bg-white rounded relative mx-2"
      >
        {deleteSubModalOpen && (
          <DeleteSubModal setDeleteSubModalOpen={setDeleteSubModalOpen} />
        )}

        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-2 right-2"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
        <div className="p-8 flex justify-center">
          <img src={imgSrc || profileImg} width="350" height="350" />
        </div>
        <div className="flex items-center gap-10 px-8 py-4 border-t-[1px]">
          <ModalButtonWithIcon>
            <MdOutlineEdit className="w-[25px] h-[25px] mb-2" />
            <span className="font-bold">Edit</span>
          </ModalButtonWithIcon>
          <ModalButtonWithIcon>
            <IoCamera className="w-[25px] h-[25px] mb-2" />
            <span className="font-bold">Add Photo</span>
          </ModalButtonWithIcon>
          <div className="ml-auto">
            <ModalButtonWithIcon onClick={() => setDeleteSubModalOpen(true)}>
              <FaTrashAlt className="w-[25px] h-[25px] mb-2" />
              <span className="font-bold ">Delete</span>
            </ModalButtonWithIcon>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditAvatarModal
