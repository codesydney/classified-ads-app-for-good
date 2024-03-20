import { createSlice } from '@reduxjs/toolkit'
import { signUp, login } from './authAuction'

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
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
      localStorage.setItem('accessToken', action.payload.token)
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.accessToken = null
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
      localStorage.setItem('accessToken', action.payload.token)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
      state.accessToken = null
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
