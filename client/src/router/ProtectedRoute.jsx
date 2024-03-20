import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthenticated, accessToken } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [navigate, isAuthenticated, accessToken])

  return <Outlet />
}

export default ProtectedRoute
