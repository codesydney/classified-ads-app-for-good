import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../assets/logo.jpeg'

const Logo = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (window.location.pathname === '/') {
      window.location.reload()
    } else {
      navigate('/')
    }
  }

  return (
    <img
      src={BrandLogo}
      alt="UST Alumni Australia Logo"
      width="100"
      height="100"
      onClick={handleLogoClick}
      className="md:block cursor-pointer rounded-md shadow-sm border-2 border-sky-400/10 hover:border-sky-400"
    />
  )
}

export default Logo
