import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  test('renders SearchBar component', () => {
    render(<SearchBar />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  test('should handle change and keydown which calls handleSearch prop', async () => {
    const user = userEvent.setup()
    const spy = jest.fn()
    render(<SearchBar handleSearch={spy} />)
    const searchBar = screen.getByLabelText('Search')

    await user.type(searchBar, 'lawyer')
    expect(spy).not.toHaveBeenCalled()

    await user.keyboard('{Enter}')
    expect(spy).toHaveBeenCalledWith('lawyer')
  })
})
