import { api } from './configs/axiosConfig'

const adminURL = '/admin/users'

const adminSearchUsers = async (searchObj, token) => {
  const params = searchObj
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.get(adminURL, { params, ...config })
    return response.data
  } catch (error) {
    console.error('Error fetching users', error)
    return { users: [], meta: {} }
  }
}

const adminUpdateUser = async (updatedUserObj, token) => {
  console.log('woohoo api')
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await api.patch(
      `${adminURL}/${updatedUserObj.id}`,
      updatedUserObj,
      config,
    )
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error updating users', error)
    return error
  }
}

const adminUpdateUserProfilePic = async (formData, userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    console.log('sending api funct')
    const response = await api.patch(
      `${adminURL}/${userId}/profilePicture`,
      formData,
      config,
    )
    console.log('recieved response', response)
    return response.data
  } catch (error) {
    console.error('Error updating user Profile pic', error)
    throw error
  }
}

const adminDeleteUserProfilePic = async (userId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.delete(
      `${adminURL}/${userId}/profilePicture`,
      config,
    )
    return response.data
  } catch (error) {
    console.error('Error updating user profile')
    throw error
  }
}

export const AdminAPI = {
  adminSearchUsers,
  adminUpdateUser,
  adminUpdateUserProfilePic,
  adminDeleteUserProfilePic,
}
