const ResultsCount = ({ meta, usersLength }) => {
  return (
    <div className="flex gap-1">
      <span>Query Results:</span>
      {usersLength ? (
        <>
          <span className="font-semibold">
            {meta.page * meta.limit - (meta.limit - 1)}
          </span>
          -
          <span className="font-semibold">
            {meta.page * meta.limit - (meta.limit - 1) + usersLength - 1}
          </span>
          <span>of</span>
          <span className="font-semibold">{meta.total}</span>
        </>
      ) : (
        <span>0</span>
      )}
    </div>
  )
}

export default ResultsCount
