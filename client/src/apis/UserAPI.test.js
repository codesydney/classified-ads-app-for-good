import { api } from './configs/axiosConfig'
import { UserAPI } from './UserAPI'

describe('UserAPI', () => {
  test('should return response if UserAPI.getAll is successful', async () => {
    const getAllResponse = { data: { users: [{ name: 'John Doe' }] } }
    const spy = jest.spyOn(api, 'get').mockReturnValue(getAllResponse)
    expect(await UserAPI.getAll()).toEqual([{ name: 'John Doe' }])
    expect(spy).toHaveBeenCalledWith('/users', { signal: undefined })
  })

  test('should return response if UserAPI.search is successful', async () => {
    const search = { data: { users: [{ name: 'John Doe' }] } }
    const spy = jest.spyOn(api, 'get').mockReturnValue(search)
    expect(await UserAPI.search('lawyer')).toEqual([{ name: 'John Doe' }])
    expect(spy).toHaveBeenCalledWith('/users/search', {
      params: { q: 'lawyer' },
      signal: undefined,
    })
  })
})
