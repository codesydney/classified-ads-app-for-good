import NavItem from './ProfileNavItem'
import { PiCertificate } from 'react-icons/pi'
import { RiAccountCircleLine } from 'react-icons/ri'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import profileImg from '../../assets/placeholder.jpg'

const ProfileNav = () => {
  return (
    <div className="p-5">
      <div className="flex items-center gap-[10px] mb-6 md:mb-16 md:flex-col">
        <img
          src={profileImg}
          alt="Avatarimg"
          className="rounded-full w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
        />
        <p>Hello, Placeholder</p>
      </div>
      <nav className="md:mb-20">
        <ul className="flex justify-between items-center md:flex-col md:items-stretch md:gap-4">
          <NavItem
            location="/account"
            icon={<RiAccountCircleLine className="w-[30px] h-[30px]" />}
          >
            General
          </NavItem>
          <NavItem
            location="/account/education"
            icon={<PiCertificate className="w-[30px] h-[30px]" />}
          >
            Education
          </NavItem>
          <NavItem
            location="/account/service"
            icon={<MdOutlineBusinessCenter className="w-[30px] h-[30px]" />}
          >
            Service
          </NavItem>
          <NavItem
            location="/account/settings"
            icon={<IoSettingsOutline className="w-[30px] h-[30px]" />}
          >
            Settings
          </NavItem>
        </ul>
      </nav>
      <button className="hidden md:block py-2 px-4 border-2 w-full border-primary text-primary rounded text-center hover:bg-primary hover:border-transparent hover:text-white">
        Logout
      </button>
    </div>
  )
}

export default ProfileNav
