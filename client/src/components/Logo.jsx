import BrandLogo from '../assets/logo.jpeg'

const Logo = ({ width, height, newLogo = false }) => {
  return (
    <img
      src={BrandLogo}
      alt="Vision HiTech Logo"
      width={width}
      height={height}
      // onClick={() => router.push('/')}
      className="cursor-pointer"
    />
  )
}

export default Logo
