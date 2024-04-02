import profileImg from '../../assets/placeholder.jpg'
import { CiEdit } from 'react-icons/ci'

const ProfileAvatar = ({ currentUser }) => {
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
        className="w-8 h-8 rounded-full items-center justify-center flex absolute  -translate-y-1/2 top-[50px] md:top-[80px] bg-primary/30"
        aria-label="edit profile picture"
      >
        <CiEdit className="w-6 h-6 text-accent" />
      </button>
      <p className="md:mt-6">Hello, {currentUser?.fullName}</p>
    </div>
  )
}

export default ProfileAvatar
