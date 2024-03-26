import { useState } from 'react'

const DeleteAccount = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="mt-[100px]">
      <h3 className="text-bold text-xl mb-2 text-red-500">Delete Account</h3>
      <p className="text-base">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button className="btn btn-squre w-fit py-2 bg-white hover:bg-red-500 hover:text-white text-red-500 border-red-500 mt-[15px]">
        Delete Account
      </button>
    </div>
  )
}

export default DeleteAccount
