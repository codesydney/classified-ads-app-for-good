import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const params = useParams()
  const userId = params.userId

  return <div className="mt-[30px]">User Profile Page: {userId}</div>
}

export default UserProfile
