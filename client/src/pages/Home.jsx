import { useState } from 'react'
import { UserAPI } from '../apis/UserAPI'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const [users, setUsers] = useState([])

  const handleSearch = async query => {
    const results = query ? await UserAPI.search(query) : await UserAPI.getAll()
    setUsers(results)
  }

  return (
    <div>
      <h1>Home</h1>
      <SearchBar handleSearch={handleSearch} />
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.name ? user.name : null}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
