import { IoIosClose } from 'react-icons/io'

const EditAvatarModal = ({ setModalOpen }) => {
  return (
    <div
      onClick={() => setModalOpen(false)}
      className="fixed w-screen h-screen top-0 left-0 bg-gray-800/20 z-10 flex items-center justify-center"
    >
      <div
        onClick={event => event.stopPropagation()}
        className="w-[100%] max-w-[600px] p-4 bg-white rounded relative"
      >
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-2 right-2"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default EditAvatarModal
