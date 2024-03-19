import ServiceImg from './UserImg'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div className="self-stretch justify-center flex flex-col max-w-[450px] shadow-lg">
      <ServiceImg
        serviceName={user.service?.serviceName}
        serviceLogo={user.service?.serviceLogo}
      />
      <div className="p-2 px-4 flex flex-col flex-grow">
        <h2 className="font-semibold text-xl mt-2">
          {user.service?.serviceName}
        </h2>
        <div className="text-base mb-4">{user.fullName}</div>
        <p className="mb-6 overflow-hidden text-ellipsis line-clamp-4">
          Lorem ipsum this will hopefully be a field that described the service
          that the user offers. Will probably need this for field for their
          public profile page anyway?
        </p>
        <div className="mt-auto flex gap-4 justify-between">
          <Link
            className=" py-2 px-4 bg-primary text-white rounded flex-grow text-center border-primary border-2 hover:bg-primary/70 hover:border-transparent "
            to="/about"
          >
            View Profile
          </Link>
          {user.service?.serviceUrl && (
            <Link
              className="py-2 px-4 border-2 border-primary text-primary rounded flex-grow text-center hover:bg-primary/10 hover:border-transparent"
              to="/about"
            >
              See Service
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default User
