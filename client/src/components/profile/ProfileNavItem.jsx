import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ location, icon, children }) => {
  const { pathname } = useLocation()
  let isActive = pathname === location

  return (
    <li className="flex-grow">
      <Link
        to={location}
        className={`flex rounded-md items-center justify-center gap-4 p-3 flex-grow md:justify-start bg lg:px-6 py-4 hover:bg-slate-50/70 text-neutral/70 hover:text-primary ${isActive ? 'text-primary bg-primary/10 md:border-r-4 md:border-r-primary ease-in-out duration-300' : ''}`}
      >
        {icon}
        <span className="hidden sm:inline">{children}</span>
      </Link>
    </li>
  )
}

export default NavItem
