import defaultUserLogo from '../../assets/serviceImgPlaceholder.svg'

const UserImg = ({ fullName, alumniProfilePicture }) => {
  return (
    <div>
      <img
        src={alumniProfilePicture || defaultUserLogo}
        alt={`${fullName} profile picture`}
        className="w-full aspect-ratio-4/3 object-contain rounded-t-md"
      />
    </div>
  )
}

export default UserImg
