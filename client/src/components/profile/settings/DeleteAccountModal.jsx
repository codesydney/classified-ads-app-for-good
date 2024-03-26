import { IoMdClose } from 'react-icons/io'

const DeleteAccountModal = ({ setModalOpen }) => {
  return (
    <div className="fixed w-screen h-screen bg-black/40 top-0 left-0 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] mx-auto bg-white p-10 rounded relative">
        <button
          className="absolute top-5 right-5"
          onClick={() => setModalOpen(false)}
        >
          <IoMdClose className="w-[20px] h-[20px]" />
        </button>
        <h2 className="font-extrabold text-3xl mb-4">Are you sure?</h2>
        <p className="">
          All your information will be deleted if you proceed with this action.
          You will not be able to retrieve your information or account once it
          is deleted.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="btn btn-squre w-fit py-2 bg-white hover:bg-red-500 hover:text-white text-red-500 border-red-500 mt-[15px]">
            Delete
          </button>
          <button
            className="btn btn-squre w-fit py-2 bg-primary hover:bg-primary text-white mt-[15px]"
            onClick={() => setModalOpen(false)}
          >
            Just kidding
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
