import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../store'
import { logout } from '../../features/auth/authSlice.js'

const withLogout = WrappedComponent => props => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = path => {
    dispatch(logout())
    navigate(path)
    toast.success('Logged out Successfully.')
  }

  return <WrappedComponent {...props} handleLogout={handleLogout} />
}

export default withLogout
