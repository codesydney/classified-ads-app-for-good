const UserImg = ({ fullName, alumniProfilePicture }) => {
  return (
    <div>
      <img
        src={
          alumniProfilePicture ||
          'https://ustaa.s3.ap-southeast-2.amazonaws.com/images/USTAA-Profile.png'
        }
        alt={`${fullName} profile picture`}
        className="w-full aspect-ratio-4/3 object-contain rounded-t-md"
      />
    </div>
  )
}

export default UserImg
