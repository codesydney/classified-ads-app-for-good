import { useState } from 'react'
import { UserAPI } from '../apis/UserAPI'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const [users, setUsers] = useState([])

  const handleSearch = async query => {
    const results = await UserAPI.getAll(query)
    setUsers(results)
  }

  return (
    <div>
      <h1>Home</h1>
      <SearchBar handleSearch={handleSearch} />
    </div>
  )
}

export default Home
