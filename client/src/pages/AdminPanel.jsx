import { useSelector, useDispatch } from 'react-redux'
import { adminSearchUsers } from '../features/admin/adminAction.js'
import { useEffect, useState } from 'react'

const AdminPanel = () => {
  const dispatch = useDispatch()
  const { users, meta, loading } = useSelector(state => state.admin)
  const { currentUser } = useSelector(state => state.auth)
  console.log(users)
  const fetchUsers = async () => {
    await dispatch(adminSearchUsers())
  }

  useEffect(() => {
    console.log('use effect running')
    fetchUsers()
  }, [])

  return (
    <div>
      <div>Admin Panel Page</div>
      {users &&
        users.map((user, index) => {
          return <div key={index}>{user.firstName}</div>
        })}
    </div>
  )
}

export default AdminPanel
