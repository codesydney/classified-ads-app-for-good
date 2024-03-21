import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './features/auth/authSlice'
import usersReducer from './features/users/usersSlice'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
})

export const useAppDispatch = () => useDispatch()
