import NavItem from './ProfileNavItem'
import ProfileAvatar from './avatar/ProfileAvatar'
import { PiCertificate } from 'react-icons/pi'
import { RiAccountCircleLine } from 'react-icons/ri'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'

import { useNavigate } from 'react-router-dom'
import withLogout from '../shared/withLogout'
import { useSelector } from 'react-redux'

const ProfileNav = () => {
  const { currentUser } = useSelector(state => state.auth)
  const LogoutButton = withLogout(({ handleLogout }) => (
    <button
      className="hidden md:block py-2 px-4 border-2 w-full border-red-500 text-red-500 rounded text-center hover:bg-red-500 hover:border-transparent hover:text-white hover:font-semibold ease-in-out duration-300"
      onClick={handleLogout}
    >
      Logout
    </button>
  ))
  return (
    <div className="p-5">
      <ProfileAvatar currentUser={currentUser} />
      <nav className="md:mb-20">
        <ul className="flex justify-between items-center md:flex-col md:items-stretch md:gap-4">
          <NavItem
            location="/profile"
            icon={<RiAccountCircleLine className="w-[30px] h-[30px]" />}
          >
            General
          </NavItem>
          <NavItem
            location="/profile/education"
            icon={<PiCertificate className="w-[30px] h-[30px]" />}
          >
            Education
          </NavItem>
          <NavItem
            location="/profile/service"
            icon={<MdOutlineBusinessCenter className="w-[30px] h-[30px]" />}
          >
            Service
          </NavItem>
          <NavItem
            location="/profile/settings"
            icon={<IoSettingsOutline className="w-[30px] h-[30px]" />}
          >
            Settings
          </NavItem>
        </ul>
      </nav>
      <LogoutButton />
    </div>
  )
}

export default ProfileNav
