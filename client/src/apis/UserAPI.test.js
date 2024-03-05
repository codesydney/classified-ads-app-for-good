import { api } from './configs/axiosConfig'
import { UserAPI } from './UserAPI'

const expectedUsersURL = '/users'

describe('UserAPI', () => {
  test('should return response if UserAPI.getAll is successful with no query', async () => {
    const getAllResponse = { data: { users: [{ name: 'John Doe' }] } }
    const spy = jest.spyOn(api, 'get').mockReturnValue(getAllResponse)
    expect(await UserAPI.getAll()).toEqual([{ name: 'John Doe' }])
    expect(spy).toHaveBeenCalledWith(expectedUsersURL, {
      params: undefined,
      signal: undefined,
    })
  })

  test('should return response if UserAPI.getAll is successful with a query', async () => {
    const getAllResponse = { data: { users: [{ name: 'John Doe' }] } }
    const spy = jest.spyOn(api, 'get').mockReturnValue(getAllResponse)
    expect(await UserAPI.getAll('lawyer')).toEqual([{ name: 'John Doe' }])
    expect(spy).toHaveBeenCalledWith(expectedUsersURL, {
      params: { q: 'lawyer' },
      signal: undefined,
    })
  })
})
