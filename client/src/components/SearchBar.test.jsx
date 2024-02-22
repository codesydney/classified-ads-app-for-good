import { fireEvent, render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  test('renders SearchBar component', () => {
    render(<SearchBar />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  test('should handle change and keydown which calls handleSearch prop', () => {
    const spy = jest.fn()
    render(<SearchBar handleSearch={spy} />)
    const searchBar = screen.getByLabelText('Search')
    fireEvent.change(searchBar, { target: { value: 'a' } })

    fireEvent.keyDown(searchBar, { key: 'a' })
    expect(spy).not.toHaveBeenCalled()

    fireEvent.keyDown(searchBar, { key: 'Enter' })
    expect(spy).toHaveBeenCalledWith('a')
  })
})
