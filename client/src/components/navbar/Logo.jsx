import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../assets/logo.jpeg'

const Logo = () => {
  const navigate = useNavigate()

  return (
    <img
      src={BrandLogo}
      alt="UST Alumni Australia Logo"
      width="150"
      height="150"
      onClick={() => navigate('/')}
      className="md:block cursor-pointer"
    />
  )
}

export default Logo
