import { api } from './configs/axiosConfig'

const adminURL = '/admin/users'

const adminSearchUsers = async ({}, token) => {
  const params = {}
  console.log('admin api func running')
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

export const AdminAPI = {
  adminSearchUsers,
}
