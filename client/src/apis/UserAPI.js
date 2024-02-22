import { api } from './configs/axiosConfig'
import { defineCancelApiObject } from './configs/axiosUtils'

const usersURL = '/users'

const getAll = async (cancel = false) => {
  try {
    const response = await api.get(usersURL, {
      signal: cancel
        ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
        : undefined,
    })
    return response.data.users
  } catch (error) {
    console.error('Error fetching all users:', error)
  }
}

const search = async (q, cancel = false) => {
  const params = { q }
  try {
    const response = await api.get(usersURL + '/search', {
      params,
      signal: cancel
        ? cancelApiObject[this.search.name].handleRequestCancellation().signal
        : undefined,
    })
    return response.data.users
  } catch (error) {
    console.error('Error searching users:', error)
  }
}

export const UserAPI = {
  getAll,
  search,
}

// defining the cancel API object for UserAPI
const cancelApiObject = defineCancelApiObject(UserAPI)
