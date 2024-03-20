import Container from '../Container.jsx'
import Logo from './Logo.jsx'
import UserMenu from './UserMenu.jsx'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth)

  // This will determine if the user is logged in or not
  const currentUser = isAuthenticated && {
    image: 'https://randomuser.me/api/portraits',
  }

  return (
    <div className="fixed top-0 w-full bg-white z-10 shadow-sm mb-[150px]">
      <div
        className="
          py-4
          border-b-[1px]
          border-primary
        "
      >
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
