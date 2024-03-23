import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store.js'
import { getUserProfile } from '../features/users/usersAction.js'

const UserProfile = () => {
  const params = useParams()
  const userId = params.userId
  const dispatch = useAppDispatch()

  const { userProfile } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUserProfile({ userId }))
  }, [userId])

  return (
    <div className="mt-[30px]">
      User Profile Page: {userId}
      <pre>{JSON.stringify(userProfile, null, 4)}</pre>
    </div>
  )
}

export default UserProfile
