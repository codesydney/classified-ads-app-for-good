import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../assets/logo.jpeg'

const Logo = ({ width, height }) => {
  const navigate = useNavigate()

  return (
    <img
      src={BrandLogo}
      alt="UST Alumni Australia Logo"
      width={width}
      height={height}
      onClick={() => navigate('/')}
      className="cursor-pointer"
    />
  )
}

export default Logo
