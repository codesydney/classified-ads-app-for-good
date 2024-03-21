import User from './User'
import PaginationNavigation from './PaginationNavigation'
import NoResults from './NoResults'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchUsers } from '../../features/users/usersAction.js'

const SearchResults = () => {
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
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-auto-fit-minmax gap-x-10 gap-y-12">
        {users.length ? (
          users.map((user, index) => <User key={index} user={user} />)
        ) : (
          <NoResults />
        )}
      </div>
      {users.length > 0 && (
        <PaginationNavigation meta={meta} handlePageChange={handlePageChange} />
      )}
    </div>
  )
}

export default SearchResults
