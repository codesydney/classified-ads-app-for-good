import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminAPI } from '../../apis/AdminAPI.js'
import { resetSearchQuery } from './adminSlice.js'

const adminSearchUsers = createAsyncThunk(
  'admin/searchUsers',
  async (searchObj, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await AdminAPI.adminSearchUsers(searchObj, token)

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

const adminResetSearch = createAsyncThunk(
  'admin/resetSearch',
  async (_, { rejectWithValue, getState, dispatch }) => {
    dispatch(resetSearchQuery())

    const updatedSearchQuery = getState().admin.searchQuery
    return dispatch(adminSearchUsers({ ...updatedSearchQuery, page: 1 }))
  },
)

const adminUpdateUser = createAsyncThunk(
  'admin/updateUser',
  async (updatedUserObj, { rejectWithValue }) => {
    try {
      console.log('dispatch action', updatedUserObj)
      const token = localStorage.getItem('accessToken')
      const response = await AdminAPI.adminUpdateUser(updatedUserObj, token)

      return response.user
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const adminDeleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (deleteUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await AdminAPI.adminDeleteUser(deleteUserId, token)

      return response.user
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const adminUpdateUserProfilePic = createAsyncThunk(
  'admin/updateUserProfilePic',
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await AdminAPI.adminUpdateUserProfilePic(
        formData,
        userId,
        token,
      )

      return response.user
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const adminDeleteUserProfilePic = createAsyncThunk(
  'admin/deleteUserProfilePic',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await AdminAPI.adminDeleteUserProfilePic(userId, token)
      return response.user
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export {
  adminSearchUsers,
  adminResetSearch,
  adminUpdateUser,
  adminDeleteUser,
  adminUpdateUserProfilePic,
  adminDeleteUserProfilePic,
}
