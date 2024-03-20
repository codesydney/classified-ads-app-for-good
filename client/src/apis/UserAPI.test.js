import { api } from './configs/axiosConfig'
import { UserAPI } from './UserAPI'

const expectedUsersURL = '/users'

describe('UserAPI', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should return response if UserAPI.getAll is successful with no parameters', async () => {
    const getAllResponse = {
      data: { users: [{ name: 'John Doe' }], meta: { page: 1, totalPages: 1 } },
    }
    const spy = jest.spyOn(api, 'get').mockResolvedValue(getAllResponse)
    const response = await UserAPI.searchUsers({})
    expect(response).toEqual(getAllResponse.data)
    expect(spy).toHaveBeenCalledWith(expectedUsersURL, {
      params: {
        search: '',
        page: 1,
      },
      signal: undefined,
    })
  })

  test('should return response if UserAPI.getAll is successful with a search query', async () => {
    const searchQuery = 'lawyer'
    const getAllResponse = {
      data: { users: [{ name: 'John Doe' }], meta: { page: 1, totalPages: 1 } },
    }
    const spy = jest.spyOn(api, 'get').mockResolvedValue(getAllResponse)
    const response = await UserAPI.searchUsers({ search: searchQuery })
    expect(response).toEqual(getAllResponse.data)
    expect(spy).toHaveBeenCalledWith(expectedUsersURL, {
      params: { search: searchQuery, page: 1 },
      signal: undefined,
    })
  })
})
