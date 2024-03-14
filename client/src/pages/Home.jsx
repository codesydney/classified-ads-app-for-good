import { useState, useEffect } from 'react'
import { UserAPI } from '../apis/UserAPI'
import SearchBar from '../components/SearchBar'
import Users from '../components/Users'

const Home = () => {
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [searchQuery, setSearchQuery] = useState('')

  const fetchUsers = async ({ search = '', page = 1 } = {}) => {
    const results = await UserAPI.getAll({ search, page })
    setUsers(results.users || [])
    setMeta(results.meta || { page: 1, totalPages: 1 })
  }

  const handleSearch = async query => {
    setSearchQuery(query)
    await fetchUsers({ search: query, page: meta.page })
  }

  const handlePageChange = async page => {
    await fetchUsers({ search: searchQuery, page })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <SearchBar handleSearch={handleSearch} />
      <Users users={users} meta={meta} onPageChange={handlePageChange} />
    </div>
  )
}

export default Home
