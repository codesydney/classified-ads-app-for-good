import ModalButtonWithIcon from './ModalButtonWithIcon'
import ModalButton from './ModalButton'
import ModalHeader from './ModalHeader'
import { MdOutlineEdit } from 'react-icons/md'
import { IoCamera } from 'react-icons/io5'
import { FaTrashAlt } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
import profileImg from '../../../assets/placeholder.jpg'

const MainModalBody = ({
  setDeleteSubModalOpen,
  setModalOpen,
  setCurrentTab,
  currentUser,
}) => {
  return (
    <>
      <ModalHeader handleClose={() => setModalOpen(false)}>
        Profile photo
      </ModalHeader>
      <div className="px-8 pb-4 flex justify-center items-center min-h-[150px]">
        {currentUser?.alumniProfilePhoto ? (
          <img
            src={currentUser.alumniProfilePhoto}
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
      <div className="flex items-center gap-10 px-8 py-4 border-t-[1px]">
        {currentUser?.alumniProfilePhoto && (
          <ModalButtonWithIcon onClick={() => setCurrentTab('edit')}>
            <MdOutlineEdit className="w-[25px] h-[25px] mb-2" />
            <span className="font-bold">Edit</span>
          </ModalButtonWithIcon>
        )}
        <ModalButtonWithIcon onClick={() => setCurrentTab('add')}>
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
    </>
  )
}

export default MainModalBody
