import { createSlice } from '@reduxjs/toolkit'
import {
  signUp,
  login,
  requestResetPassword,
  resetPassword,
  me,
} from './authAction'

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  // We should do a check here if the accesss is valid and has not expired
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  loggedInUser: null,
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
      state.loggedInUser = action.payload.user
    })
    builder.addCase(me.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.loggedInUser = null
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
