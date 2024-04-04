import { Link } from 'react-router-dom'
import UserImg from '../../components/search/UserImg.jsx'
import defaultUserLogo from '../../assets/serviceImgPlaceholder.svg'

const UserDetails = ({ userProfile }) => {
  const isOfficer = userProfile?.isOfficer
  return (
    <div className="flex flex-col self-stretch items-center justify-center sm:w-full max-w-[780px] shadow-lg m-2 sm:m-auto sm:my-10">
      <div className="min-w-[350px]">
        <UserImg
          fullName={userProfile?.fullName}
          alumniProfilePicture={userProfile?.alumniProfilePicture}
        />
      </div>

      <div className="p-2 px-4 flex flex-col flex-grow">
        <h2 className="font-bold text-xl mt-2">{userProfile?.fullName}</h2>

        {isOfficer ? (
          <div className=" flex flex-col gap-1">
            <span>{userProfile?.email}</span>
            <span>{userProfile?.phone}</span>
            <span>{userProfile?.state}</span>
            <span>{userProfile?.suburb}</span>
            <span>{userProfile?.postcode}</span>
          </div>
        ) : (
          <span>{userProfile?.state}</span>
        )}

        <div className=" mt-4">
          <h2 className="font-semibold">MyStory: </h2>
          <p>{userProfile?.story}</p>
        </div>

        {userProfile?.education && (
          <div className="my-[16px]">
            <h2 className="font-semibold">{userProfile?.education?.college}</h2>
            <h2>{userProfile?.education?.course}</h2>
            <h2>{userProfile?.education?.yearGraduated}</h2>
          </div>
        )}

        {userProfile?.service && (
          <div className="mt-[10px] w-[100%] flex flex-wrap mb-[16px]">
            <div className=" flex flex-col gap-2">
              <img
                className=" w-[35px] h-[35px] rounded-full"
                src={userProfile?.service?.serviceLogoUrl || defaultUserLogo}
                alt={userProfile?.service?.serviceName}
              />
              <div className=" break-words hyphens-auto whitespace-pre break-all">
                <a
                  href={`${userProfile?.service?.serviceUrl}`}
                  target="_blank"
                  className="hover:underline hover:text-blue-500 flex-wrap text-[14px]"
                >
                  {userProfile?.service?.serviceName}
                </a>
              </div>
              <p>{userProfile?.service?.serviceDescription}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center my-4">
          <button className=" w-full sm:max-w-[50%] py-2 px-4 bg-primary text-white rounded flex-grow text-center border-primary border-2 hover:bg-primary/70 hover:border-transparent">
            <Link to={`/`}>Go back</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
