import SearchBar from '../components/SearchBar'
import Users from '../components/Users'
import SearchResults from '../components/search/SearchResults'

const Home = () => {
  return (
    <div>
<<<<<<< HEAD
      <SearchBar handleSearch={handleSearch} />
      <SearchResults
        users={users}
        meta={meta}
        onPageChange={handlePageChange}
      />
=======
      <h1>Home</h1>
      <SearchBar />
      <Users />
>>>>>>> main
    </div>
  )
}

export default Home
