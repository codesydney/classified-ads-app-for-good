import { render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  test('renders SearchBar component', () => {
    render(<SearchBar />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })
})
