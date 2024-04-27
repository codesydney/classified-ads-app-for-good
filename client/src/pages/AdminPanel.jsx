import { useSelector, useDispatch } from 'react-redux'
import { adminSearchUsers } from '../features/admin/adminAction.js'
import { useEffect, useState } from 'react'
import AdminSearchBar from '../components/admin/AdminSearchBar.jsx'
import AdminSearchResults from '../components/admin/AdminSearchResults.jsx'

const AdminPanel = () => {
  // const dispatch = useDispatch()
  // const { users, meta, loading } = useSelector(state => state.admin)
  // const { currentUser } = useSelector(state => state.auth)
  // const fetchUsers = async () => {
  //   await dispatch(adminSearchUsers())
  // }

  // useEffect(() => {
  //   console.log('use effect running')
  //   fetchUsers()
  // }, [])

  return (
    <div>
      <h1>Admin Panel</h1>
      <AdminSearchBar />
      <AdminSearchResults />
    </div>
  )
}

export default AdminPanel
