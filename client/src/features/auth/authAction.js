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

const updateGeneral = createAsyncThunk(
  'auth/updateGeneral',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await UserAPI.updateGeneral(profileData, token)

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

const updateService = createAsyncThunk(
  'auth/updateService',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await UserAPI.updateService(profileData, token)

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

const updateEducation = createAsyncThunk(
  'auth/updateEducation',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')

      const response = await UserAPI.updateEducation(profileData, token)

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

const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await UserAPI.updatePassword(passwordData, token)

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

const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await UserAPI.deleteAccount(token)
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

const updateImage = createAsyncThunk(
  'auth/updateImage',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await UserAPI.updateImage(formData, token)

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

const deleteProfileImage = createAsyncThunk(
  'auth/deleteProfileImage',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await UserAPI.deleteProfileImage(token)

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

export {
  login,
  signUp,
  requestResetPassword,
  resetPassword,
  me,
  updateProfile,
  updateGeneral,
  updateService,
  updateEducation,
  updatePassword,
  deleteAccount,
  updateImage,
  deleteProfileImage,
}
