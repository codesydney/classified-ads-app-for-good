import { useState, useEffect, useCallback, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store.js'
import { logout } from '../../features/auth/authSlice.js'

import Avatar from '../Avatar.jsx'
import MenuItem from './MenuItem.jsx'

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isAuthenticated } = useSelector(state => state.auth)

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
          onClick={() => navigate('/')}
        >
          Home
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
            {!isAuthenticated && !currentUser?.alumniProfilePicture && (
              <Avatar src={null} />
            )}

            {isAuthenticated && currentUser?.alumniProfilePicture && (
              <Avatar src={currentUser.alumniProfilePicture} />
            )}

            {isAuthenticated && !currentUser?.alumniProfilePicture && (
              <div className="bg-primary h-[30px] w-[30px] rounded-full flex items-center justify-center font-bold">
                {currentUser?.firstName[0]}
                {currentUser?.lastName[0]}
              </div>
            )}
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
                <div className="hidden md:block">
                  <MenuItem
                    label="Account"
                    onClick={() => handleNavigate('/account')}
                  />
                </div>
                <div className="md:hidden">
                  <MenuItem label="Home" onClick={() => handleNavigate('/')} />
                  <MenuItem
                    label="Account"
                    onClick={() => handleNavigate('/account')}
                  />
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
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    dispatch(logout())
                    handleNavigate('/')
                    toast.success('Logged out successfully')
                  }}
                />
              </>
            ) : (
              <>
                <div className="md:hidden">
                  <MenuItem label="Home" onClick={() => handleNavigate('/')} />
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
