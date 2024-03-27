import { api } from './configs/axiosConfig'
import { defineCancelApiObject } from './configs/axiosUtils'

const usersURL = '/users'

const searchUsers = async (
  { search = '', page = 1 },
  token,
  cancel = false,
) => {
  const params = { search, page, limit: 12 }
  const signal = cancel
    ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
    : undefined

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.get(usersURL, { params, signal, ...config })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return { users: [], meta: {} }
  }
}

const login = formData => {
  const signInURL = `${usersURL}/login`
  return api.post(signInURL, formData)
}

const signUp = formData => {
  const signUpURL = `${usersURL}/signup`
  return api.post(signUpURL, formData)
}

const requestReset = formData => {
  const requestResetURL = `${usersURL}/request-reset-password`
  return api.post(requestResetURL, formData)
}

const resetPassword = (formData, token) => {
  const resetPasswordURL = `${usersURL}/reset-password?token=${token}`
  return api.post(resetPasswordURL, formData)
}

const me = token => {
  const meURL = `${usersURL}/me`
  return api.get(meURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const updateProfile = async (profileData, token) => {
  const updateProfileURL = `${usersURL}/profile/me`

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.patch(updateProfileURL, profileData, config)
    return response.data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

const getUserProfile = async (userId, token) => {
  const getUsersProfileURL = `${usersURL}/profile/${userId}`

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.get(getUsersProfileURL, config)

    return response.data
  } catch (error) {
    console.error('Error retrieving users profile', error)
    throw error
  }
}

const updateGeneral = async (profileData, token) => {
  const updateGeneralURL = `${usersURL}/profile/general`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.patch(updateGeneralURL, profileData, config)

    return response.data
  } catch (error) {
    console.error('error updating General information')
    throw error
  }
}

const updateService = async (profileData, token) => {
  const updateServiceURL = `${usersURL}/profile/service`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.patch(updateServiceURL, profileData, config)

    return response.data
  } catch (error) {
    console.error('error updating service information')
    throw error
  }
}

const updateEducation = async (profileData, token) => {
  const updateEducationURL = `${usersURL}/profile/education`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.patch(updateEducationURL, profileData, config)

    return response.data
  } catch (error) {
    console.error('error updating education information')
    throw error
  }
}

const updatePassword = async (passwordData, token) => {
  const updatePasswordURL = `${usersURL}/profile/password`

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.patch(updatePasswordURL, passwordData, config)
    return response.data
  } catch (error) {
    console.error('Error updating password', error)
    throw error
  }
}

const deleteAccount = async token => {
  const deleteAccountURL = `${usersURL}/me`

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.delete(deleteAccountURL, config)
    return response.data
  } catch (error) {
    console.error('Deleting account', error)
    throw error
  }
}

export const UserAPI = {
  searchUsers,
  login,
  signUp,
  requestReset,
  resetPassword,
  me,
  updateProfile,
  getUserProfile,
  updateGeneral,
  updateService,
  updateEducation,
  updatePassword,
  deleteAccount,
}

// defining the cancel API object for UserAPI
const cancelApiObject = defineCancelApiObject(UserAPI)
