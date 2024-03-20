import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchUsers } from '../features/users/usersAction.js'

const Users = () => {
  const dispatch = useDispatch()
  const { users, meta } = useSelector(state => state.users)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchUsers = async ({ search = '', page = 1 } = {}) => {
    await dispatch(searchUsers({ search, page }))
  }

  const handlePageChange = async page => {
    await fetchUsers({ search: searchQuery, page })
  }

  // Should remove this and don't display the results by default. It should be performed on search only
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              style={{ border: '1px solid black', padding: '10px' }}
            >
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <p>Email: {user.email}</p>
              {user.service && user.service.serviceName && (
                <p>Service Name: {user.service.serviceName}</p>
              )}
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {users.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => handlePageChange(meta.page - 1)}
            disabled={meta.page <= 1}
          >
            Previous
          </button>
          <span>
            Page {meta.page} of {meta.totalPages}{' '}
          </span>
          <button
            onClick={() => handlePageChange(meta.page + 1)}
            disabled={meta.page >= meta.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Users
