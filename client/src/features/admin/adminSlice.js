import { createSlice } from '@reduxjs/toolkit'
import { adminSearchUsers } from './adminAction'

const initialState = {
  users: [],
  loading: false,
  error: null,
  meta: {
    page: 1,
    totalPages: 1,
  },
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Search Users
    builder.addCase(adminSearchUsers.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(adminSearchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.users = action.payload.users
      state.meta = action.payload.meta
    })
    builder.addCase(adminSearchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.users = []
    })
    // Edit User
    // Delete User
    // Add User
  },
})

export default adminSlice.reducer
