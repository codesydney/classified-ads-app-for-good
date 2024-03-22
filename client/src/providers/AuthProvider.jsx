import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store.js'
import { me } from '../features/auth/authAction.js'

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isAuthenticated) return

    dispatch(me())
  }, [])

  return <>{children}</>
}

export default AuthProvider
