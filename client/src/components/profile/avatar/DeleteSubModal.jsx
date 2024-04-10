import { IoIosClose } from 'react-icons/io'
import ModalButton from './ModalButton'

const DeleteSubModal = ({ setDeleteSubModalOpen }) => {
  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 z-10 bg-black/70 rounded"
        onClick={() => setDeleteSubModalOpen(false)}
      ></div>
      <div
        className="max-w-[350px] w-full shadow-md absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] height-[30px] bg-white rounded z-20"
        onClick={event => event.stopPropagation()}
      >
        <button
          onClick={() => setDeleteSubModalOpen(false)}
          className="absolute top-2 right-2"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
        <h2 className="p-6 border-b-[1px] text-lg font-bold">
          Delete profile photo
        </h2>
        <p className="px-6 py-4 border-b-[1px]">
          Are you sure? Having a profile picture helps others recognize you.
        </p>
        <div className="p-6 flex justify-end gap-4">
          <ModalButton
            onClick={() => setDeleteSubModalOpen(false)}
            variant="normal"
          >
            Cancel
          </ModalButton>
          <ModalButton
            variant="hollow"
            onClick={() => alert('Maybe I will delete the image?')}
          >
            Delete
          </ModalButton>
        </div>
      </div>
    </>
  )
}

export default DeleteSubModal
