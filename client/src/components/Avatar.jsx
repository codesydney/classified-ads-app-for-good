import PlaceHolder from '../assets/placeholder.jpg'

const Avatar = ({ src }) => {
  return (
    <img
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || PlaceHolder}
    />
  )
}

export default Avatar
