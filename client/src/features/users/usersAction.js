import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserAPI } from '../../apis/UserAPI.js'

const searchUsers = createAsyncThunk(
  'users/getAll',
  async ({ search = '', page = 1 }, { rejectWithValue }) => {
    try {
      // Simulate loading time - remove the setTimeout below
      await new Promise(resolve => setTimeout(resolve, 2000))
      const token = localStorage.getItem('accessToken')

      const response = await UserAPI.searchUsers({ search, page }, token)
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

const getUserProfile = createAsyncThunk(
  'users/getUserProfile',
  ({ userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      return UserAPI.getUserProfile(userId, token)
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export { searchUsers, getUserProfile }
