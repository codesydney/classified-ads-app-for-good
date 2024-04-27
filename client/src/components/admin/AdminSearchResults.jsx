import { useSelector } from 'react-redux'
import NoUserResults from './NoUserResults'
import ResultsCount from './ResultsCount'
import PaginationNavigation from '../search/PaginationNavigation'
const AdminSearchResults = () => {
  const { users, meta } = useSelector(state => state.admin)

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
      <PaginationNavigation
        meta={meta}
        handlePageChange={() => console.log('clicked')}
      />
    </div>
  )
}

export default AdminSearchResults
