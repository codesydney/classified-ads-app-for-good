const UserImg = ({ fullName, alumniProfilePicture }) => {
  return (
    <div className="w-full pb-[100%] relative rounded-t-md overflow-hidden bg-gray-100">
      <img
        src={
          alumniProfilePicture ||
          'https://ustaa.s3.ap-southeast-2.amazonaws.com/images/USTAA-Profile.png'
        }
        alt={`${fullName} profile picture`}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-t-md"
      />
    </div>
  )
}

export default UserImg
