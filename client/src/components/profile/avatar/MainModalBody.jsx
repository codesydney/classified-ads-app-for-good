import ModalButtonWithIcon from './ModalButtonWithIcon'
import ModalButton from './ModalButton'
import ModalHeader from './ModalHeader'
import { MdOutlineEdit } from 'react-icons/md'
import { IoCamera } from 'react-icons/io5'
import { FaTrashAlt } from 'react-icons/fa'

const MainModalBody = ({
  setDeleteSubModalOpen,
  handleModalClose,
  setCurrentTab,
  currentUser,
}) => {
  return (
    <>
      <ModalHeader handleClose={handleModalClose}>Profile photo</ModalHeader>

      <div className="px-8 pb-4 flex justify-center items-center min-h-[150px]">
        {currentUser?.alumniProfilePicture ? (
          <img
            src={currentUser.alumniProfilePicture}
            className="max-w-[100%] object-contain"
          />
        ) : (
          <div className="text-center flex flex-col items-center gap-4">
            You currently have no profile picture
            <ModalButton variant="hollow" onClick={() => setCurrentTab('add')}>
              {' '}
              Add Photo
            </ModalButton>
          </div>
        )}
      </div>
      <div className="flex justify-end items-center gap-10 px-8 py-4 border-t-[1px]">
        {/* Edit button -> opens the edit modal which will edit CURRENT profile photo */}
        {/* {currentUser?.alumniProfilePicture && (
          <ModalButtonWithIcon onClick={() => setCurrentTab('edit')}>
            <MdOutlineEdit className="w-[25px] h-[25px] mb-2" />
            <span className="font-bold">Edit</span>
          </ModalButtonWithIcon>
        )} */}
        <ModalButtonWithIcon onClick={() => setCurrentTab('add')}>
          <IoCamera className="w-[25px] h-[25px] mb-2" />
          <span className="font-bold">Add Photo</span>
        </ModalButtonWithIcon>

        {currentUser?.alumniProfilePicture && (
          <div className="ml-auto">
            <ModalButtonWithIcon onClick={() => setDeleteSubModalOpen(true)}>
              <FaTrashAlt className="w-[25px] h-[25px] mb-2" />
              <span className="font-bold">Delete</span>
            </ModalButtonWithIcon>
          </div>
        )}
      </div>
    </>
  )
}

export default MainModalBody
