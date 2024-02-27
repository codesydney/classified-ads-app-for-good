import { api } from './configs/axiosConfig'
import { defineCancelApiObject } from './configs/axiosUtils'

const usersURLVersion = '/v1'
const usersURLRoute = '/users'
const usersURL = usersURLVersion + usersURLRoute

const getAll = async (q, cancel = false) => {
  const params = q ? { q } : undefined
  const signal = cancel
    ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
    : undefined

  try {
    const response = await api.get(usersURL, { params, signal })
    return response.data.users
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const signIn = async formData => {
  const signInURL = usersURL + '/signin'
  const response = await api.post(signInURL, formData)
  return response
}

const signUp = async formData => {
  const signUpURL = usersURL + '/signup'
  const response = await api.post(signUpURL, formData)
  return response
}

const requestReset = async formData => {
  const requestResetURL = usersURL + '/request-reset-password'
  const response = await api.post(requestResetURL, formData)
  return response
}

const resetPassword = async (formData, token) => {
  const resetPasswordURL = usersURL + `/reset-password?token=${token}`
  const response = await api.post(resetPasswordURL, formData)
  return response
}

export const UserAPI = {
  getAll,
  signIn,
  signUp,
  requestReset,
  resetPassword,
}

// defining the cancel API object for UserAPI
const cancelApiObject = defineCancelApiObject(UserAPI)
