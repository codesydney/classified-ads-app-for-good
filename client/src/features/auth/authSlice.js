import { createSlice } from '@reduxjs/toolkit'
import {
  signUp,
  login,
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
} from './authAction'

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  // We should do a check here if the accesss is valid and has not expired
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  currentUser: null,
  loading: false,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('accessToken') // deletes token from storage
      state.accessToken = null
      state.isAuthenticated = false
      state.currentUser = null
      state.error = null
      state.loading = false
    },
  },
  extraReducers: builder => {
    // Sign Up
    builder.addCase(signUp.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
      state.accessToken = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('accessToken', action.payload.token)
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.accessToken = null
      state.isAuthenticated = false
    })

    // Login
    builder.addCase(login.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
      state.accessToken = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('accessToken', action.payload.token)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.accessToken = null
      state.isAuthenticated = false
    })

    // Request Reset Password
    builder.addCase(requestResetPassword.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(requestResetPassword.fulfilled, state => {
      state.loading = false
      state.error = null
      state.success = true
    })
    builder.addCase(requestResetPassword.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Reset Password
    builder.addCase(resetPassword.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(resetPassword.fulfilled, state => {
      state.loading = false
      state.error = null
      state.success = true
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Me
    builder.addCase(me.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(me.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.currentUser = action.payload.user
    })
    builder.addCase(me.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.currentUser = null
      localStorage.removeItem('accessToken')
      state.isAuthenticated = false
    })

    // Update Profile
    builder.addCase(updateProfile.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Update General
    builder.addCase(updateGeneral.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updateGeneral.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
      state.currentUser = action.payload.user
    })
    builder.addCase(updateGeneral.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })
    // Update Service
    builder.addCase(updateService.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
      state.currentUser = action.payload.user
    })
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })
    // Update Education
    builder.addCase(updateEducation.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updateEducation.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
      state.currentUser = action.payload.user
    })
    builder.addCase(updateEducation.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Update Password
    builder.addCase(updatePassword.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updatePassword.fulfilled, state => {
      state.loading = false
      state.error = false
      state.success = true
    })
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Delete acccount
    builder.addCase(deleteAccount.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(deleteAccount.fulfilled, state => {
      state.loading = false
      state.error = false
      state.success = true
    })
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Update Image
    builder.addCase(updateImage.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.success = true
      state.currentUser = action.payload.user
    })
    builder.addCase(updateImage.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })

    // Delete Profile Image
    builder.addCase(deleteProfileImage.pending, state => {
      state.loading = true
      state.error = null
      state.success = false
    })
    builder.addCase(deleteProfileImage.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.success = true
      state.currentUser = action.payload.user
    })
    builder.addCase(deleteProfileImage.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
