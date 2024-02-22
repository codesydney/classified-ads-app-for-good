import { Container, TextField } from '@mui/material'

const SearchBar = () => {
  return (
    <Container maxWidth="sm">
      <TextField
        id="search-bar"
        label="Search"
        type="search"
        variant="outlined"
      />
    </Container>
  )
}

export default SearchBar
