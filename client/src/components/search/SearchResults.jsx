import User from './User'
import PaginationNavigation from './PaginationNavigation'
const SearchResults = ({ users, meta, onPageChange }) => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-auto-fit-minmax gap-x-10 gap-y-12">
        {users.length ? (
          users.map((user, index) => <User key={index} user={user} />)
        ) : (
          <p>No Users Found</p>
        )}
      </div>
      {users.length > 0 && (
        <PaginationNavigation meta={meta} onPageChange={onPageChange} />
      )}
    </div>
  )
}

export default SearchResults
