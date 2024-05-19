import { useEffect } from 'react'
import IndividualUserResultContainer from './IndividualUserResultContainer'

const defaultUserDoc = {
  firstName: '',
  lastName: '',
  email: '',
  isOfficer: false,
  hideProfile: false,
  isProfileComplete: false,
  isAdmin: false,
}

const AddDocumentModal = ({ setNewDocumentModalOpen }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => (document.body.style.overflow = '')
  })
  return (
    <div className="bg-black/20 fixed w-screen h-screen top-0 left-0 p-4 py-8 flex justify-center items-center z-99999999999999">
      <div className="p-4 bg-white rounded w-[100%] max-w-[700px]">
        <div className="flex justify-between">
          <h3 className="">Add New Document</h3>
          <button
            className="rounded border-[1px] text-xs px-2 py-1 hover:ring-4  hover:ring-gray-300 border-gray-500 bg-white"
            onClick={() => setNewDocumentModalOpen(false)}
          >
            Exit
          </button>
        </div>

        <IndividualUserResultContainer
          user={defaultUserDoc}
          editDefault={true}
          isNew={true}
        />
      </div>
    </div>
  )
}

export default AddDocumentModal
