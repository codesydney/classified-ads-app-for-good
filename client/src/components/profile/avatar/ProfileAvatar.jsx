import profileImg from '../../../assets/placeholder.jpg'
import EditAvatarModal from './EditAvatarModal'
import { MdOutlineEdit } from 'react-icons/md'
import { useState } from 'react'

const ProfileAvatar = ({ currentUser }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex items-center gap-[10px] mb-6 md:mb-16 md:flex-col relative">
      <img
        src={
          currentUser?.alumniProfilePicture
            ? currentUser.alumniProfilePicture
            : profileImg
        }
        alt="Avatarimg"
        className="rounded-full w-[50px] h-[50px] md:w-[80px] md:h-[80px] object-cover"
      />
      <button
        className="w-8 h-8 rounded-full items-center justify-center flex absolute left-[25px] -translate-x-1/2 -translate-y-1/2 top-[50px] md:left-auto md:translate-x-0 md:top-[80px] bg-gray-800 hover:bg-gray-600 transition duration-300"
        aria-label="edit profile picture"
        onClick={() => setModalOpen(true)}
      >
        <MdOutlineEdit className="w-6 h-6 text-white" />
      </button>
      <p className="md:mt-6">Hello, {currentUser?.fullName}</p>
      {modalOpen && <EditAvatarModal setModalOpen={setModalOpen} />}
    </div>
  )
}

export default ProfileAvatar
