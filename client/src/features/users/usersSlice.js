import { createSlice } from '@reduxjs/toolkit'
import { searchUsers, getUserProfile } from './usersAction'

const initialState = {
  users: [],
  userProfile: {},
  loading: false,
  loadingProfile: false,
  error: null,
  profileError: null,
  meta: {
    page: 1,
    totalPages: 1,
  },
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
      state.meta = action.payload.meta
    })
    builder
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.users = []
      })
      // Get User Profile
      .addCase(getUserProfile.pending, state => {
        state.loadingProfile = true
        state.profileError = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loadingProfile = false
        state.profileError = null
        state.userProfile = action.payload.user
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loadingProfile = false
        state.profileError = action.payload
        state.userProfile = {}
      })
  },
})

export default usersSlice.reducer
