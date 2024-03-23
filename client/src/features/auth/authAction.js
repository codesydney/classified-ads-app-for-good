import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserAPI } from '../../apis/UserAPI.js'

const signUp = createAsyncThunk(
  'auth/signUp',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await UserAPI.signUp(formData)
      const token = response.data.token
      localStorage.setItem('accessToken', token)

      return response.data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await UserAPI.login(formData)
      const token = response.data.token
      localStorage.setItem('accessToken', token)

      return response.data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const requestResetPassword = createAsyncThunk(
  'auth/requestResetPassword',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await UserAPI.requestReset(formData)
      return response.data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData, { rejectWithValue }) => {
    try {
      const token = new URLSearchParams(window.location.search).get('token')
      const response = await UserAPI.resetPassword(formData, token)
      return response.data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const me = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await UserAPI.me(token)
    return response.data
  } catch (error) {
    if (error.response && error.response.data.error) {
      return rejectWithValue(error.response.data.error)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await UserAPI.updateProfile(profileData, token)
      return response.data
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export { login, signUp, requestResetPassword, resetPassword, me, updateProfile }
