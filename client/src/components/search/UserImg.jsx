import defaultUserLogo from '../../assets/serviceImgPlaceholder.svg'

const UserImg = ({ fullName, alumniProfilePicture }) => {
  return (
    <div style={{ aspectRatio: 4 / 3 }}>
      <img
        src={alumniProfilePicture || defaultUserLogo}
        alt={`${fullName} profile picture`}
        className="w-full aspect-ratio-4/3 overflow-hidden"
        style={{ objectFit: 'contain', aspectRatio: '4/3' }}
      />
    </div>
  )
}

export default UserImg
