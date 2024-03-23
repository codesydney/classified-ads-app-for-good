import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs.jsx'
const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 py-6 md:py-2 md:flex-wrap md:gap-2">
      <Breadcrumbs />
      <div className="">
        <Link
          to="/about"
          className="py-2 px-4 block border-2 mt-4 sm:mt-0 w-fit border-primary rounded text-white text-center bg-primary hover:bg-primary/70 hover:border-transparent hover:text-white "
        >
          View Public Profile
        </Link>
      </div>
    </div>
  )
}

export default Header
