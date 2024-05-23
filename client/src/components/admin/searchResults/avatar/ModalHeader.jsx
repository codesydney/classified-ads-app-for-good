import { IoIosClose } from 'react-icons/io'

const ModalHeader = ({ handleClose, children }) => {
  return (
    <div className="flex justify-between items-center p-8 pb-4 border-b-[1px]">
      <h2 className="font-bold text-lg md:text-2xl">{children}</h2>
      <button
        onClick={handleClose}
        className="w-fit h-fit rounded-full border-[1px] transition duration-200 hover:bg-gray-200 hover:text-red-500"
      >
        <IoIosClose className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  )
}

export default ModalHeader
