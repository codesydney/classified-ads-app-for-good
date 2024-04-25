import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminAPI } from '../../apis/AdminAPI.js'

const adminSearchUsers = createAsyncThunk(
  'admin/searchUsers',
  async (_, { rejectWithValue }) => {
    console.log('admin action running')
    try {
      const token = localStorage.getItem('accessToken')

      const response = await AdminAPI.adminSearchUsers({}, token)

      return response
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export { adminSearchUsers }
