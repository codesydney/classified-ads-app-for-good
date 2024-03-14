const Users = ({ users, meta, onPageChange }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              style={{ border: '1px solid black', padding: '10px' }}
            >
              <h2>{user.fullName}</h2>
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

export default Users
