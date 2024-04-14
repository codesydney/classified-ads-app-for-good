import SearchBar from '../components/search/SearchBar'
import SearchResults from '../components/search/SearchResults'

const Home = () => {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4">
        <SearchBar />
      </div>
      <SearchResults />
    </div>
  )
}

export default Home
