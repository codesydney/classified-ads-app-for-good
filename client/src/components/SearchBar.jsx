import { Container, TextField } from '@mui/material'
import { useState } from 'react'

const SearchBar = ({ handleSearch }) => {
  const [value, setValue] = useState('')

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch(value)
    }
  }

  return (
    <Container maxWidth="sm">
      <TextField
        id="search-bar"
        label="Search"
        type="search"
        variant="outlined"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Container>
  )
}

export default SearchBar
