import { api } from './configs/axiosConfig'
import { UserAPI } from './UserAPI'

const expectedUsersURL = '/users'
const mockToken = 'dummy_token'

describe('UserAPI', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should return response if UserAPI.searchUsers is successful with no parameters', async () => {
    const getAllResponse = {
      data: { users: [{ name: 'John Doe' }], meta: { page: 1, totalPages: 1 } },
    }
    const spy = jest.spyOn(api, 'get').mockResolvedValue(getAllResponse)
    const response = await UserAPI.searchUsers({}, mockToken)
    expect(response).toEqual(getAllResponse.data)
    expect(spy).toHaveBeenCalledWith(expectedUsersURL, {
      params: {
        search: '',
        page: 1,
        limit: 12,
      },
      signal: undefined,
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    })
  })

  test('should return response if UserAPI.searchUsers is successful with a search query', async () => {
    const searchQuery = 'lawyer'
    const getAllResponse = {
      data: {
        users: [{ name: 'John Doe' }],
        meta: { page: 1, totalPages: 1, limit: 12 },
      },
    }
    const spy = jest.spyOn(api, 'get').mockResolvedValue(getAllResponse)
    const response = await UserAPI.searchUsers(
      { search: searchQuery },
      mockToken,
    )
    expect(response).toEqual(getAllResponse.data)
    expect(spy).toHaveBeenCalledWith(expectedUsersURL, {
      params: { search: searchQuery, page: 1, limit: 12 },
      signal: undefined,
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    })
  })
})
