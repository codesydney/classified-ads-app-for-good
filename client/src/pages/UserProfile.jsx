import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../store.js'
import { getUserProfile } from '../features/users/usersAction.js'
import UserDetails from './../components/search/UserDetails'

const UserProfile = () => {
  const params = useParams()
  const userId = params.userId
  const dispatch = useAppDispatch()

  const { userProfile } = useSelector(state => state.users)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await dispatch(getUserProfile({ userId }))

      if (response.error) {
        toast.error('User Not Found')
      }
    }

    fetchUserProfile()
  }, [userId])

  return <UserDetails userProfile={userProfile} />
}

export default UserProfile
