import { useState, useEffect, useCallback, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Avatar from '../Avatar.jsx'
import MenuItem from './MenuItem.jsx'

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  const navigate = useNavigate()

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  const handleCloseMenu = useCallback(event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseMenu)
    return () => {
      document.removeEventListener('mousedown', handleCloseMenu)
    }
  }, [handleCloseMenu])

  const handleNavigate = useCallback(
    path => {
      navigate(path)
      setIsOpen(false)
    },
    [navigate],
  )

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
          onClick={() => navigate('/about')}
        >
          About
        </div>
        <div
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
          onClick={() => navigate('/contact')}
        >
          Contact
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Profile" onClick={() => handleNavigate('/')} />
                <div className="md:hidden">
                  <MenuItem
                    label="About"
                    onClick={() => handleNavigate('/about')}
                  />
                  <MenuItem
                    label="Contact"
                    onClick={() => handleNavigate('/contact')}
                  />
                </div>

                <hr />
                <MenuItem label="Logout" onClick={() => handleNavigate('/')} />
              </>
            ) : (
              <>
                <div className="md:hidden">
                  <MenuItem
                    label="About"
                    onClick={() => handleNavigate('/about')}
                  />
                  <MenuItem
                    label="Contact"
                    onClick={() => handleNavigate('/contact')}
                  />
                </div>
                <MenuItem
                  label="Login"
                  onClick={() => handleNavigate('/login')}
                />
                <MenuItem
                  label="Sign Up"
                  onClick={() => handleNavigate('/signup')}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
