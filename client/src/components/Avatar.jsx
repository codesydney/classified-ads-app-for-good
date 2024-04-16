import PlaceHolder from '../assets/placeholder.jpg'

const Avatar = ({ src }) => {
  return (
    <img
      className="rounded-full object-fit w-[30px] h-[30px]"
      alt="Avatar"
      src={src || PlaceHolder}
    />
  )
}

export default Avatar
