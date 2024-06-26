import { useState, useEffect, useCallback, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store.js'
import { logout } from '../../features/auth/authSlice.js'

import Avatar from '../Avatar.jsx'
import MenuItem from './MenuItem.jsx'
import MenuButton from './MenuButton.jsx'

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isAuthenticated } = useSelector(state => state.auth)

  const isAdmin = currentUser?.isAdmin

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
      if (window.location.pathname === path) {
        window.location.reload()
      } else {
        navigate(path)
        setIsOpen(false)
      }
    },
    [navigate],
  )

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <MenuButton
          label={'Home'}
          navigate={() => handleNavigate('/')}
          extraClasses={' hover:text-[#FCBF15] font-extra-bold'}
        />
        <MenuButton
          label={'Contact'}
          navigate={() => handleNavigate('/contact')}
          extraClasses={' hover:text-[#FCBF15] font-extra-bold'}
        />
        {/*<div*/}
        {/*  className="*/}
        {/*    hidden*/}
        {/*    md:block*/}
        {/*    text-sm*/}
        {/*    font-semibold*/}
        {/*    py-3*/}
        {/*    px-4*/}
        {/*    rounded-full*/}
        {/*    hover:bg-neutral-100*/}
        {/*    transition*/}
        {/*    cursor-pointer*/}
        {/*  "*/}
        {/*  onClick={() => navigate('/officers')}*/}
        {/*>*/}
        {/*  Officers*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className="*/}
        {/*    hidden*/}
        {/*    md:block*/}
        {/*    text-sm*/}
        {/*    font-semibold*/}
        {/*    py-3*/}
        {/*    px-4*/}
        {/*    rounded-full*/}
        {/*    hover:bg-neutral-100*/}
        {/*    transition*/}
        {/*    cursor-pointer*/}
        {/*  "*/}
        {/*  onClick={() => navigate('/developers')}*/}
        {/*>*/}
        {/*  Developers*/}
        {/*</div>*/}
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-2
          border-neutral
          hover:border-sky-400
          hover:text-sky-400
          flex
          flex-row
          items-center
          gap-3
          rounded-md
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
                    label="My Profile"
                    onClick={() => handleNavigate('/profile')}
                  />
                </div>
                <div className="md:hidden">
                  <MenuItem label="Home" onClick={() => handleNavigate('/')} />
                  <MenuItem
                    label="Contact"
                    onClick={() => handleNavigate('/contact')}
                  />
                  <MenuItem
                    label="My Profile"
                    onClick={() => handleNavigate('/profile')}
                  />
                  {/*<MenuItem*/}
                  {/*  label="Officers"*/}
                  {/*  onClick={() => handleNavigate('/officers')}*/}
                  {/*/>*/}
                  {/*<MenuItem*/}
                  {/*  label="Developers"*/}
                  {/*  onClick={() => handleNavigate('/developers')}*/}
                  {/*/>*/}
                </div>

                <>
                  {isAdmin && (
                    <MenuItem
                      label="Admin Panel"
                      onClick={() => handleNavigate('/admin')}
                    />
                  )}
                  {/* <MenuItem
                    label="Membership Fee Payment"
                    onClick={() =>
                      window.open(
                        'https://buy.stripe.com/6oEbKo6dzdUoctG147',
                        '_blank',
                      )
                    }
                  /> */}
                </>

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
                    label="Contact"
                    onClick={() => handleNavigate('/contact')}
                  />

                  {/*<MenuItem*/}
                  {/*  label="Officers"*/}
                  {/*  onClick={() => handleNavigate('/officers')}*/}
                  {/*/>*/}
                  {/*<MenuItem*/}
                  {/*  label="Developers"*/}
                  {/*  onClick={() => handleNavigate('/developers')}*/}
                  {/*/>*/}
                </div>
                <MenuItem
                  label="Login"
                  onClick={() => handleNavigate('/login')}
                />
                <MenuItem
                  label="Sign Up"
                  onClick={() => handleNavigate('/signup')}
                />
                {/*<MenuItem*/}
                {/*  label="Membership Fee Payment"*/}
                {/*  onClick={() =>*/}
                {/*    window.open(*/}
                {/*      'https://buy.stripe.com/6oEbKo6dzdUoctG147',*/}
                {/*      '_blank',*/}
                {/*    )*/}
                {/*  }*/}
                {/*/>*/}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
