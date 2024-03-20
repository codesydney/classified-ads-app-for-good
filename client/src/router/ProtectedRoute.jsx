import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { accessToken } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [navigate, accessToken])

  return <Outlet />
}

export default ProtectedRoute
