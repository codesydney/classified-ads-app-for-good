import { Link } from 'react-router-dom'
import defaultUserLogo from '../../assets/serviceImgPlaceholder.svg'

const UserDetails = ({ userProfile }) => {
  const isOfficer = userProfile?.isOfficer
  return (
    <div className="flex flex-col md:flex-row self-stretch sm:gap-4 sm:w-full m-2 sm:my-10 shadow-md rounded-md">
      <img
        src={userProfile?.alumniProfilePicture || defaultUserLogo}
        alt={`${userProfile?.fullName} profile picture`}
        className=" md:w-1/2 aspect-ratio-4/3 object-cover rounded-t-md sm:rounded-tr-none sm:rounded-l-md"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-bold text-xl mt-2">{userProfile?.fullName}</h2>

        {isOfficer ? (
          <div className=" flex flex-col gap-1">
            <span>{userProfile?.email}</span>
            <span>{userProfile?.phone}</span>
            <span>{userProfile?.state?.toUpperCase()}</span>
            <span>{userProfile?.suburb}</span>
            <span>{userProfile?.postcode}</span>
          </div>
        ) : (
          <span>{userProfile?.state?.toUpperCase()}</span>
        )}

        {userProfile?.story && (
          <div className=" mt-4">
            <p>{userProfile?.story}</p>
          </div>
        )}

        {userProfile?.education && (
          <div className="my-[16px]">
            <h2 className="font-semibold">{userProfile?.education?.college}</h2>
            <h2>{userProfile?.education?.course}</h2>
            <h2>{userProfile?.education?.yearGraduated}</h2>
          </div>
        )}

        {userProfile?.service && (
          <div className="w-full md:w-3/5 flex gap-4 my-4">
            <div className=" w-full flex flex-col gap-2">
              <p>{userProfile?.service?.serviceDescription}</p>
              <div className=" break-words hyphens-auto whitespace-pre break-all">
                {userProfile?.service?.serviceUrl && (
                  <a
                    href={`${userProfile?.service?.serviceUrl}`}
                    target="_blank"
                    className="hover:underline hover:text-white flex-wrap"
                  >
                    <button className="w-full p-2 border-2 bg-white capitalize border-sky-400 hover:bg-sky-400 rounded-md ease-in-out duration-300">
                      {userProfile?.service?.serviceName}
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="w-full md:w-3/5 flex gap-4">
          <Link
            to={`/`}
            className="py-2 px-4 text-primary hover:text-white rounded flex-grow text-center border-primary border-2 bg-white hover:bg-primary ease-in-out duration-300"
          >
            <button>Go back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
