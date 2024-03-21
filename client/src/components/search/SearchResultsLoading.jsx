import UserSkeleton from './UserSkeleton'

const SearchResultsLoading = () => {
  return Array(10)
    .fill('')
    .map((_, index) => {
      return <UserSkeleton key={index} />
    })
}

export default SearchResultsLoading
