import { createSlice } from '@reduxjs/toolkit'
import { searchUsers } from './usersAction'

const initialState = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Search Users
    builder.addCase(searchUsers.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.users = action.payload.users
    })
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.users = []
    })
  },
})

export default usersSlice.reducer
