import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../assets/logo.jpeg'

const Logo = () => {
  const navigate = useNavigate()

  return (
    <img
      src={BrandLogo}
      alt="UST Alumni Australia Logo"
      width="100"
      height="100"
      onClick={() => navigate('/')}
      className="md:block cursor-pointer rounded-md shadow-sm border-2 border-sky-400/10 hover:border-sky-400"
    />
  )
}

export default Logo
