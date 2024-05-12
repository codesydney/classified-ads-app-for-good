import { useSelector, useDispatch } from 'react-redux'
import {
  adminSearchUsers,
  adminResetSearch,
} from '../../../features/admin/adminAction'
import { useEffect } from 'react'
import NoUserResults from './NoUserResults'
import ResultsCount from './ResultsCount'
import PaginationNavigation from '../../search/PaginationNavigation'
import IndividualUserResultContainer from './IndividualUserResultContainer'

const AdminSearchResults = () => {
  const dispatch = useDispatch()
  const { users, meta, searchQuery } = useSelector(state => state.admin)

  const handlePageChange = async page => {
    dispatch(adminSearchUsers({ ...searchQuery, page }))
  }

  useEffect(() => {
    dispatch(adminResetSearch())
  }, [])
  console.log(users)
  return (
    <div className="p-4 m-auto max-w-[1444px]">
      <div className="mb-2">
        <ResultsCount meta={meta} usersLength={users.length} />
      </div>
      <div
        className={`min-h-[300px] bg-gray-50 rounded flex flex-col p-2 ${!users.length && 'justify-center'}`}
      >
        {users.length ? (
          users.map(user => {
            return <IndividualUserResultContainer key={user.id} user={user} />
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
