import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRouteReplacement = ({ children }) => {
  const { isAuthenticated, accessToken } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [navigate, isAuthenticated, accessToken])

  return children
}

export const ProtectedRouteAdmin = ({ children }) => {
  const { currentUser } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.isAdmin) {
        navigate('/')
      }
    }
  }, [navigate, currentUser])

  return children
}
export default ProtectedRouteReplacement
