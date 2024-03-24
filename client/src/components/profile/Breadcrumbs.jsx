import { useLocation, Link } from 'react-router-dom'

const linkClass =
  'underline text-sm text-semibold py-2 px-4 rounded-full shadow bg-white hover:text-bold'

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(s => s !== '')

  return (
    <div className="">
      <ul className="flex gap-2">
        <li className="">
          <Link to="/" className={linkClass}>
            Home
          </Link>
        </li>
        {pathSegments?.length &&
          pathSegments.map((segment, index) => (
            <li key={index}>
              <span className="">{'>' + ' '}</span>
              <Link
                className={linkClass}
                to={`/${pathSegments.slice(0, index + 1).join('/')}`}
              >
                {segment}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
