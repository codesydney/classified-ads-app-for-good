import { useState } from 'react'
import DeleteAccountModal from './DeleteAccountModal'
const DeleteAccount = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="mt-[100px]">
      <h3 className="text-bold text-xl mb-2 text-red-500">Delete Account</h3>
      <p className="text-base">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        className=" w-full sm:w-fit p-2 bg-transparent hover:bg-red-500 text-red-500 hover:text-white border-2 rounded-md border-red-500 hover:font-semibold duration-300 ease-in-out mt-[15px]"
        onClick={() => setModalOpen(true)}
      >
        Delete Account
      </button>
      {modalOpen && <DeleteAccountModal setModalOpen={setModalOpen} />}
    </div>
  )
}

export default DeleteAccount
