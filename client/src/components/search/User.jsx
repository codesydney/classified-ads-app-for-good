import UserImg from './UserImg'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div className="self-stretch justify-center flex flex-col sm:max-w-[450px] shadow-lg rounded-md">
      <UserImg
        fullName={user?.fullName}
        alumniProfilePicture={user?.alumniProfilePicture}
      />
      <div className="p-2 px-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="font-bold text-xl mt-2">{user?.fullName}</h2>
          {user?.state && <h2 className=" uppercase">{user?.state}</h2>}

          {user?.education && (
            <div className="my-[16px]">
              <h2 className="font-semibold">{user?.education?.college}</h2>
              <h2>{user?.education?.course}</h2>
              <h2>{user?.education?.yearGraduated}</h2>
            </div>
          )}
        </div>

        <div>
          {!!user?.service?.serviceUrl && (
            <div className="mt-[10px] flex flex-wrap mb-[16px]">
              <div className="w-full break-words hyphens-auto whitespace-pre break-all">
                <a
                  href={`${user?.service?.serviceUrl}`}
                  target="_blank"
                  className="flex justify-center py-2 px-4 text-sky-400 hover:text-white rounded flex-grow text-center border-2 bg-white border-sky-400 hover:bg-sky-400 ease-in-out duration-300"
                >
                  <button className=" capitalize">
                    {user?.service?.serviceName}
                  </button>
                </a>
              </div>
            </div>
          )}

          <div className="w-full flex gap-4 justify-between">
            <Link
              className=" py-2 px-4 text-primary hover:text-white hover:font-semibold rounded flex-grow text-center border-primary border-2 bg-white hover:bg-primary hover:border-transparent ease-in-out duration-300"
              to={`/profile/${user?.id}`}
            >
              <button>View Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
