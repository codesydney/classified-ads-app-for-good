import { useState, useEffect } from 'react'
import Container from '../Container.jsx'
import Logo from './Logo.jsx'
import UserMenu from './UserMenu.jsx'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { currentUser } = useSelector(state => state.auth)

  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY)
  const [top, setTop] = useState(true)
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      if (prevScrollpos > currentScrollPos) {
        setTop(true) // Show navbar
      } else {
        setTop(false) // Hide navbar
      }
      setPrevScrollpos(currentScrollPos)
    }
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll)
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollpos])

  return (
    <div
      className={`fixed w-full bg-primary z-10 shadow-lg mb-[150px] ease-in-out duration-300 ${top ? 'top-0' : 'top-[-150px]'}`}
    >
      <div
        className="
          py-2
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
