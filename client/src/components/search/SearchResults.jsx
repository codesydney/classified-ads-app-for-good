import User from './User'

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
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => onPageChange(meta.page - 1)}
            disabled={meta.page <= 1}
          >
            Previous
          </button>
          <span>
            Page {meta.page} of {meta.totalPages}{' '}
          </span>
          <button
            onClick={() => onPageChange(meta.page + 1)}
            disabled={meta.page >= meta.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchResults
