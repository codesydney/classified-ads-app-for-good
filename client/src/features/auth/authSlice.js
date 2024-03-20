import { createSlice } from '@reduxjs/toolkit'
import { signUp } from './authAuction'

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
  extraReducers: {
    [signUp.pending]: state => {
      state.loading = true
      state.error = null
      state.success = false
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      state.success = true
      state.accessToken = action.payload.token
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
    },
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
