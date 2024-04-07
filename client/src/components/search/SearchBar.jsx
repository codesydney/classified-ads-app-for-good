import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../../features/users/usersAction.js'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      dispatch(searchUsers({ search: value }))
    }
  }

  return (
    <input
      id="search-bar"
      aria-label="Search Alumni"
      type="search"
      placeholder="Search Alumni"
      className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent my-8"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchBar
