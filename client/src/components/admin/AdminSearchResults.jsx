import { useSelector, useDispatch } from 'react-redux'
import { adminSearchUsers } from '../../features/admin/adminAction'

import NoUserResults from './NoUserResults'
import ResultsCount from './ResultsCount'
import PaginationNavigation from '../search/PaginationNavigation'
const AdminSearchResults = () => {
  const dispatch = useDispatch()
  const { users, meta, searchQuery } = useSelector(state => state.admin)

  const handlePageChange = async page => {
    dispatch(adminSearchUsers({ ...searchQuery, page }))
  }

  return (
    <div className="p-4 m-auto max-w-[1444px]">
      <div className="mb-2">
        <ResultsCount meta={meta} usersLength={users.length} />
      </div>
      <div
        className={`min-h-[300px] bg-gray-50 rounded flex flex-col ${!users.length && 'justify-center'}`}
      >
        {users.length ? (
          users.map(user => {
            return <div key={user.firstName}>{user.firstName}</div>
          })
        ) : (
          <NoUserResults />
        )}
      </div>
      <PaginationNavigation meta={meta} handlePageChange={handlePageChange} />
    </div>
  )
}

export default AdminSearchResults
