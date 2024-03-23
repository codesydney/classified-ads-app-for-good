import { Link, useLocation } from 'react-router-dom'
const activeClass = 'text-primary'
const normalClass = ''
const NavItem = ({ location, icon, children }) => {
  const { pathname } = useLocation()
  let isActive = pathname === location

  return (
    <li className="flex-grow">
      <Link
        to={location}
        className={`flex rounded-md items-center justify-center gap-4 p-3 flex-grow md:justify-start bg lg:px-6 py-4 hover:bg-slate-50/70 hover:text-primary ${isActive ? 'bg-primary/10 md:border-r-4 md:border-r-primary' : ''}`}
      >
        <span className={`text-neutral/70 ${isActive ? 'text-primary' : ''}`}>
          {icon}
        </span>
        <span className="hidden sm:inline">{children}</span>
      </Link>
    </li>
  )
}

export default NavItem
